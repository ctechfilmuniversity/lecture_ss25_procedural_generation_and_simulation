#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359
uniform vec2 u_resolution;
void main()
{
    vec2 pt = gl_FragCoord.xy/u_resolution;

    vec3 color1 = vec3(1., 0. , 0.);
    vec3 color2 = vec3(0., 0. , 1.);

    // Interpolating between the pattern and 1.
    // depending on the x coordinate, meaning
    // with t = pt.x
    // vec3 color = vec3(pt.x * hori + (1.0 - pt.x));
    
    // float t = pt.x;
    float t = pow(pt.x, 5.);
    vec3 color = vec3(t * color1 + ((1.0 - t) * color2));

    // https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
    // vec3 color = vec3(mix(hori, verti, pt.x));

    // Assign frag color with alpha
    gl_FragColor = vec4(color,1.0);
}