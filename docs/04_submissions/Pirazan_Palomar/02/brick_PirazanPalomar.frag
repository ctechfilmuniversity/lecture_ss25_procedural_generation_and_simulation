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
//COMMENTED BY: David Leonardo Pirazán Palomar

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; //here we have de initialization of the new vector called "u_resolution", which will contain the transformed pixel coordinates of the normalization. 
uniform float u_time; //here we have de initialization of time

//here is the initialization of the variables to shape the bricks and its divisions.
float BRICK_W = 0.3; //width of the bricks
float BRICK_H = 0.1; //height of the bricks
float MORTAR =  0.02; //division's size

// HELPER FUNCTIONS
// (no need to comment these)

float getBias(float t, float bias)
{
  return (t / ((((1.0 / bias) - 2.0) * (1.0 - t)) + 1.0));
}

float getGain(float t, float gain)
{
  if(t < 0.5)
    return getBias(t * 2.0, gain) / 2.0;
  else
    return getBias(t * 2.0 - 1.0, 1.0 - gain) / 2.0 + 0.5;
}

void main()
{
   //this is the normalization process of the fragCoord vector so the coordinates do not depend on the current resolution of the canvas aka. the resolution of each device where this is displayed. 
    vec2 coord = gl_FragCoord.xy/u_resolution; 
    

    // All parameter values between 0..1
    float brick_mortar_w = BRICK_W + MORTAR;
    float brick_mortar_h = BRICK_H + MORTAR;
    float mortar_half_norm_w = (MORTAR * 0.5) / brick_mortar_w;
    float mortar_half_norm_h = (MORTAR * 0.5) / brick_mortar_h;

    // BRICK PATTERN
    // TODO: comment the following steps

    //
    float x = coord.x / brick_mortar_w; //initialization of x as the result of dividing the entire x axis (coord.x) in brick_mortar_w, which is the addition of the width of the bricks and 1 0f the divisions (mortar).
    float y = coord.y / brick_mortar_h; //initialization of y as the result of dividing the entire x axis (coord.x) in brick_mortar_w, which is the addition of the height of the bricks and 1 0f the divisions (mortar).
    // float x = coord.x;
    // float y = coord.y;

    // 
    float y_index = floor(y); //initialization of y_index, which takes y and with the help of the floor function gets rid of any decimal values.
    if( mod(y_index, 2.0 ) == 0.0) // here the 2.0 is indicating that the "bricks" of each row in between should have an offset in the x axis. If the number would be higher, 4.0 for example, it would only happen every 4th row. 
    {
        x += 0.5; //with this "if" clause this patters looks like a brick wall thanks to the 0.5 offset in the x axis of each row in between. Without this the patter would look like a rectangular grid and no like a brick wall. 
    }

    // 
    x -= floor(x); //here we are creating repeating ranges, that is the bricks
    y -= y_index; //here we are creating repeating ranges, that is the bricks

    // Simplified versions:
    // float w = step(mortar_half_norm_w, x) - step(1.0 - mortar_half_norm_w, x);
    // float h = step(mortar_half_norm_h, y) - step(1.0 - mortar_half_norm_h, y);
    // or
    // float w = smoothstep(0.0, mortar_half_norm_w, x) - smoothstep(1.0 - mortar_half_norm_w, 1.0, x);
    // float h = smoothstep(0.0, mortar_half_norm_h, y) - smoothstep(1.0 - mortar_half_norm_h, 1.0, y);


    //here is the fine-tuning of the interpolation function curve, where Bias is the controlling the separation of color between the division of the bricks and the bricks. The smoothness is involved, making sure that there is a clear division between the bricks and the divisions too. 
    float w = getBias(smoothstep(0.0, mortar_half_norm_w, x), 0.3) 
                - getBias(smoothstep(1.0 - mortar_half_norm_w, 1.0, x), 0.7);
    float h = getBias(smoothstep(0.0, mortar_half_norm_h, y), 0.3) 
                - getBias(smoothstep(1.0 - mortar_half_norm_h, 1.0, y), 0.7);
    

    // vec3 color = vec3(w * h);

    //this is the interpolation. The first value is the start of the range in which to interpolate, the second is the end of the range in which to interpolate.  
    vec3 color = mix(vec3(0.2, 0.15, 0.15), vec3(0.5, 0.25, 0.2), getBias(w * h, 0.2));

   
    gl_FragColor = vec4(color, 1.0);   //Assign frag color with alpha.
}
