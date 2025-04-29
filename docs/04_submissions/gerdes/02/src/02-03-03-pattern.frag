#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;// canvas resolution (x: width, y: height)
uniform float u_time;// time elapsed since launch (in seconds)

float ZOOM_FACTOR=16.;
float PI=3.1415;

float line(vec2 origin,float angle,float thickness){
    vec2 n=vec2(sin(angle),cos(angle));
    float d=dot(origin,n);
    d=abs(d);
    return smoothstep(.08,0.,d-thickness);
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
    float fid=uv.x*uv.y;// flattened uv count producing per unit angle distortion in l.37
    uv=fract(uv)-.5;
    
    vec3 col=vec3(0);
    // col.g+=uv.x;
    // col.b+=uv.y;
    
    vec2 p=abs(uv);
    // p.y+=oscillate(u_time,0.,.1,1.);
    col+=line(p,oscillate(u_time,.5,1.,4.)*PI*fid,.01);
    
    gl_FragColor=vec4(col,1.);
    
}