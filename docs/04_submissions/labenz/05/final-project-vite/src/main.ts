import './style.css';

import { fromUrl } from 'geotiff';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const map = new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    glyphs: '/{fontstack}/{range}.pbf',
    sources: {},
    layers: [],
  },
  maxBounds: [
    [32, 34],
    [35, 37],
  ],
  center: [33, 35.5],
  zoom: 7,
  maxZoom: 11,
  minZoom: 8,
});

interface DEMLayerProperties extends maplibregl.CustomLayerInterface {
  program: WebGLProgram;
  buffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;
  demTexture: WebGLTexture | null;
  aPos: number;
  textureWidth: number;
  textureHeight: number;
  geoBounds: [number, number, number, number];
  startTime: number;
}

async function loadDEMTexture(gl: WebGL2RenderingContext, url: string) {
  try {
    const tiff = await fromUrl(url);
    const image = await tiff.getImage();
    const rasters = await image.readRasters();

    const width = image.getWidth();
    const height = image.getHeight();
    const bbox = image.getBoundingBox();

    const data = rasters[0] as Float32Array | Int16Array | Uint16Array;
    let textureData: Float32Array;
    if (data instanceof Float32Array) {
      textureData = data;
    } else {
      textureData = new Float32Array(data);
    }

    // Calculate min/max values
    let min = Infinity,
      max = -Infinity;
    const noDataValue = -32767;
    let validPixels = 0;

    for (let i = 0; i < textureData.length; i++) {
      if (textureData[i] !== noDataValue) {
        min = Math.min(min, textureData[i]);
        max = Math.max(max, textureData[i]);
        validPixels++;
      }
    }

    const texture = gl.createTexture();
    if (!texture) {
      throw new Error('Failed to create texture');
    }

    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Use 16-bit floating point texture (R16F) for single channel
    // Or RGBA16F for full RGBA with 16-bit precision per channel
    const RANGE_MIN = -2800;
    const RANGE_MAX = 2200;

    // Create RGBA16F data - using Float32Array for WebGL2
    // Each pixel needs 4 float values (RGBA)
    const rgbaFloatData = new Float32Array(width * height * 4);

    for (let i = 0; i < textureData.length; i++) {
      if (textureData[i] <= -32767) {
        // No data - fully transparent
        rgbaFloatData[i * 4] = 0;
        rgbaFloatData[i * 4 + 1] = 0;
        rgbaFloatData[i * 4 + 2] = 0;
        rgbaFloatData[i * 4 + 3] = 0;
      } else {
        // Normalize to 0-1 range for better precision
        const clampedValue = Math.max(
          RANGE_MIN,
          Math.min(RANGE_MAX, textureData[i])
        );
        const normalizedValue =
          (clampedValue - RANGE_MIN) / (RANGE_MAX - RANGE_MIN);

        // Store the normalized value in R channel
        // You could also encode the value across multiple channels for even more precision
        rgbaFloatData[i * 4] = normalizedValue;
        rgbaFloatData[i * 4 + 1] = normalizedValue;
        rgbaFloatData[i * 4 + 2] = normalizedValue;
        rgbaFloatData[i * 4 + 3] = 1.0; // Full opacity for valid data
      }
    }

    // Use RGBA16F internal format for 16-bit float precision per channel
    // This gives us 16-bit precision instead of 8-bit
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA16F, // 16-bit float internal format
      width,
      height,
      0,
      gl.RGBA,
      gl.FLOAT,
      rgbaFloatData
    );

    // Check for linear filtering support on float textures
    const floatLinearExt = gl.getExtension('OES_texture_float_linear');
    if (floatLinearExt) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Verify texture completeness
    const error = gl.getError();
    if (error !== gl.NO_ERROR) {
      console.error('WebGL error after texture creation:', error);
    }

    return {
      texture,
      width,
      height,
      bounds: bbox as [number, number, number, number],
      dataRange: { min, max },
    };
  } catch (error) {
    console.error('Error loading GeoTIFF:', error);
    throw error;
  }
}

const demLayer: maplibregl.AddLayerObject & DEMLayerProperties = {
  id: 'dem-layer',
  type: 'custom',
  program: null as unknown as WebGLProgram,
  buffer: null as unknown as WebGLBuffer,
  indexBuffer: null as unknown as WebGLBuffer,
  demTexture: null,
  aPos: 0,
  textureWidth: 0,
  textureHeight: 0,
  geoBounds: [32, 34, 35, 37],
  startTime: Date.now(),

  onAdd(map, gl) {
    loadDEMTexture(gl as WebGL2RenderingContext, '/bathymetry_6.tif')
      .then((result) => {
        this.demTexture = result.texture;
        this.textureWidth = result.width;
        this.textureHeight = result.height;

        map.triggerRepaint();
      })
      .catch((error) => {
        console.error('Failed to load DEM:', error);
      });

    const vertexSource = `#version 300 es
    uniform mat4 u_matrix;
    in vec2 a_pos;
    out vec2 v_world_pos;
    
    void main() {
        v_world_pos = a_pos;
        gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
    }`;

    const fragmentSource = `#version 300 es
  precision highp float;

  uniform sampler2D u_dem_texture;
  uniform vec4 u_geo_bounds;
  uniform bool u_dem_loaded;
  uniform float u_time;

  in vec2 v_world_pos;
  out vec4 fragColor;

  float NOISE_SIZE = 0.0000008;
  float NOISE_SPEED = .00000004;

  vec3 COLOR1 = vec3(0.0824, 0.1373, 0.1686);
  vec3 COLOR2 = vec3(0.2, 0.251, 0.3922);

  float random(float x) {
      return fract(sin(x) * 43758.5453123);
  }

  float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  vec2 sw(vec2 p) { return vec2(floor(p.x), floor(p.y)); }
  vec2 se(vec2 p) { return vec2(ceil(p.x), floor(p.y)); }
  vec2 nw(vec2 p) { return vec2(floor(p.x), ceil(p.y)); }
  vec2 ne(vec2 p) { return vec2(ceil(p.x), ceil(p.y)); }

  float smoothNoise(vec2 p) {
      vec2 interp = smoothstep(0.0, 1.0, fract(p));
      float s = mix(noise(sw(p)), noise(se(p)), interp.x);
      float n = mix(noise(nw(p)), noise(ne(p)), interp.x);
      return mix(s, n, interp.y);
  }

  float fractalNoise(vec2 p, float frequencyMultiplier) {
      const int OCTAVES = 3;
      const float BASE_FREQUENCY = 0.1;
      const float FREQUENCY_MULTIPLIER = 3.0;
      const float BASE_AMPLITUDE = 1.0;
      const float AMPLITUDE_DECAY = 0.7;
      const float NORMALIZATION = 3.333333;
      
      float result = 0.0;
      float amplitude = BASE_AMPLITUDE;
      float frequency = BASE_FREQUENCY * frequencyMultiplier;
      
      for(int i = 0; i < OCTAVES; i++) {
          result += smoothNoise(p * frequency) * amplitude;
          frequency *= FREQUENCY_MULTIPLIER;
          amplitude *= AMPLITUDE_DECAY;
      }
      
      return result / NORMALIZATION;
  }

  float map(float value, float min1, float max1, float min2, float max2) {
      return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
  }

  void main() {
    vec2 normalizedCoord = (v_world_pos.xy - u_geo_bounds.xy) / (u_geo_bounds.zw - u_geo_bounds.xy);
    normalizedCoord.y = 1.0 - normalizedCoord.y;
    
    if (normalizedCoord.x < 0.0 || normalizedCoord.x > 1.0 || 
        normalizedCoord.y < 0.0 || normalizedCoord.y > 1.0) {
        fragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
    }
    
    // Erste Sampling für Opacity-Berechnung
    float demValue = 0.5;
    vec4 demSample = vec4(0.0);
    
    if (u_dem_loaded) {
        demSample = texture(u_dem_texture, normalizedCoord);
        if (demSample.a < 0.5) {
            fragColor = vec4(0.0, 0.0, 0.0, 0.0);
            return;
        }
        // With 16-bit float textures, we have much better precision
        demValue = demSample.r;
    }
    
    // Berechne Opacity-Faktor für UV-Verzerrung
    float waterLevel = 0.56;
    float normalizedDemValue = map(demValue, 0., waterLevel, 1., 0.);

    float coastOpacity = map(demValue, waterLevel-0.05, waterLevel+0.1, 1., .0);
    float smoothedCoastOpacity = smoothstep(.0, 1., coastOpacity);
    float distortionFactor = normalizedDemValue * smoothedCoastOpacity;
    
    // UV-Verzerrung für Wasserrefraktion
    float refractionTime = u_time * 0.0008;
    
    vec2 wave1 = vec2(
        sin(normalizedCoord.y * 15.0 + refractionTime * 0.5) * 0.03,
        cos(normalizedCoord.x * 12.0 + refractionTime * 0.3) * 0.03
    );
    
    vec2 wave2 = vec2(
        sin(normalizedCoord.x * 25.0 - normalizedCoord.y * 20.0 + refractionTime) * 0.01,
        cos(normalizedCoord.y * 30.0 + normalizedCoord.x * 15.0 - refractionTime * 1.2) * 0.01
    );
    
    vec2 wave3 = vec2(
        sin(normalizedCoord.x * 40.0 + refractionTime * 2.0) * 0.005,
        cos(normalizedCoord.y * 45.0 - refractionTime * 1.8) * 0.005
    );
    
    // Kombiniere alle Wellen und multipliziere mit Opacity-Faktor
    vec2 totalDistortion = (wave1 + wave2 + wave3) * distortionFactor;
    
    // Wende die Verzerrung auf die Texturkoordinaten an
    vec2 distortedCoord = normalizedCoord + totalDistortion;
    
    // Zweites Sampling mit verzerrten Koordinaten
    if (u_dem_loaded) {
        demSample = texture(u_dem_texture, distortedCoord);
        if (demSample.a < 0.5) {
            fragColor = vec4(0.0, 0.0, 0.0, 0.0);
            return;
        }
        demValue = demSample.r;
    }
    
    // ===== WORKING AREA START =====
    float directionMultiplier = mix(-0.5, 0.5, normalizedDemValue);
    vec2 direction = normalize(vec2(directionMultiplier, directionMultiplier));
    
    // Speed multiplier still based on DEM (depth)
    float speedMultiplier = mix(-1.5, .5, demValue);
    vec2 worldUV = v_world_pos + direction * u_time * NOISE_SPEED * speedMultiplier;
    
    // Size multiplier based on DEM
    float sizeMultiplier = mix(0.000011, 0.000012, normalizedDemValue);
    
    // Frequency multiplier based on DEM
    float freqMultiplier = 10.;//mix(-10., 10.0, normalizedDemValue);
    float noiseValue = fractalNoise(worldUV / sizeMultiplier, freqMultiplier);
    
    // Create bands based on depth
    float band = step(0., demValue) * step(demValue, waterLevel);
    
    float normalizedOpacity = map(demValue, 0., waterLevel, 1., 0.9);

    float opacity = exp(-demValue * 5.); 

    vec3 finalColor = mix(COLOR1, COLOR2, noiseValue);
    
    fragColor = vec4(finalColor,normalizedOpacity*smoothedCoastOpacity*band );
    //fragColor = vec4(demValue,demValue,demValue,1.);
    // ===== WORKING AREA END =====
}`;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) throw new Error('Failed to create vertex shader');

    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(vertexShader);
      throw new Error('Vertex shader compilation failed: ' + error);
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) throw new Error('Failed to create fragment shader');

    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(fragmentShader);
      throw new Error('Fragment shader compilation failed: ' + error);
    }

    this.program = gl.createProgram();
    if (!this.program) throw new Error('Failed to create shader program');

    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      const error = gl.getProgramInfoLog(this.program);
      throw new Error('Program linking failed: ' + error);
    }

    this.aPos = gl.getAttribLocation(this.program, 'a_pos');

    const [west, south, east, north] = this.geoBounds;

    const topLeft = maplibregl.MercatorCoordinate.fromLngLat([west, north]);
    const topRight = maplibregl.MercatorCoordinate.fromLngLat([east, north]);
    const bottomLeft = maplibregl.MercatorCoordinate.fromLngLat([west, south]);
    const bottomRight = maplibregl.MercatorCoordinate.fromLngLat([east, south]);

    const vertices = new Float32Array([
      bottomLeft.x,
      bottomLeft.y,
      bottomRight.x,
      bottomRight.y,
      topRight.x,
      topRight.y,
      topLeft.x,
      topLeft.y,
    ]);

    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  },

  render(gl, args) {
    if (!this.program) return;

    gl.useProgram(this.program);

    const matrixLocation = gl.getUniformLocation(this.program, 'u_matrix');
    if (matrixLocation !== null) {
      gl.uniformMatrix4fv(
        matrixLocation,
        false,
        args.defaultProjectionData.mainMatrix
      );
    }

    const timeLocation = gl.getUniformLocation(this.program, 'u_time');
    if (timeLocation !== null) {
      gl.uniform1f(timeLocation, Date.now() - this.startTime);
    }

    if (this.demTexture) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.demTexture);

      const textureLocation = gl.getUniformLocation(
        this.program,
        'u_dem_texture'
      );
      if (textureLocation !== null) {
        gl.uniform1i(textureLocation, 0);
      }

      const demLoadedLocation = gl.getUniformLocation(
        this.program,
        'u_dem_loaded'
      );
      if (demLoadedLocation !== null) {
        gl.uniform1i(demLoadedLocation, 1);
      }
    } else {
      const demLoadedLocation = gl.getUniformLocation(
        this.program,
        'u_dem_loaded'
      );
      if (demLoadedLocation !== null) {
        gl.uniform1i(demLoadedLocation, 0);
      }
    }

    const boundsLocation = gl.getUniformLocation(this.program, 'u_geo_bounds');
    if (boundsLocation !== null) {
      const [west, south, east, north] = this.geoBounds;
      const mercatorBounds = [
        maplibregl.MercatorCoordinate.fromLngLat([west, south]),
        maplibregl.MercatorCoordinate.fromLngLat([east, north]),
      ];

      gl.uniform4f(
        boundsLocation,
        mercatorBounds[0].x,
        mercatorBounds[0].y,
        mercatorBounds[1].x,
        mercatorBounds[1].y
      );
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.enableVertexAttribArray(this.aPos);
    gl.vertexAttribPointer(this.aPos, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  },
};

map.on('load', () => {
  map.addSource('raster-tiles', {
    type: 'raster',
    tiles: ['/tiles_webp/{z}/{x}/{y}.png'],
    tileSize: 256,
  });

  map.addLayer({
    id: 'raster-tiles-layer',
    type: 'raster',
    source: 'raster-tiles',
    minzoom: 8,
    maxzoom: 12,
    paint: {
      'raster-opacity': 1,
      'raster-resampling': 'linear',
    },
  });

  map.addLayer(demLayer);

  map.addSource('german-city-names', {
    type: 'geojson',
    data: '/names_de.geojson',
  });

  map.addLayer({
    id: 'city-name-labels',
    type: 'symbol',
    source: 'german-city-names',
    layout: {
      'text-field': ['get', 'name'],
      'text-size': 22,
      'text-font': ['Noto Serif Display Italic'],
      'text-anchor': 'top',
    },
    paint: {
      'text-color': '#222',
    },
  });

  map.flyTo({
    center: [33, 35.5],
    zoom: 11,
    minZoom: 8,
    padding: { top: 20, bottom: 20, left: 20, right: 20 },
    bearing: 0,
    pitch: 0,
    duration: 0,
  });

  let frameCount = 0;
  function animate() {
    frameCount++;
    if (frameCount % 2 === 0) {
      map.triggerRepaint();
    }
    requestAnimationFrame(animate);
  }
  animate();
});
