/* 
    Code by kishimisu
    ShaderToy: https://www.shadertoy.com/view/mtyGWy
    Tutorial: https://youtu.be/f4s1h2YETNY
*/


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265359



// CREATING A COLOR RAMP AND
// SAMPLING IT WITH t
// https://iquilezles.org/articles/palettes/
// https://www.youtube.com/shorts/TH3OTy5fTog
// Inigo: "As t runs from 0 to 1 
// (our normalized palette index or domain), 
// the cosine oscilates 'freq' times with a phase of 'phase'. 
// The result is scaled and biased by 'offset' and 'amp' to 
// meet the desired constrast and brightness."
// This function shapes a cosine function for each
// color channel.
vec3 palette( float t, vec3 offset, vec3 amp, vec3 freq, vec3 phase)
{
    return offset + amp * cos(2.0 * PI * (freq * t + phase));
}

void main()
{
    // Coordinate System between -1..1, with 0, 0 at the center
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;

    // We save the original coordinates to use them
    // later for sampling the color ramp
    vec2 uv_original = uv;

    // This value will be the final
    // color value; we add to it with each 
    // iteration in the for-loop
    vec3 color = vec3(0.);

    // This is the "structural value" for function
    // the design. I already define it here
    // so that I can still display it as 
    // color for debugging 
    float d = 0.0;


    // We create different layers for the design
    // with a for-loop. Each iteration modifies
    // the space coordinates 'uv' as well
    // as the color sampling
    for(float i = 0.; i < 3.; i++)
    {

        // COORDINATE TRANSFORMATIONS
        // for creating repetition
        uv = fract(uv * 2.0) - 0.5;
        // Steps:
        // 1. fract(uv * 2.0);
        // Keep only the fractional parts; if
        // uv is negative, the new uv value goes
        // from 0..1 from the larger to the smaller,
        // meaning we have a nice 0..1, 0..1, 0..1, repetition
        // on both axis from the negative to the positive
        // 2. uv -= 0.5
        // We know that values range 0..1
        // hence we can shift them by 0.5
        // to put the center from is current 
        // position at 0,0 to the middle of one
        // tile at 0.5, 0.5


        // RADIAL LAYOUT
        // Mapping the coordinates from
        // a "rectangular" layout to a "radial" 
        // distance to the center at 0,0
        d = length(uv);

        // Multiplying the "structural" value d
        // with an additional "global" radial ramp
        // from higher values at 0,0 to 
        // lower values at the edge of the canvas
        // with a very soft transition 
        // (have a look at exp(-x) in graphtoy)
        // d = exp(-length(uv_original));
        d *= exp(-length(uv_original));


        // WAVES
        // 1. d = sin(d * 8.) / 8.;
        // Creating multiple rings with sin 
        // by increasing the
        // frequency and decreasing
        // the amplitude as design choice to
        // balance the final design
        // 2. Adding u_time as offset, which
        // "moves" the sin curve along the axis
        d = sin(d * 8. + u_time) / 8.;


        // Flipping all negative values 
        // (which we see as black)
        // to positive values to create 
        // further visible detail
        d = abs(d);


        // Inverting the function values
        // and pushing them to extreme high values
        // (have a look at the 0..1 range
        // of 0.02 / sin(x * 8) in graphtoy)
        d = 0.01 / d;

        // Increase contrast 
        // (I am not sure that I can see
        // an effect)
        d = pow(d, 1.2);

        // MAPPING THE STRUCTURAL PARAMETER d
        // TO A COLOR RAMP

        // Use the original coordinate uv_original
        // and a global radial layout
        // over -1..1 as map to pick the color
        // as a design choice
        float t = length(uv_original);
        // Animate the color mapping;
        // * 0.2 slows down the animation
        t += u_time * 0.2;
        // Adding an offset to the color sampling
        // depending on the iteration index i 
        // for a slightly different coloring 
        // for each iteration
        t += i * 0.3;

        // Keep in mind that the 4 vectors are not colors
        // but properties to shape a cos function
        // for each color channel
        // Also see the palette() definition above
        vec3 color_iteration = palette(t, vec3(0.5, 0.5, 0.5),
                                vec3(0.5, 0.5, 0.5), 
                                vec3(1.0, 1.0, 1.0), 
                                vec3(0.263,0.416,0.557));

        // Adding up all color values
        // from the iterations
        color += (d * color_iteration);
    }


    // HELPER FUNCTIONS
    // Display the coordinates
    // gl_FragColor = vec4(vec3(uv.y * uv.x), 1.0);

    // Display d and make all values >1 and < 0 as red
    // gl_FragColor = (d > 1. || d < 0.) ? vec4(vec3(1., 0., 0.), 1.0) : vec4(vec3(d), 1.0);

    // Display d
    // Keep in mind that d is
    // "set" anew for each iteration by
    // line 87: d = length(uv);
    // Hence we display here only
    // the value of the last iteration
    // gl_FragColor = vec4(vec3(d), 1.0);

    gl_FragColor = vec4(color, 1.0);

}