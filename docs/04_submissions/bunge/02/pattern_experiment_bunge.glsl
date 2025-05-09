#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

const mat2 m=mat2(.80,.60,-.60,.80);
const float CELLS=55.;

// sine-based noise from shadetoy
float noise(in vec2 p){
    return sin(p.x)*sin(p.y);
}

// 4-layer fbm noise from shadertoy
float fbm4(vec2 p){
    float f=0.;
    f+=.6000*noise(p);p=m*p*2.02;
    f+=.2500*noise(p);p=m*p*2.03;
    f+=.1250*noise(p);p=m*p*2.01;
    f+=.0625*noise(p);
    return f/.9375;
}

void main()
{
    // (0, 0) is the bottom-left corner of the screen, and (1, 1) is the top-right
    vec2 pt=gl_FragCoord.xy/u_resolution;
    
    // Create a grid
    vec2 gridUV=pt*CELLS;
    vec2 cell=floor(gridUV);
    vec2 f=fract(gridUV);
    
    // normalize cell coordinates to center [-1, 1]
    vec2 localcoor=(f-.5)*2.;
    
    // Animate noise input
    float fbmVal=fbm4(localcoor+u_time*.45+cell*.15);
    
    // Use mix for two colors
    vec3 colA=vec3(.7569,.9216,.7412);
    vec3 colB=vec3(.0784,.6235,.3765);
    vec3 color=mix(colA,colB,fbmVal);
    
    gl_FragColor=vec4(color,1);
}