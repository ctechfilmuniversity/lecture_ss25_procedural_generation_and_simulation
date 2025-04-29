#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
uniform vec2 u_resolution;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.y; //normalization

    // Increase frequency to fit more sin waves 
    // between 0..1
 
    float verti = sin(10.0 * PI * st.y); //I changed the st.x to st.y
    float hori = sin(25.0 * PI * st.x); //I changed the st.y to st.x
    float diag = tan(2500.0 * PI * st.x*st.y); //I created this new variable.

    // Modify value range from 0..1 to -1..1
    // and then taking the absolute
    vec2 coord_remap = abs((st - 0.5) * 2.0);
   

    // Create vec3 from value
    vec3 color = mix(vec3(0.5098, 0.8118, 0.8157), vec3(0.149, 0.1255, 0.2353), hori*verti*diag); //I also modified the last value "hori+verti" to "hori*verti*diag". 
    

    // Assign frag color with alpha
    gl_FragColor = vec4(color, 1.0);


}
