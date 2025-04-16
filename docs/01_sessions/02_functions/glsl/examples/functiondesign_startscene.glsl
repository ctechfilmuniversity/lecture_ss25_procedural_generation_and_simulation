#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


void main() {

    // Normalization of the incoming
    // screen coordinate
    vec2 coord = gl_FragCoord.xy/u_resolution.y;
    // Better
    // vec2 coord = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;

    // r, g, b channels from 0..1
    vec3 color = vec3(0.5, 0.0, 0.0);

    // float wave = sin(u_time) * 0.5 + 0.5;
    // color[0] = wave;

    // Set the final "pixel" color
    gl_FragColor = vec4(color, 1.0);

    // gl_FragColor = vec4(vec3(abs(coord.x)), 1.0);
    // gl_FragColor = vec4(vec3(abs(coord.y)), 1.0);
    // gl_FragColor = vec4(vec3(abs(coord.x*coord.y)), 1.0);
}