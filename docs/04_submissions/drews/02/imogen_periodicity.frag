#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
uniform vec2 u_resolution;

float wave_triangle(float t, float frequency, float amplitude)
{

    return abs(mod(t * frequency, amplitude) - (0.5 * amplitude)); // flipping the negative values
    return mod(t * frequency, amplitude) - (0.5 * amplitude); // shifting the values to -0.5..0.5
    return t * frequency; // value between 0..10
}

float wave_sawtooth(float t, float frequency, float amplitude)
{

    return (t * frequency - floor(t* frequency)) * amplitude;
    
    return floor(t * frequency); // integer value between 0..10 (show with /10.)
    return t * frequency; // value between 0..10
    return t;
}

void main()
{
    vec2 pt = gl_FragCoord.xy/u_resolution;

    float frequency = 15.;
    float amplitude = 1.;
// here I used a triangle wave for the x axis and a sawtooth pattern for the y
    float pattern1 = wave_triangle(pt.x, frequency, amplitude);
    float pattern2 = wave_sawtooth(pt.y, frequency, amplitude);
    float pattern = pattern1 * pattern2;

    //I also decided to mix the colors 
    vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), pattern);

    // assigning the color:
    gl_FragColor = vec4(color,1.0);
}