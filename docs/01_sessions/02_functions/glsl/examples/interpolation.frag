#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359
uniform vec2 u_resolution;
void main()
{
    vec2 pt = gl_FragCoord.xy/u_resolution;

    // Our "pattern":
    float verti = sin(8.0 * PI * pt.x);
    float hori = sin(8.0 * PI * pt.y);
    // vec3 color = vec3(hori);

    // Interpolating between the pattern and 1.
    // depending on the x coordinate, meaning
    // with t = pt.x
    // vec3 color = vec3(pt.x * hori + (1.0 - pt.x));
    
    // vec3 color = vec3(pt.x * hori);
    // vec3 color = vec3(pt.x * hori + ((1.0 - pt.x) * verti));

    // https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
    vec3 color = vec3(mix(hori, verti, pt.x));

    // Assign frag color with alpha
    gl_FragColor = vec4(color,1.0);
}