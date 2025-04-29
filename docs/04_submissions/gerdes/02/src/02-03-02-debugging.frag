#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;// canvas resolution (x: width, y: height)
uniform float u_time;// time elapsed since launch (in seconds)

precision mediump float;

void main(){
    vec2 uv=(gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;// normalize and center screen coords
    uv*=4.;// zoom
    
    vec3 col=vec3(0);
    col.g+=uv.x;
    col.b+=uv.y;
    
    vec2 p=abs(uv);
    if(max(p.x,p.y)>1.)col.r+=1.;// draw (add) red frame
    
    gl_FragColor=vec4(col,1.);
    
}