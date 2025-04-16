#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
uniform vec2 u_resolution;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.y;
    //vec3 color = vec3(st.y);


    // Increase frequency to fit more sin waves 
    // between 0..1
    // float verti = sin(st.x);
    float verti = sin(8.0 * PI * st.x);
    // float hori = sin(st.y);
    float hori = sin(8.0 * PI * st.y);

    // vec3 color = vec3(hori);

    // Create vec3 from value
    // vec3 color = vec3(hori);
    vec3 color = vec3(hori+verti);

    // vec3 color = mix(vec3(1.0, 0.9, 0.0), vec3(0.5, 0.0, 0.5), hori+verti);
    
    // gl_FragColor = (hori+verti > 1. || hori+verti < 0.) ? vec4(vec3(1., 0., 0.), 1.0) : vec4(vec3(hori+verti), 1.0);
    // Assign frag color with alpha
    gl_FragColor = vec4(color,1.0);


}
