#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
uniform vec2 u_resolution;


float wave_triangle(float t, float frequency, float amplitude)
{
    //return abs((mod(t * frequency), amplitude) - (0.5 * amplitude));

    return abs(mod(t * frequency, amplitude) - (0.5 * amplitude)); // flipping the negative values
    return mod(t * frequency, amplitude) - (0.5 * amplitude); // shifting the values to -0.5..0.5
    // return mod(t * frequency, amplitude); // 10* 0..1, SAME AS return (t * frequency) - floor(t * frequency);
    return t * frequency; // value between 0..10
}

float wave_sawtooth(float t, float frequency, float amplitude)
{

    return (t * frequency - floor(t* frequency)) * amplitude;
    // return (t * frequency) - floor(t * frequency); 
    return floor(t * frequency); // integer value between 0..10 (show with /10.)
    return t * frequency; // value between 0..10
    return t;
}


float wave_square(float t, float frequency, float amplitude)
{

    return mod(floor(t * frequency) , 2.0) * amplitude;
    // return mod(floor(t * frequency) , 2.0);
    // return floor(t * frequency); // integer value between 0..10 (show with /10.)
    // return t * frequency; // value between 0..10
    // return t;
}



void main()
{
    vec2 pt = gl_FragCoord.xy/u_resolution;

    float frequency = 10.;
    float amplitude = 1.;

    float pattern = wave_square(pt.x, frequency, amplitude);
    //vec3 color = mix(vec3(1., 0., 0.), vec3(0., 0., 1.), pattern);


    // vec3 color = vec3(wave_sawtooth(pt.x, frequency, amplitude));
    vec3 color = vec3(wave_triangle(pt.x, frequency, amplitude));

    // Assign frag color with alpha
    gl_FragColor = vec4(color,1.0);
}