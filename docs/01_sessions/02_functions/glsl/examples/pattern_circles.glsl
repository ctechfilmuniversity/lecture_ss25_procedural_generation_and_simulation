#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float CELLSIZE = 0.2; //relative, hence 0..1
vec2 OFFSET = vec2(0.25);
// vec2 OFFSET = vec2(0.5);

void main()
{

    vec2 coord = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;

    // Create Cells
    coord /= CELLSIZE;
    
    // Get into one cell
    coord -= floor(coord);

    // Modify value range from 0..1 to -1..1
    // and then taking the absolute
    vec2 coord_remap = abs((coord - 0.5) * 2.0);

    // Ridges
    float d = distance(coord_remap, OFFSET);
    d *= 8.0;
    d -= floor(d);

    vec3 color = mix(vec3(1.0, 0.9176, 0.0), vec3(0.4745, 0.0, 0.4196), d);
    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(vec3(d), 1.0);
}



// X, Y separated

// void main()
// {

//     vec2 coord = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;

    
//     // 5a. Remapping the range to -1..1
//     // 5b. and taking the absolute values

//     float x = coord.x / CELLSIZE;
//     float y = coord.y / CELLSIZE;
//     x -= floor(x);
//     y -= floor(y);

//     // Modify value range from 0..1 to -1..1
//     float x_remap = abs(x - 0.5) * 2.0;
//     float y_remap = abs(y - 0.5) * 2.0;
    
//     float d = distance(vec2(x_remap, y_remap), OFFSET);
//     d *= 8.0;
//     d -= floor(d);

//     vec3 color = mix(vec3(1.0, 0.9176, 0.0), vec3(0.4745, 0.0, 0.4196), d);
//     gl_FragColor = vec4(color, 1.0);
// }