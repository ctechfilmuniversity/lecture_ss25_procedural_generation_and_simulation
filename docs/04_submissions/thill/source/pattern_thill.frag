/***********************************************************
 * Ten Print Pattern with Bias
 ***********************************************************/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// HELPER FUNCTIONS

float random(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
}

float getBias(float t, float bias) {
    return t / ((((1.0 / bias) - 2.0) * (1.0 - t)) + 1.0);
}

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution;

    // Grid size: number of cells across screen
    float gridSize = 40.0;
    vec2 grid = vec2(gridSize, gridSize * u_resolution.y / u_resolution.x);

    // Grid coordinates
    vec2 cell = floor(uv * grid);
    vec2 cellUV = fract(uv * grid);

    // Random value per cell
    float r = random(cell);

    // Line thickness
    float thickness = 0.2;

    // Distance to ideal diagonals
    float fSlash = abs(cellUV.x + cellUV.y - 1.0);
    float bSlash = abs(cellUV.x - cellUV.y);

    // Choose slash type
    float d = mix(bSlash, fSlash, step(0.5, r));

    // Soft edge + bias shaping
    float rawLine = smoothstep(thickness, 0.0, d);
    float line = getBias(rawLine, 0.9); // bias < 0.5 = lighter lines, > 0.5 = bolder

    // Final colour
    vec3 colour = mix(vec3(1.0), vec3(0.0), line);

    gl_FragColor = vec4(colour, 1.0);
}
