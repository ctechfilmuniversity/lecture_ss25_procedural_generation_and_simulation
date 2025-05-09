#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;// canvas resolution (x: width, y: height)
uniform float u_time;// time elapsed since launch (in seconds)

float ZOOM_FACTOR=16.;
float PI=3.1415;

float line(vec2 origin,float angle,float thickness,float bloom){
    vec2 n=vec2(sin(angle),cos(angle));
    float d=dot(origin,n);
    d=abs(d);
    float s=smoothstep(.01,0.,d-thickness);// clear shape
    float b=smoothstep(bloom,0.,d-thickness);// bloom
    return s+b*bloom;
}

float oscillate(float time,float minValue,float maxValue,float speedDivisor){
    float scaledTime=time/speedDivisor;
    float amplitude=(maxValue-minValue)*.5;
    float midValue=minValue+amplitude;
    return midValue+amplitude*sin(scaledTime);
}

void main(){
    vec2 uv=(gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;// normalize and center screen coords
    uv*=ZOOM_FACTOR;
    vec2 id=floor(uv);
    float fid=id.x*id.y;// flattened id coord for continuous cell count
    uv=fract(uv)-.5;
    
    vec3 col=vec3(0);
    
    vec2 p=abs(uv);
    p.x+=oscillate(u_time,0.,.2,.6);
    p.y+=oscillate(u_time,0.,.2,1.2);
    col+=line(p,oscillate(u_time,.5,1.,2.)*PI+fid,.01,.2);// angle shift locked per cell
    
    gl_FragColor=vec4(col,1.);
    
}