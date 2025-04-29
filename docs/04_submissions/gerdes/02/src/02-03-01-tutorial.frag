// based on this https://www.youtube.com/watch?v=51LwM2R_e_o (Art of Code)

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;// canvas resolution (x: width, y: height)
uniform float u_time;// time elapsed since launch (in seconds)

float LINE_THICKNESS=.01;

float oscillate(float time,float minValue,float maxValue,float speedDivisor){
    float scaledTime=time/speedDivisor;
    float amplitude=(maxValue-minValue)*.5;
    float midValue=minValue+amplitude;
    return midValue+amplitude*sin(scaledTime);
}

void main(){
    vec2 coord=(gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;//
    coord*=8.;// zoom factor
    
    vec2 id=floor(coord);// assign ids to cells
    float check=mod(id.x+id.y,2.);// assign 1.0 to every second (even id) cell; checkerboard
    
    vec3 color=vec3(0);
    // color += check;
    
    coord=fract(coord)-.5;// repeat the pattern
    vec2 p=abs(coord);// symmetry
    
    if(check==1.)p=p.yx;// flip coordinates ie. rotate by 90°
    
    float k=oscillate(u_time,.5,1.,2.);
    float a=k*3.1415;// .5..1.0
    vec2 n=vec2(sin(a),cos(a));// direction vector based on a
    
    float d=dot(p-(.5-LINE_THICKNESS),n);// distance to line
    d=min(d,p.x);
    d=max(d,-p.y);
    
    d=abs(d);
    
    color+=smoothstep(.01,0.,d-LINE_THICKNESS);// draw line
    
    // if (max(p.x, p.y) > .49) color.b += .8; // draw square
    
    gl_FragColor=vec4(color,1.);
}