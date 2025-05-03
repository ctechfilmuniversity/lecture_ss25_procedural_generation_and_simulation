name: inverse
layout: true
class: center, middle, inverse
---


# Procedural Generation and Simulation

### Prof. Dr. Lena Gieseke | l.gieseke@filmuniversitaet.de  

#### Film University Babelsberg KONRAD WOLF

---
layout: false


  
.center[<img src="../02_scripts/img/tilings/tiling_unreal_01.png" alt="tiling_unreal_01" style="width:100%;">]  
  


---


## Today


--
* Function Design Recap & Homework

--

* Tilings & the Universe

--

* (Unreal Example)



---
## Function Design

--

.center[<img src="../02_scripts/img/functions/batman_03.png" alt="batman_03" style="width:80%;">]    

--

> The idea is to modify, shape and to combine different functions. 

???
  


.center[<img src="../02_scripts/img/functions/func_06.png" alt="func_06" style="width:66%;">]  


As if we project the 3D plot onto a 2D plane.


---
## Function Design

<img src="../02_scripts/img/functions/func_09b.png" alt="func_09b" style="width:24%;">
<img src="../02_scripts/img/functions/func_09.png" alt="func_09" style="width:70%;">  

--

* Structural parameter between 0..1
* Mapping of color to that range


???
  

* What is demonstrated here?



---
## Function Design

.left-even[<img src="../02_scripts/img/functions/pattern_08.png" alt="pattern_08" style="width:100%;">]


???
  

* What were the steps?

--

.right-even[
One cell:
* Radial values with distance computation to given center point
* Ridges with `floor`
* Mirroring in x and y as coordinate transformation 
  
Repetition of cell:
* Squishing and repeating the 0..1 range as coordinate transformation 
]



---
.header[Example]

## One Cell

Let's start with creating a circle...

.left-even[<img src="../02_scripts/img/functions/pattern_02a.png" alt="pattern_02a" style="width:80%;">]  


...by plotting the distance of each coordinate to the center point `0.5`, `0.5`.


???
  

* The [`distance()`](https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/distance.xhtml) function calculates the distance between two points.
* The [`mix()`](https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/mix.xhtml) function linearly interpolate between two values.

---
.header[Example]

## One Cell


```glsl
vec2 coord = gl_FragCoord.xy/u_resolution.y;

// 1. One Cell, distance to center point
float d = distance(coord, vec2(0.5));

vec3 color = mix(vec3(0.5, 0.0, 0.0), vec3(0.35, 0.2, 0.5), d);
gl_FragColor = vec4(color, 1.0);
```


---
.header[Example]

## Ridges

Next, let's create ridges with the [`floor`](https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/floor.xhtml) function.


<img src="../02_scripts/img/functions/pattern_03a.png" alt="pattern_03a" style="width:36%;">

---
.header[Example]

## Ridges


```glsl
vec2 coord = gl_FragCoord.xy/u_resolution.y;

// 2. Ridges
float d = distance(coord, vec2(0.5));
d *= 8.0;
d -= floor(d);     // d = mod(d, 1.0);

vec3 color = mix(vec3(0.5, 0.0, 0.0), vec3(0.35, 0.2, 0.5), d);
gl_FragColor = vec4(color, 1.0);
```


---
.header[Example]

## Mirroring in x and y

With pushing a function into negative values and flipping it with `abs` back into the positive space, we create a 4-fold mirroring effect in x and y:

<img src="../02_scripts/img/functions/pattern_03c.png" alt="pattern_03c" style="width:32%;"> 

--
<img src="../02_scripts/img/functions/pattern_03b.png" alt="pattern_03b" style="width:33%;">



---
.header[Example]

## Mirroring in x and y

```glsl
vec2 coord = gl_FragCoord.xy/u_resolution.y;

// Modify value range from 0..1 to -1..1
// and then taking the absolute
vec2 coord_remap = abs((coord - 0.5) * 2.0);

// Ridges
float d = distance(coord_remap, OFFSET);
d *= 8.0;
d -= floor(d);


vec3 color = mix(vec3(1.0, 0.9176, 0.0), vec3(0.4745, 0.0, 0.4196), d);
gl_FragColor = vec4(color, 1.0);
```





---
.header[Example] 

## Repetitive Cells

Next, let's create the cells...
  
.left-even[<img src="../02_scripts/img/functions/pattern_07a.png" alt="pattern_07a" style="width:85%;">]  

.right-even[...by dividing the 0..1 original x,y coordinate by the cell size.]

---
.header[Example] 

## Repetitive Cells

```glsl
    float CELLSIZE = 0.2; //relative, hence between 0..1

    // Create Cells
    coord /= CELLSIZE;
    coord -= floor(coord);

    // Modify value range from 0..1 to -1..1
    // and then taking the absolute
    vec2 coord_remap = abs((coord - 0.5) * 2.0);

    // Ridges
    float d = distance(coord_remap, OFFSET);
    d *= 8.0;
    d -= floor(d);
```

---
.header[Example] 

## Repetitive Cells

.center[<img src="../02_scripts/img/functions/cells_01.png" alt="cells_01" style="width:95%;">] 

---
.header[Example] 

## Repetitive Cells

.center[<img src="../02_scripts/img/functions/cells_02.png" alt="cells_02" style="width:95%;">] 

---
.header[Example] 

## Repetitive Cells

.center[<img src="../02_scripts/img/functions/cells_04.png" alt="cells_04" style="width:95%;">] 

---
.header[Example] 

## Repetitive Cells

.center[<img src="../02_scripts/img/functions/cells_05.png" alt="cells_05" style="width:95%;">] 

---
.header[Example] 

## Repetitive Cells

.center[<img src="../02_scripts/img/functions/cells_06.png" alt="cells_06" style="width:95%;">] 

---
.header[Example] 

## Repetitive Cells

.center[<img src="../02_scripts/img/functions/cells_07.png" alt="cells_07" style="width:95%;">] 

---
.header[Example] 

## Repetitive Cells

.center[<img src="../02_scripts/img/functions/cells_08.png" alt="cells_08" style="width:95%;">] 

---
## Example

.center[<img src="../02_scripts/img/functions/pattern_07.png" alt="pattern_07" style="width:50%;">]  

---
## Example

.center[<img src="../02_scripts/img/functions/pattern_circles_unreal_01.png" alt="pattern_08" style="width:100%;">]

???
  
* Functions (in GLSL)
* Material nodes (in Unreal)
* Functions (in Unreal)
* High-level shader language



---

<img src="../02_scripts/img/functions/shader_example_01.png" alt="pattern_08" style="width:100%;">  
.footnote[[[kishimisu - ShaderToy]](https://www.shadertoy.com/view/mtyGWy)]



---
.header[Function Design]

## Design Goals


???
  

* To understand the above described different components is hopefully with some brain power manageable. But putting components together can be quite daunting. Also, don't be scared away by cryptic examples you will find on the web. Function design code is notoriously difficult to read as it is often optimized for performance.

The best side for finding shader inspirations is [Shadertoy](https://www.shadertoy.com/) run by Inigo Quilez. ShaderToy is packed with very good examples (but also some bad ones...) and code to steal. Unfortunately, ShaderToy is slightly its own world with different variables namings and core functions. We will come back to the awesomeness that is ShaderToy in the Shader Programming workshop.



--

*How to find the gist of a function design?*

<br />


???

Whenever you find function designs that you would like to understand, you should try to find the overall *gist* of the design.


--

Divide and conquer:

--
* Separate functionalities, e.g. turn of animation, sound, interaction etc.

--
* Test different values for constants and defines

--
* Take out all scaling factors, offsets, etc.

--
* Go line by line and display the result of each line separately

--
  
<br/>
Here, only practice and patience help.  



---
.header[Function Design]

## Brick Pattern


<img src="../02_scripts/img/functions/bricks_01.png" alt="bricks_01" style="width:40%;">

--
  <img src="../02_scripts/img/functions/ebert_01.jpg" alt="ebert_01" style="width:32%;">  

???
  

* bricks.frag

---
.header[Function Design]

## Brick Pattern

.center[<img src="../02_scripts/img/functions/tex_brick_params.png"  style="width:80%;">]

---
.header[Function Design]

## Brick Pattern

```glsl
float BRICK_W = 0.3;  
float BRICK_H = 0.1; 
float MORTAR =  0.02; 

vec2 coord = gl_FragCoord.xy/u_resolution.y;
```

* `coord` is the coordinate of the current fragement to shade
* `coord` is normalized to run between 0..1


???
  

The fragement coordinates are mapped to 0..1

Let's say our window has a width of 512 and `gl_FragCoord.x` is `200`:

* `200 / 512 = 0,39`



---
.header[Function Design]

## Brick Pattern

Computing the size of one cell:

```glsl
float brick_mortar_w = BRICK_W + MORTAR;
float brick_mortar_h = BRICK_H + MORTAR;
```

--

.center[<img src="../02_scripts/img/functions/tex_brick_params.png" style="width:50%;">]



---
.header[Function Design]

## Brick Pattern

```glsl
float BRICK_W = 0.3;  
float BRICK_H = 0.1; 
float MORTAR =  0.02; 

vec2 coord = gl_FragCoord.xy/u_resolution.y;

float brick_mortar_w = BRICK_W + MORTAR;
float brick_mortar_h = BRICK_H + MORTAR;

// ?
float x = coord.x / brick_mortar_w;
float y = coord.y / brick_mortar_h;
```

---
.header[Function Design]

## Brick Pattern

```glsl
float BRICK_W = 0.3;  
float BRICK_H = 0.1; 
float MORTAR =  0.02; 

vec2 coord = gl_FragCoord.xy/u_resolution.y;

float brick_mortar_w = BRICK_W + MORTAR;
float brick_mortar_h = BRICK_H + MORTAR;

// CREATE THE TILING
// The value range is converted from 0..1.0
// to 0.0..number_of_tiles, 
// where one tile runs from n_tile..n_tile + 1
float x = coord.x / brick_mortar_w;
float y = coord.y / brick_mortar_h;
```


???
  

* `brick_mortar_w = 0.32`, `coord.x = 0..1`

  
    * `0.1 / 0.32 = 0.312`
    * `0.25 / 0.32 = 0.78`
    * `0.5 / 0.32 = 1.56`
    * `0.75 / 0.32 = 2.34`
    * `1.0 / 0.32 = 3.125`


Let's say our window has a width of 512 and `gl_FragCoord.x` is `200`:

* `200 / 512 = 0,39`

---
.header[Function Design]

## Brick Pattern

```glsl
float brick_mortar_w = BRICK_W + MORTAR;
float brick_mortar_h = BRICK_H + MORTAR;

// CREATE THE TILING
// The value range is converted from 0..1.0
// to 0.0..number_of_tiles, 
// where one tile runs from n_tile..n_tile + 1
float x = coord.x / brick_mortar_w;
float y = coord.y / brick_mortar_h;

float mortar_half_norm_w = (MORTAR * 0.5) / brick_mortar_w;
float mortar_half_norm_h = (MORTAR * 0.5) / brick_mortar_h;
```

Applying the same (coordinate) transformation to the given mortar sizing.

---
.header[Function Design]

## Brick Pattern

```glsl
float x = coord.x / brick_mortar_w;
float y = coord.y / brick_mortar_h;

// ?
float y_index = floor(y);
if( mod(y_index, 2.0 ) == 0.0) {

    x += 0.5;
}
```


---
.header[Function Design]

## Brick Pattern

```glsl
float x = coord.x / brick_mortar_w;
float y = coord.y / brick_mortar_h;

// SHIFTING EVERY OTHER ROW
// Shift the brick x position in 
// every other row
float y_index = floor(y);
if( mod(y_index, 2.0 ) == 0.0)
{
    x += 0.5;
}
```

---
.header[Function Design]

## Brick Pattern
  
* `y1 = 1.4`, `y1 = 2.6`

--
* `y_index1 = 1`, `y_index2 = 2`

--
* `mod(1.0, 2.0 ) == 0.0` => false
* `mod(2.0, 2.0 ) == 0.0` => true
    * `x1 += 0.5`

--

.center[<img src="../02_scripts/img/functions/bricks_02.png" alt="bricks_02" style="width:25%;">]



---
.header[Function Design]

## Brick Pattern

```glsl
// SHIFTING EVERY OTHER ROW
float y_index = floor(y);
if( mod(y_index, 2.0 ) == 0.0){

    x += 0.5;
}

// ?
x -= floor(x);
y -= y_index;
```



---
.header[Function Design]

## Brick Pattern

```glsl
// SHIFTING EVERY OTHER ROW
float y_index = floor(y);
if( mod(y_index, 2.0 ) == 0.0){
    
    x += 0.5;
}

// COORDINATE NORMALIZATION
// x,y should run again between 0..1 on a single brick
// (including one-half of the mortar around the brick)
x -= floor(x);
y -= y_index;
```

--
* `1.4` => `0.4`, `2.6` => `0.6`



---
.header[Function Design]

## Brick Pattern

```glsl
// Simplified version

// ?
float w = step(mortar_half_norm_w, x) - step(1.0 - mortar_half_norm_w, x);
float h = step(mortar_half_norm_h, y) - step(1.0 - mortar_half_norm_h, y);
```

---
.header[Function Design]

## Brick Pattern

```glsl
// ?
float w = step(mortar_half_norm_w, x) - step(1.0 - mortar_half_norm_w, x);
```

---
.header[Function Design]

## Brick Pattern

```glsl
// ?
float w = step(t, x);
```

.center[<img src="../02_scripts/img/functions/transition_03.png" alt="transition_03" style="width:100%;">]

> 0.0 is returned if x < t, and 1.0 is returned otherwise. 


???
  

* https://docs.gl/el3/step


---
.header[Function Design]

## Brick Pattern

```glsl
// ?
float w = step(mortar_half_norm_w, x);
```

--

.center[<img src="../02_scripts/img/functions/bricks_03.png" alt="bricks_03" style="width:60%;">]


---
.header[Function Design]

## Brick Pattern

```glsl
// ?
// float w = step(mortar_half_norm_w, x) - step(1.0 - mortar_half_norm_w, x);
float w = step(1.0 - mortar_half_norm_w, x);
```

--

.center[<img src="../02_scripts/img/functions/bricks_04.png" alt="bricks_04" style="width:52%;">]


---
.header[Function Design]

## Brick Pattern

```glsl
// ?
// float w = step(mortar_half_norm_w, x) - step(1.0 - mortar_half_norm_w, x);
float w = step(1.0 - mortar_half_norm_w, x);
```

.center[<img src="../02_scripts/img/functions/bricks_05.png" alt="bricks_05" style="width:50%;">]

---
.header[Function Design]

## Brick Pattern

```glsl
// ?
float w = step(mortar_half_norm_w, x) - step(1.0 - mortar_half_norm_w, x);
```

.center[<img src="../02_scripts/img/functions/bricks_06.png" alt="bricks_06" style="width:30%;">]

---
.header[Function Design]

## Brick Pattern

```glsl
// CREATING THE BRICK "OUTLINE"
float w = step(mortar_half_norm_w, x) - step(1.0 - mortar_half_norm_w, x);
```

.center[<img src="../02_scripts/img/functions/bricks_07.png" alt="bricks_07" style="width:55%;">]

---
.header[Function Design]

## Brick Pattern

```glsl
// Simplified version

// CREATING THE BRICK "OUTLINE"
float w = step(mortar_half_norm_w, x) - step(1.0 - mortar_half_norm_w, x);
float h = step(mortar_half_norm_h, y) - step(1.0 - mortar_half_norm_h, y);
```


.center[<img src="../02_scripts/img/functions/bricks_08.png" alt="bricks_08" style="width:30%;">]

---
.header[Function Design]

## Brick Pattern

```glsl
// ?
float w = smoothstep(0.0, mortar_half_norm_w, x) 
           - smoothstep(1.0 - mortar_half_norm_w, 1.0, x);
float h = smoothstep(0.0, mortar_half_norm_h, y) 
           - smoothstep(1.0 - mortar_half_norm_h, 1.0, y);
```

---
.header[Function Design]

## Brick Pattern

```glsl
float w = smoothstep(0.0, mortar_half_norm_w, x);
```
--

> smoothstep returns 0.0 if x ≤ edge0 and 1.0 if x ≥ edge1. 


???
  

https://docs.gl/el3/smoothstep


---
.header[Function Design]

## Brick Pattern

```glsl
float w = smoothstep(0.0, mortar_half_norm_w, x);
```

.center[<img src="../02_scripts/img/functions/bricks_09.png" alt="bricks_09" style="width:60%;">]


???
  

https://docs.gl/el3/smoothstep


---
.header[Function Design]

## Brick Pattern

```glsl
// CREATING THE BRICK "OUTLINE"
float w = smoothstep(0.0, mortar_half_norm_w, x) 
            - smoothstep(1.0 - mortar_half_norm_w, 1.0, x);
```

--

.center[<img src="../02_scripts/img/functions/bricks_10.png" alt="bricks_10" style="width:50%;">]

---
.header[Function Design]

## Brick Pattern

```glsl
// ?
float w = getBias(smoothstep(0.0, mortar_half_norm_w, x), 0.3) 
             - getBias(smoothstep(1.0 - mortar_half_norm_w, 1.0, x), 0.7);
```

---
.header[Function Design]

## Brick Pattern

```glsl
// ?
float w = getBias(smoothstep(0.0, mortar_half_norm_w, x), 0.3)
```

--

.center[<img src="../02_scripts/img/functions/bias_01.png" alt="bias_01" style="width:35%;">]

---
.header[Function Design]

## Brick Pattern

```glsl
// ?
float w = getBias(smoothstep(0.0, mortar_half_norm_w, x), 0.3)
```

.center[<img src="../02_scripts/img/functions/bricks_11.png" alt="bricks_11" style="width:42%;">]



---
.header[Function Design]

## Brick Pattern

```glsl
// FAKE SHADOW
// Modify the curve with bias for a longer dark 
// and a shorter white transition
float w = getBias(smoothstep(0.0, mortar_half_norm_w, x), 0.3) 
             - getBias(smoothstep(1.0 - mortar_half_norm_w, 1.0, x), 0.7);
```

.center[<img src="../02_scripts/img/functions/bricks_12.png" alt="bricks_12" style="width:42%;">]





---
## Function Design


.center[<img src="../02_scripts/img/functions/bricks_01.png" alt="bricks_01" style="width:46%;">]  


???
* Homework: changed versions




???

* Free scenes
* ShaderToy examples
* Unreal scene





---
template: inverse

### Chapter
# Tilings & The Universe

---

## Tilings


???
  

* What is a tiling?

--

A tiling is a flat surface with some pattern of geometric shapes (*tiles*), with no overlaps or gaps.  

---
## Tilings

<img src="../02_scripts/img/tilings/tilings_15.png" alt="tilings_15" style="width:100%;"> 
.imgref[[[pi.math.cornell]](http://pi.math.cornell.edu/~mec/2008-2009/KathrynLindsey/PROJECT/Page2.htm)]



---
## Tilings

.center[<img src="../02_scripts/img/tilings/hexgrid_02.png" alt="hexgrid_02" style="width:100%;">]


???

So far, we have used simple grids to create repetitive patterns. However, grid with hexagons are also very commonly used!

* Unreal would be the way to go: https://www.youtube.com/watch?v=hc6msdFcnA4
* https://www.youtube.com/watch?v=VmrIDyYiJBA


---
.header[Tilings]

.center[<img src="../02_scripts/img/tilings/tutorial_07_islamicpattern_01.png" alt="tutorial_07_islamicpattern_01" style="width:55%;">]

---
.header[Tilings]

.center[<img src="../02_scripts/img/tilings/tutorial_07_islamicpattern_01.png" alt="tutorial_07_islamicpattern_01" style="width:48%;"> <img src="../02_scripts/img/tilings/tutorial_07_islamicpattern_01a.png" alt="tutorial_07_islamicpattern_01a" style="width:48%;">]

---
.header[Tilings]

.center[<img src="../02_scripts/img/tilings/tutorial_07_islamicpattern_01b.png" alt="tutorial_07_islamicpattern_01b" style="width:55%;">]


---
.header[Tilings]

.center[<img src="../02_scripts/img/tilings/tutorial_07_islamicpattern_02.png" alt="tutorial_07_islamicpattern_01" style="width:55%;">]

---
.header[Tilings]

.center[<img src="../02_scripts/img/tilings/tutorial_07_islamicpattern_02.png" alt="tutorial_07_islamicpattern_02" style="width:48%;"> <img src="../02_scripts/img/tilings/tutorial_07_islamicpattern_02a.png" alt="tutorial_07_islamicpattern_02a" style="width:48%;">]

---
.header[Tilings]

.center[<img src="../02_scripts/img/tilings/tutorial_07_islamicpattern_03.png" alt="tutorial_07_islamicpattern_01" style="width:55%;">]

---
.header[Tilings]

.center[<img src="../02_scripts/img/tilings/tutorial_07_islamicpattern_03.png" alt="tutorial_07_islamicpattern_02" style="width:48%;"> <img src="../02_scripts/img/tilings/tutorial_07_islamicpattern_03a.png" alt="tutorial_07_islamicpattern_03a" style="width:48%;">]

---
.header[Tilings]

.center[<img src="../02_scripts/img/tilings/tutorial_07_islamicpattern_05.png" alt="tutorial_07_islamicpattern_05" style="width:55%;">]

---
.header[Tilings]

.center[<img src="../02_scripts/img/tilings/tutorial_07_islamicpattern_05.png" alt="tutorial_07_islamicpattern_05" style="width:48%;"> <img src="../02_scripts/img/tilings/tutorial_07_islamicpattern_05a.png" alt="tutorial_07_islamicpattern_05a" style="width:48%;">]


???
  

* pattern_islamic_hex.frag


---
.header[Tilings]

## Hexagonal Grids

--

.center[<img src="../02_scripts/img/tilings/hexgrid_03.png" alt="hexgrid_03" style="width:33%;"><img src="../02_scripts/img/tilings/hexgrid_04.png" alt="hexgrid_04" style="width:33%;"><img src="../02_scripts/img/tilings/hexgrid_05.png" alt="hexgrid_05" style="width:33%;">]


???
  

* Another way to look at hexagonal grids is to see that there are three primary axes, unlike the two we have for square grids. There's an elegant symmetry with these.
* https://www.redblobgames.com/grids/hexagons

---
.header[Tilings]

## Distances in Grids 


.center[<img src="../02_scripts/img/tilings/hexgrid_06.png" alt="hexgrid_06" style="width:70%;">]  
.imgref[[[wiki]](https://en.wikipedia.org/wiki/Hex_map)]


???
  

* Advantage of hex maps in games: consistent distance from center to center compared to squares.
* This distance is √3 times that of a hexagon side.

he primary advantage of a hex map over a traditional square grid map is that the distance between the center of each and every pair of adjacent hex cells (or hex) is the same. By comparison, in a square grid map, the distance from the center of each square cell to the center of the four diagonal adjacent cells it shares a corner with is √2 times that of the distance to the center of the four adjacent cells it shares an edge with. This equidistant property of all adjacent hexes is desirable for games in which the measurement of movement is a factor. The other advantage is the fact that neighbouring cells always share edges; there are no two cells with contact at only a point. 

* https://pro.arcgis.com/en/pro-app/latest/tool-reference/spatial-statistics/h-whyhexagons.htm

---
.header[Tilings]

## Hexagonal Grids


.center[<img src="../02_scripts/img/tilings/hexgrid_07.png" alt="hexgrid_07" style="width:75%;">] .imgref[[[gamedev]](https://gamedev.stackexchange.com/questions/83412/hexagonal-game-board-modal)]

---
.header[Tilings]

## Hexagonal Grids


.center[<img src="../02_scripts/img/tilings/hexgrid_07a.png" alt="hexgrid_07a" style="width:75%;">] .imgref[[[gamedev]](https://gamedev.stackexchange.com/questions/83412/hexagonal-game-board-modal)]




???
  

* https://www.shadertoy.com/view/4dGGzc


.center[<img src="../02_scripts/img/tilings/hex_tiling_01.gif" alt="hex_tiling_01" style="width:40%;">[[wiki]](https://en.wikipedia.org/wiki/File:ChamferedHexTilingAnimation.gif)]

* A chamfered hexagonal tiling replacing edges with new hexagons and transforms into another hexagonal tiling. In the limit, the original faces disappear, and the new hexagons degenerate into rhombi, and it becomes a rhombic tiling. 
* https://www.youtube.com/watch?v=A-1O4BHdkfA

---
.header[Tilings]

## Hexagonal Grids in Nature?

---
.header[Tilings]

## Hexagonal Grids in Nature

.left-even[<img src="../02_scripts/img/tilings/hexgrid_08.jpg" alt="hexgrid_08" style="width:100%;">  
.imgref[[[documentarytube]](https://www.documentarytube.com/articles/the-hexagon-nature-s-most-powerful-creation/)]]  

???
  

* Least amount of vax and most amount of storage space
* https://www.youtube.com/watch?v=QEzlsjAqADA
* [March is hexagonal awareness month](https://hexnet.org/content/hexagonal-awareness-month-2012)

--
.right-even[
> Why do honeybees love hexagons? Cause hexagons are the bestagons!
]

---
.header[Tilings]

## Hexagonal Grids in Nature


.center[<img src="../02_scripts/img/tilings/hexgrid_09.png" alt="hexgrid_09" style="width:45%;">]   
*Macrophotograph of a snow crystal showing characteristic hexagonal symmetry.*  
.imgref[[[sciencephoto]](https://www.sciencephoto.com/media/161797/view)]


???
  

* ach crystal is made up from water molecules, arranged with 2 hydrogen atoms making an angle of 105 degrees with 1 oxygen atom. The fixed shape of the water molecule means they can assume a stable crystal arrangement only when arranged as a 6-branched figure. Despite essential hexagonal similarity no two snowflakes are identical because their growth from cloud, through sky, to the ground is influenced by temperature, humidity, air currents etc. & these conditions are never identical for two snowflakes. Magnification: x5 (35mm size).

---
.header[Tilings]

## Figurative Tilings

--

.center[<img src="../02_scripts/img/tilings/escher_01.png" alt="escher_01" style="width:40%;">  M.C. Escher, Lizard, 1942]

---
.header[Tilings | Figurative Tilings]

.center[<img src="../02_scripts/img/tilings/escher_03.jpg" alt="escher_03" style="width:40%;">]


???
* https://graphicdesign.stackexchange.com/questions/90537/how-did-escher-make-his-tesselations

---
.header[Tilings | Figurative Tilings]

.center[<img src="../02_scripts/img/tilings/escher_03.jpg" alt="escher_03" style="width:80%;">]


---
.header[Tilings | Figurative Tilings]

.center[<img src="../02_scripts/img/tilings/escher_04.jpg" alt="escher_04" style="width:50%;">]

---
.header[Tilings | Figurative Tilings]

## M.C. Escher

<iframe width="741" height="408" src="https://www.youtube.com/embed/Kcc56fRtrKU" title="The Mathematical Art Of M.C. Escher" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---
.header[Tilings]

## Figurative Tilings

<iframe width="741" height="417" src="https://www.youtube.com/embed/3VSyDpCEiyY" title="What is a Tessellation?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


???
COMMENT: 
* [Tessellations by Recognizable Figures](https://eschermath.org/wiki/Tessellations_by_Recognizable_Figures.html)
* https://eschermath.org/wiki/Regular_Division_of_the_Plane_Drawings.html
* https://www.youtube.com/watch?v=ZNVyrxdlrGQ


---
## Tilings

How about pentagons?


.left-even[<img src="../02_scripts/img/tilings/tilings_06a.png" alt="tilings_06" style="width:100%;">]





---
## Tilings

How about pentagons?

.left-even[<img src="../02_scripts/img/tilings/tilings_06.png" alt="tilings_06" style="width:100%;">]

--

vs.

.right-even[<img src="../02_scripts/img/tilings/tilings_15.png" alt="tilings_15" style="width:100%;">  
.imgref[[[pi.math.cornell]](http://pi.math.cornell.edu/~mec/2008-2009/KathrynLindsey/PROJECT/Page2.htm)]]




---

## Tilings

.center[<img src="../02_scripts/img/tilings/pentagon_02.png" alt="pentagon_02" style="width:88%;">]

---

## Tilings

Tillings can have various properties and and various mathematical questions can be derived from them.


???
  

* A tiling is said to be periodic if there exist, among the symmetries of the tiling, at least two translations in non-parallel directions.

.center[<img src="../02_scripts/img/tilings/tilings_18.png" alt="tilings_18" style="width:60%;">[[pi.math.cornell]](http://pi.math.cornell.edu/~mec/2008-2009/KathrynLindsey/PROJECT/Page2.htm)] 


???
  

* A non-periodic tiling can not simply be constructed based on two translations in non-parallel directions.
* Above, the central star occurs nowhere else in the tiling, and so no translations are possible.
  
* A much more complex question is to ask which shapes can tile a plane in a pattern that does not repeat?

---

## Tilings

.center[<img src="../02_scripts/img/tilings/tilings_30.png" alt="tilings_30" style="width:88%;">  
*Penrose rhomb tile*  
.imgref[[[aperiodictiling]](https://www.aperiodictiling.org/wpaperiodictiling/)]]


???
  

* What kind of tiling is this?
* A non-repeating pattern, is call an *aperiodic* tiling. Hence, a set of polygons that tile the plane but never form a periodic tiling.
  
* This means the pattern is not constructable by simple translations of potentially arbitrarily large periodic patches. Shifting an aperiodic tiling cannot produce the same tiling. 
* It is not possible to create the tiling by taking some (potentially very large) section and repeating it over and over again. 
* Around 1973/74 Roger Penrose found a set of two tiles that only tile non periodically. 

---
.header[Tilings]

## Aperiodic Tilings

.left-even[<img src="../02_scripts/img/tilings/penrose_11.png" alt="tilings_30" style="width:95%;">]

.right-even[
A tiling that does not repeat
]

---
.header[Tilings]

## Aperiodic Tilings

.left-even[<img src="../02_scripts/img/tilings/penrose_11.png" alt="tilings_30" style="width:95%;">]

.right-even[
A tiling that does not repeat

* Shifting an aperiodic tiling cannot produce the same tiling
* Lokal patches can be identical
]


---
.header[Tilings]

## Aperiodic Tilings

.left-even[<img src="../02_scripts/img/tilings/penrose_11.png" alt="tilings_30" style="width:95%;">]

.right-even[
A tiling that does not repeat

* Shifting an aperiodic tiling cannot produce the same tiling
* Lokal patches can be identical

> What is the smallest number of prototiles necessary to tile the plane aperiodically?

]


---
.header[Tilings]

## Aperiodic Tilings

.left-even[<img src="../02_scripts/img/tilings/aperiodic_tiling_berger_01.png" alt="aperiodic_tiling_berger_01" style="width:130%;"> .imgref[[technologyreview](https://www.technologyreview.com/2010/03/25/205077/first-aperiodic-tiling-with-a-single-shape/)]]

.right-even[

The first aperiodic set was constructed by Robert Berger in 1966 and it contained 20426 prototiles.
]


???
  

* https://web.archive.org/web/20060830155826/http://www.uwgb.edu/dutchs/symmetry/aperiod.htm
* https://ics.uci.edu/~eppstein/junkyard/tiling.html

---
.header[Tilings]

## Penrose Tilings

.left-even[<img src="../02_scripts/img/tilings/penrose_05.png" alt="penrose_05" style="width:95%;">]

.right-even[

The last improvement was found in the 1970s by Roger Penrose and it includes two rhombuses.
]

---
.header[Tilings]

## Einstein Tilings

.left-even[<img src="../02_scripts/img/tilings/aperiodic_tiling_einstein_01.png" alt="aperiodic_tiling_einstein_01" style="width:95%;">]

.right-even[

Last year the Einstein-tile was finally found...
]

---
.header[Tilings]

## Einstein Tilings

.left-even[<img src="../02_scripts/img/tilings/aperiodic_tiling_einstein_01.png" alt="aperiodic_tiling_einstein_01" style="width:95%;">]

.right-even[

Last year the Einstein-tile was finally found...
  
...by an amateur!

]

---
.header[Tilings]

## Einstein Tilings

.left-even[<img src="../02_scripts/img/tilings/aperiodic_tiling_einstein_01.png" alt="aperiodic_tiling_einstein_01" style="width:95%;">]

.right-even[

Last year the Einstein-tile was finally found...
  
...by an amateur!
  
<br >
And then proven by mathematicians.
]


???
  

* https://cs.uwaterloo.ca/~csk/hat/

---
.header[Tilings]

## Einstein Tilings

[How a Hobbyist Solved a 50-Year-Old Math Problem (Einstein Tile):](https://www.youtube.com/watch?v=A1BhOVW8qZU&t=564s)

<iframe width="640" height="360" src="https://www.youtube.com/embed/A1BhOVW8qZU" title="How a Hobbyist Solved a 50-Year-Old Math Problem (Einstein Tile)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>




---
template:inverse

# Islamic Patterns

---
## Islamic Patterns


.center[<img src="../02_scripts/img/tilings/islamic_slides_01.png" alt="islamic_slides_01" style="width:70%;">]


???
  

## Islamic Art

Covers a wide range of lands, periods, and genres.


Began in the 8th century

* Influences Roman and Persian cultures
* Islamic Golden age
    * 8th century to the 14th century
    * Fundamental advancements in science and mathematics
    * Resulting also in complex geometry in art

---
## Islamic Art

> Patterns are everywhere...

--

Some interpretations of Islam include a ban of depiction of animate beings

* Prohibition of idolatry
* Belief that creation of living forms is God's prerogative


???
  

* also known as aniconism

--

Characterized by three recurrent motifs

1. Calligraphy
2. Arabesques
3. Geometry


???
  

Based on this exclusion of depicting any figural form of living creatures, there are three distinct disciplines that constitute the core elements of Islamic art, namely

---
.header[Islamic Art]
## Geometry

Patterns and tile work that seem to repeat infinitely

--
* Kaleidoscopic effects

--
* Inspiring contemplation of eternal order


---

## Islamic Patterns


Traditional Islamic art is composed with only compasses and a ruler. Therefore, designs are based on circles and lines.

![composition_01](../02_scripts/img/tilings/composition_01.png)  
.imgref[[[ricoflow]](https://www.youtube.com/watch?v=FqBWjJQKICk)]

---

## Islamic Patterns

.center[<img src="../02_scripts/img/tilings/composition_02.png" alt="composition_02" style="width:40%;">] 

--

The circle as a symbol of unity and as ultimate source of all diversity in creation.

???
  

* Each design starts with a circle. 
* The division of the circle into regular divisions is a ritual starting point




---
.header[Islamic Patterns]

## Construction Example

.center[<img src="../02_scripts/img/tilings/construction_01.jpeg" alt="construction_01" style="width:80%;">] 



???
  

1. Cell design with construction lines
2. Tessellation

Construction lines
* Normally Invisible
* Determine the scale
* Maintain accuracy


---
.header[Islamic Patterns]

## Construction Example

.center[<img src="../02_scripts/img/tilings/construction_02.jpeg" alt="construction_02" style="width:80%;">] 


---
.header[Islamic Patterns]

## Construction Example

.center[<img src="../02_scripts/img/tilings/construction_03.jpeg" alt="construction_03" style="width:80%;">] 


---
.header[Islamic Patterns]

## Construction Example

.center[<img src="../02_scripts/img/tilings/construction_04.jpeg" alt="construction_04" style="width:80%;">] 


---
.header[Islamic Patterns]

## Construction Example

.center[<img src="../02_scripts/img/tilings/construction_06.jpeg" alt="construction_06" style="width:80%;">] 

---

## Islamic Patterns

Many different designs can be derived from the same construction lines by picking different segments.

---

## Islamic Patterns

.center[<img src="../02_scripts/img/tilings/islamic_slides_05.png" alt="islamic_slides_05" style="width:80%;">] 

---

## Islamic Patterns

.center[<img src="../02_scripts/img/tilings/islamic_slides_06.png" alt="islamic_slides_06" style="width:80%;">] 

---

## Islamic Patterns

.center[<img src="../02_scripts/img/tilings/islamic_slides_07.png" alt="islamic_slides_07" style="width:80%;">] 

---

## Islamic Patterns

.center[<img src="../02_scripts/img/tilings/islamic_slides_08.png" alt="islamic_slides_08" style="width:80%;">] 


---
.header[Islamic Patterns]

## "Fake" Implementation

--

.center[<img src="../02_scripts/img/tilings/islamic_slides_14.png" alt="islamic_slides_14" style="width:42%;">] 

---
.header[Islamic Patterns]

## "Fake" Implementation

.center[<img src="../02_scripts/img/tilings/islamic_slides_15.png" alt="islamic_slides_15" style="width:42%;">] 

---
.header[Islamic Patterns]

## "Fake" Implementation

.center[<img src="../02_scripts/img/tilings/islamic_slides_16.png" alt="islamic_slides_16" style="width:42%;">] 

---
.header[Islamic Patterns]

## "Fake" Implementation

.center[<img src="../02_scripts/img/tilings/islamic_slides_18.png" alt="islamic_slides_18" style="width:42%;">] 

---
.header[Islamic Patterns]

## "Fake" Implementation

.center[<img src="../02_scripts/img/tilings/islamic_slides_21.png" alt="islamic_slides_21" style="width:75%;">] 


???
  

* https://editor.p5js.org/legie/sketches/nX6glgYEE

---
  
.center[<img src="../02_scripts/img/tilings/tiling_unreal_01.png" alt="tiling_unreal_01" style="width:100%;">]  
  


---

## Islamic Patterns

.center[<img src="../02_scripts/img/tilings/islamic_17.png" alt="islamic_17" style="width:65%;"> .imgref[[[wiki]](https://en.wikipedia.org/wiki/File:Roof_hafez_tomb.jpg)]]


???
  

* Complex girih patterns with 16-, 10- and 8-point stars at different scales in ceiling of the Tomb of Hafez in Shiraz, 1935.
 

* Through their intricate design, patterns and tile work often appear to repeat infinitely, with kaleidoscopic effects. This might be understood as invitation to contemplate eternal order.



---

## Islamic Patterns

.left-even[<img src="../02_scripts/img/tilings/islamic_18.png" alt="islamic_18" style="width:85%;"> .imgref[[[wiki]](https://en.wikipedia.org/wiki/File:Roof_hafez_tomb.jpg)]]
  
*Interior archway at the opening of the Sultan's Lodge in the Ottoman Green Mosque in Bursa, Turkey (1424), with 10-point stars and pentagons*


???
  

* https://www.sciencenews.org/article/ancient-islamic-penrose-tiles-0

--

.right-even[

* Similar to a Penrose tiling?
* 500 years before Penrose...

]


???
  

* In principle, by repeatedly scaling up the tiling in this way, they could have covered an arbitrarily large wall with a Penrose tiling.
* Lu also figured out that the girih tiles could be broken up into the kites and darts of Penrose tiles. When he divided the tiles in this way, one building, the Darb-i Imam shrine, had a near-perfect Penrose tiling. The shrine was built in 1453, and it would be another 500 years before the mathematics behind Penrose tiles was developed.


---
template:inverse

# Sacred Geometry


???
  

* Speaking of religion, there is a discipline called *sacred geometry*. Sacred geometry ascribes symbolic and sacred meanings to certain geometric shapes and certain geometric proportions [1, as cited in [[7]](https://en.wikipedia.org/wiki/Sacred_geometry)]. It is associated with the belief that god is a mathematician, specializing in geometry, applying this mastery when building the world. Here, the synchronicity of the universe is determined by certain mathematical constants, which express themselves in the form of patterns and cycles in nature. The geometry used in the design and construction of religious structures such as churches, temples, mosques, religious monuments, altars, and tabernacles has then sometimes been considered sacred. 

[[7]](https://en.wikipedia.org/wiki/Sacred_geometry) [[8]](http://www.ancient-wisdom.com/sacredgeometry.htm)  


---
.header[Sacred Geometry]

## The Pentagram of Venus

--

.left-even[<img src="../02_scripts/img/tilings/pentagram_of_venus_01.gif" alt="pentagram_of_venus_01" style="width:80%;">  
.imgref[[[Greg Evans]](http://www.gregegan.net/) [[johncarlosbaez]](https://johncarlosbaez.wordpress.com/2014/01/04/the-pentagram-of-venus/)]
]  

.right-even[A slightly simplified visualization of Venus's path observed from Earth.
]
  



???
  

* The image shows the plane of the solar system with the earth positioned at the centre of the diagram and the curve representing the direction and distance of Venus as a function of time. This is called *the pentagram of venus* or the *rose of venus*.
* With the passage of one year, the sun goes around the earth. As the sun goes around the earth 8 times, venus goes around the sun 13 times, then the same paths start again.  


## The Pentagram of Venus

.center[<img src="../02_scripts/img/tilings/venus_02.png" alt="venus_02" style="width:50%;">]  
  
[[johncarlosbaez]](https://johncarlosbaez.wordpress.com/2014/01/04/the-pentagram-of-venus/) *Detail from James Ferguson’s, Astronomy Explained Upon Sir Isaac Newton’s Principles, 1799 ed., plate III, opp. p. 67.*


* This is also called the pentagram of Venus, because the path has 5 ‘lobes’ where Venus makes its closest approach to Earth. At each closest approach, Venus move backwards compared to its usual motion across the sky: this is called [retrograde motion](https://en.wikipedia.org/wiki/Apparent_retrograde_motion).  


---
.header[Sacred Geometry]

## The Seed of Life

.center[<img src="../02_scripts/img/tilings/seedoflife_01.png" alt="seedoflife_01" style="width:40%;"> .imgref[[[etemetaphysical]](https://blog.etemetaphysical.com/seedoflife/)]]  




???
  

 *Top row, left to right:  Variations on the central rosette on 17th century BCE Greek coins, an early 15th century CE Arabic tile, and the Gundestrup cauldron of Denmark.  Middle row, left to right:  Examples of the rosette net pattern on a 1st century BCE mosaic in Israel, a monastery window on Crete, and a sketch by Leonardo da Vinci.  Bottom row, left to right: The rosette can be used to generate more complicated geometric patterns like the rose window of Saint Stephen’s cathedral in Vienna, a 2nd century CE Roman mosaic in France, and an early 17th century Chinese illumination for a Qu’ran. Image Source: Public domain, Wikimedia Commons.* [[9]](https://blog.etemetaphysical.com/seedoflife/)  

**Well, believe what you want to believe. I am all for an appreciation of maths and geometry but let me just throw into the discussion here that maybe the *seed of life* design has been around for so long because it is easy to create with compasses and looks nice.**

---
.header[Sacred Geometry]

## The Seed of Life

.center[<img src="../02_scripts/img/tilings/composition_04.png" alt="composition_04" style="width:40%;"> .imgref[[[travelingalchemists]](https://travelingalchemists.wordpress.com/)]]  



???
  

* From the The Traveling Alchemists’ Outreach Society
* The above image, depicts the *seed of life*, which is believed to be an ancient geometric universal symbol for all creation.



---
template:inverse

### The End

# 👋🏻
