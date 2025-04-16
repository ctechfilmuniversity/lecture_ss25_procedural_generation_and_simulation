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

    float t = pow(pt.x, 5.);
    vec3 interpol1 = vec3(t * color1 + ((1.0 - t) * color2));
    vec3 interpol2 = vec3(t * color3 + ((1.0 - t) * color4));

    // vec3 color = interpol1;
    t = pow(pt.y, 5.);
    vec3 interpol3 = vec3(t * interpol1 + ((1.0 - t) * interpol2));
    vec3 color = interpol3;

    // Assign frag color with alpha
    gl_FragColor = vec4(color,1.0);
}