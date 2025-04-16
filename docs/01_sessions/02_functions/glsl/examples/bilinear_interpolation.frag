#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359
uniform vec2 u_resolution;

void main()
{
    vec2 pt = gl_FragCoord.xy/u_resolution;


    vec3 color1 = vec3(1., 0. , 0.);
    vec3 color2 = vec3(0., 1. , 0.);
    vec3 color3 = vec3(0., 0. , 1.);
    vec3 color4 = vec3(1., 1. , 0.);

    vec3 interpol1 = mix(color1, color2, pt.x);
    vec3 interpol2 = mix(color3, color4, pt.x);
    // vec3 color = interpol1;

    vec3 interpol3 = mix(interpol1, interpol2, pt.y);
    vec3 color = interpol3;

    // Assign frag color with alpha
    gl_FragColor = vec4(color,1.0);
}