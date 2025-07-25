#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float SIZE = 0.01;
float SPEED = 1.4;

// https://www.shadertoy.com/view/Mt2SzR

// Farbvariablen
vec3 COLOR1 = vec3(0.0275, 0.0392, 0.0471);  // Helle Farbe (hellblau)
vec3 COLOR2 = vec3(0.1333, 0.1647, 0.2549);  // Dunkle Farbe (dunkelblau)

float random(float x) {
    return fract(sin(x) * 10000.);
}

float noise(vec2 p) {
    return random(p.x + p.y * 10000.);1
}

vec2 sw(vec2 p) { return vec2(floor(p.x), floor(p.y)); }
vec2 se(vec2 p) { return vec2(ceil(p.x), floor(p.y)); }
vec2 nw(vec2 p) { return vec2(floor(p.x), ceil(p.y)); }
vec2 ne(vec2 p) { return vec2(ceil(p.x), ceil(p.y)); }

float smoothNoise(vec2 p) {
    vec2 interp = smoothstep(0., 1., fract(p));
    float s = mix(noise(sw(p)), noise(se(p)), interp.x);
    float n = mix(noise(nw(p)), noise(ne(p)), interp.x);
    return mix(s, n, interp.y);
}

float fractalNoise(vec2 p) {
    float x = 0.;
    x += smoothNoise(p * 0.5 );
    x += smoothNoise(p * 0.125 );
    x += smoothNoise(p * 0.25 );
    x += smoothNoise(p * 0.5 );
    x += smoothNoise(p     );
    x += smoothNoise(p * 2. ) / 2.;
    x += smoothNoise(p * 4. ) / 4.;
    x += smoothNoise(p * 8. ) / 8.;
    x += smoothNoise(p * 16.) / 16.;

    x /= 1. + 1./2. + 1./4. + 1./8. + 1./16. + 1./32.;
    return x;
}

float movingNoise(vec2 p) {
    float x = fractalNoise(p + u_time * SPEED);
    float y = fractalNoise(p - u_time * SPEED);
    return fractalNoise(p + vec2(x, y));   
}

// Call this for water noise function
float nestedNoise(vec2 p) {
    float x = movingNoise(p);
    float y = movingNoise(p + 100.);
    return movingNoise(p + vec2(x, y));
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // SIZE Parameter anwenden - kleinere Werte = feinere Details
    float n = nestedNoise(uv / SIZE);
    
    // Farbmischung zwischen COLOR1 und COLOR2 basierend auf Noise
    vec3 finalColor = mix(COLOR1, COLOR2, n);
    
    gl_FragColor = vec4(finalColor, 1.0);
}