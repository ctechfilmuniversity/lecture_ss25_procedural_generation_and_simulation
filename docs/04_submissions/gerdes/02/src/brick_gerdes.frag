/***********************************************************
* Procedural Brick Pattern
*
* Author: Lena Gieseke
*
* Implementation based on:
* Ebert, David S. Texturing & Modeling a Procedural Approach. San Francisco, Calif.: Morgan Kaufmann, 2003.
*
* Date: April 2019
*
* Purpose: Prototyping a procedural brick pattern
*
*********************************************************/

// Since this is a fragment shader it draws to the canvas directly ie. calculations are in regards to pixels, not geometry (vertices)

// boilerplate
// according to Claude: Configures the float precision on embedded systems (eg. mobile platforms)
#ifdef GL_ES
precision mediump float;
#endif

// predefined by env
uniform vec2 u_resolution;// canvas resolution (x: width, y: height)
uniform float u_time;// time elapsed since launch (unused)

// constants that act as parameters in following calculations
float BRICK_W=.3;// brick width
float BRICK_H=.1;// brick height
float MORTAR=.02;// mortar thickness

// HELPER FUNCTIONS
// (no need to comment these)
float getBias(float t,float bias)
{
  return(t/((((1./bias)-2.)*(1.-t))+1.));
}

// (commented out because unused)
// float getGain(float t, float gain)
// {
  //   if(t < 0.5)
  //     return getBias(t * 2.0, gain) / 2.0;
  //   else
  //     return getBias(t * 2.0 - 1.0, 1.0 - gain) / 2.0 + 0.5;
// }

// actual shader program that is run for each pixel
void main()
{
  // calc coords normalized to canvas resolution (0-1 float values)
  vec2 coord=gl_FragCoord.xy/u_resolution;
  
  // All parameter values between 0..1
  float brick_mortar_w=BRICK_W+MORTAR;// eg. 0.32
  float brick_mortar_h=BRICK_H+MORTAR;// eg. 0.12
  float mortar_half_norm_w=(MORTAR*.5)/brick_mortar_w;// eg. 0.03125
  float mortar_half_norm_h=(MORTAR*.5)/brick_mortar_h;// eg. 0.08333
  
  // BRICK PATTERN
  
  // x, y describe coordinates relating to current brick (including 1x mortar; 0.5 on each side)
  float x=coord.x/brick_mortar_w;// eg. 0.5 / (0.3+0.02) = 1.5625 (in the second brick horizontally; left to right)
  float y=coord.y/brick_mortar_h;// eg. 0.5 / (0.1+0.02) = 4.1667 (in the fifth brick vertically; bottom to top)
  
  // derives precise row (y_index) and offsets every even-numbered row by 0.5 (half; relative to full brick width) in horizontal (x) direction
  float y_index=floor(y);
  if(mod(y_index,2.)==0.)
  {
    x+=.5;
  }
  
  // remaps coordinates to 0..1 range; relative to current brick (honoring x offset in even rows, drops information about row and column)
  x-=floor(x);
  y-=y_index;
  
  // Simplified versions:
  // float w = step(mortar_half_norm_w, x) - step(1.0 - mortar_half_norm_w, x);
  // float h = step(mortar_half_norm_h, y) - step(1.0 - mortar_half_norm_h, y);
  // or
  // float w = smoothstep(0.0, mortar_half_norm_w, x) - smoothstep(1.0 - mortar_half_norm_w, 1.0, x);
  // float h = smoothstep(0.0, mortar_half_norm_h, y) - smoothstep(1.0 - mortar_half_norm_h, 1.0, y);
  
  // step (or smoothstep) for x beyond edge0 returns 0, beyond edge1 returns 1
  // 1 brick has 0.5 MORTAR on each side (two adjacent bricks thereby 1 MORTAR in between) so we use the mortar_half_norm constant (normalized to brick dimension)
  // subtraction of first half [0..mortar_half_norm] (beginning of brick) and second half [1-mortar_half_norm..1] (end of brick) results in w and h returning 1 within the brick area [mortar_half_norm..1-mortar_half_norm] and 0 (with smooth falloff thanks to the smoothstep) within mortar areas
  // getBias(): shift the smoothstep function towards one (<0.5) or the other (>0.5) side
  float w=getBias(smoothstep(0.,mortar_half_norm_w,x),.3)
  -getBias(smoothstep(1.-mortar_half_norm_w,1.,x),.7);
  float h=getBias(smoothstep(0.,mortar_half_norm_h,y),.3)
  -getBias(smoothstep(1.-mortar_half_norm_h,1.,y),.7);
  
  // w * h is used to interpolate: when close or equal to 0 renders as mortar (x) otherwise as brick (y) color; either w or h are getting close or equal to 0 upon nearing the edge of a brick so the product would become close or equal to 0 as well (mortar)
  vec3 color=mix(vec3(.2,.15,.15),vec3(.5,.25,.2),getBias(w*h,.2));
  
  // vec3 color = vec3(w * h);
  
  // applies the calculated color vector to the current fragment/pixel (v1 as alpha)
  gl_FragColor=vec4(color,1.);
}
