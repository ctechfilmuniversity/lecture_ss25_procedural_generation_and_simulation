#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;// canvas resolution (x: width, y: height)
uniform float u_time;// time elapsed since launch (in seconds)

#define PI 3.14159265359

float ZOOM_FACTOR=2.;
float COORD_BOUNDS=1.;

bool frame(vec2 p,float border){
    return max(abs(p.x),abs(p.y))>border;
}

void main(){
    float cbf=COORD_BOUNDS*2.;// calculate coordinate bounds factor (both -/+ -> *2)
    vec2 uv=((gl_FragCoord.xy-u_resolution.xy*.5)*cbf)/u_resolution.y;
    uv*=ZOOM_FACTOR;
    
    // vec2 id=floor(uv);
    // float fid=id.x*id.y;// flattened id coord for continuous cell count
    
    // uv=(fract(uv)-.5)*cbf;
    
    vec3 col=vec3(0.,0.,0.);
    
    // coords debugging
    col.b+=uv.x;
    col.r+=uv.y;
    if(frame(uv,COORD_BOUNDS))col=vec3(1.);// cell frame
    
    gl_FragColor=vec4(col,1.);
    
}