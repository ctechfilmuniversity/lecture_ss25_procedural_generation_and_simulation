#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;// canvas resolution (x: width, y: height)
uniform float u_time;// time elapsed since launch (in seconds)

precision mediump float;

void main(){
    vec2 uv=(gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;// normalize and center screen coords
    uv*=4.;// zoom
    // uv=fract(uv)-.505;//repeat the pattern (overlap to make frame visible)
    
    vec3 col=vec3(0);
    col.g+=uv.x;
    col.b+=uv.y;
    
    vec2 p=abs(uv);// symmetry; negative values beyond center (0,0) [left, bottom] -> inverse;
    // vec2 p=uv;
    
    if(max(p.x,p.y)>.5)col.r+=1.;// draw (add) red frame
    // frame visualizes the coordinate system we transformed to (-.5 to .5 on both axis; green and blue as positive coordinate space)
    
    gl_FragColor=vec4(col,1.);
    
}