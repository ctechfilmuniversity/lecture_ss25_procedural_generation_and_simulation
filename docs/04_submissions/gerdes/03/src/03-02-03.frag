#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;// canvas resolution (x: width, y: height)
uniform float u_time;// time elapsed since launch (in seconds)

#define PI 3.14159265359

float ZOOM_FACTOR=4.;
float COORD_BOUNDS=1.2;
float LINE_THICKNESS=.04;
vec3 COL_TRI=vec3(.5137,.2235,.8078);
vec3 COL_BG=vec3(.8706,.3961,.3961);

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

// based on https://www.youtube.com/watch?v=VmrIDyYiJBA
float hexDist(vec2 p){
    p=abs(p);
    
    float c=dot(p,normalize(vec2(1,1.73)));
    c=max(c,p.x);
    
    return c;
}

// based on https://www.youtube.com/watch?v=VmrIDyYiJBA
vec4 hexCoords(vec2 uv){
    vec2 r=vec2(1,1.73);
    vec2 h=r*.5;
    
    vec2 a=mod(uv,r)-h;// similar to frac but instead of 1-based using the ratio defined in r
    vec2 b=mod(uv-h,r)-h;
    
    vec2 gv=dot(a,a)<dot(b,b)?a:b;
    
    // float x=atan(gv.x,gv.y);
    // float y=.5-hexDist(gv);
    
    vec2 id=uv-gv;
    return vec4(gv.x,gv.y,id.x,id.y);
}

vec2 hexEdge(float a){
    vec2 dir=vec2(cos(a),sin(a));// basically reversing what aoc did in l.51
    float d=hexDist(dir);
    return dir/d;
}

void main(){
    float cbf=COORD_BOUNDS*2.;// calculate coordinate bounds factor (both -/+ -> *2)
    vec2 uv=((gl_FragCoord.xy-u_resolution.xy*.5)*cbf)/u_resolution.y;
    uv*=ZOOM_FACTOR;
    
    vec4 hc=hexCoords(uv)*cbf;
    uv=hc.xy;
    
    vec3 col=COL_BG;
    
    float rot=u_time+hc.w*oscillate(u_time,.2,1.8,1.);
    
    float a=.5*PI;
    float b=1.16*PI;
    float c=1.83*PI;
    vec2 p=hexEdge(a+rot);
    vec2 q=hexEdge(b+rot);
    vec2 r=hexEdge(c+rot);
    
    float l1=lineSegment(uv,p,q,LINE_THICKNESS);
    float l2=lineSegment(uv,q,r,LINE_THICKNESS);
    float l3=lineSegment(uv,r,p,LINE_THICKNESS);
    
    float d=min(min(l1,l2),l3);
    float bl=oscillate(hc.w+u_time,.08,1.,4.);
    col=mix(col,COL_TRI,1.-smoothstep(.0,bl,d));
    // col.rg=uv;
    
    gl_FragColor=vec4(col,1.);
    
}