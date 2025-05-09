#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;// canvas resolution (x: width, y: height)
uniform float u_time;// time elapsed since launch (in seconds)

#define PI 3.14159265359

float ZOOM_FACTOR=1.2;
float COORD_BOUNDS=1.;
float LINE_THICKNESS=.02;
vec3 COL_TRI=vec3(.4,0.,1.);
vec3 COL_BG=vec3(.0588,.1529,.5725);

bool frame(vec2 p,float border){
    return max(abs(p.x),abs(p.y))>border;
}

// based on https://www.youtube.com/watch?v=PMltMdi1Wzg
float lineSegment(vec2 p,vec2 a,vec2 b,float r)
{
    vec2 pa=p-a,ba=b-a;
    float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
    return length(pa-ba*h)-r;
}

float oscillate(float time,float minValue,float maxValue,float speedDivisor){
    float scaledTime=time/speedDivisor;
    float amplitude=(maxValue-minValue)*.5;
    float midValue=minValue+amplitude;
    return midValue+amplitude*sin(scaledTime);
}

void main(){
    float cbf=COORD_BOUNDS*2.;// calculate coordinate bounds factor (both -/+ -> *2)
    vec2 uv=((gl_FragCoord.xy-u_resolution.xy*.5)*cbf)/u_resolution.y;
    uv*=ZOOM_FACTOR;
    
    // vec2 id=floor(uv);
    // float fid=id.x*id.y;// flattened id coord for continuous cell count
    
    uv=(fract(uv)-.5)*cbf;
    
    vec3 col=COL_BG;
    
    float osc1=oscillate(u_time,-.8,.8,2.);
    float osc2=oscillate(u_time,-.8,.8,.5);
    
    vec2 p=vec2(-osc1,-osc2);
    vec2 q=vec2(osc2,-osc1);
    vec2 r=vec2(-osc1,osc2);
    
    float l1=lineSegment(uv,p,q,LINE_THICKNESS);
    float l2=lineSegment(uv,q,r,LINE_THICKNESS);
    float l3=lineSegment(uv,r,p,LINE_THICKNESS);
    
    float d=min(l1,l2);
    d=min(d,l3);
    
    float osc3=oscillate(u_time,.01,1.,.25);
    col=mix(col,COL_TRI,1.-smoothstep(0.,osc3,abs(d)));
    // if(frame(uv,COORD_BOUNDS))col=vec3(1.);// cell frame
    
    gl_FragColor=vec4(col,1.);
    
}