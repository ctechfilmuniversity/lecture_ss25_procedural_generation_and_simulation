name: inverse
layout: true
class: center, middle, inverse
---


# Procedural Generation and Simulation

### Prof. Dr. Lena Gieseke | l.gieseke@filmuniversitaet.de  

#### Film University Babelsberg KONRAD WOLF


---
layout: false

.center[<img src="../02_scripts/img/functions/pattern_08.png" alt="pattern_08" style="width:60%;">]



???
  
* Functions (in GLSL)
* Material nodes (in Unreal)
* Functions (in Unreal)
* High-level shader language

---

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
## Today

--
* Recap & Homework

--

* Example Circle Pattern 






---
template: inverse

### Chapter
# Introduction

---

# Introduction

--

* Patterns

???
  

* What is a pattern?
    * Repetitive structures that follow some sort of creation principles.
    * Mandelbrot: Bottomless wonders spring from simple rules, which are repeated without end.

--
* Self-Similarity

???
  

* What means Self-Similarity?
    * In mathematics, a self-similar object is exactly or approximately similar to a part of itself (i.e., the whole has the same shape as one or more of the parts). Many objects in the real world, such as coastlines, are statistically self-similar: parts of them show the same statistical properties at many scales.

--
* Abstractions

???
  

* What is an abstraction?
    * Breaking with e.g. visuals from reality
    * Abstraction came to live when artists moved away from visually representing reality in a literal fashion.
    * With the start of the last century, artists broke with visuals from reality and became more and more *non-representational*. Also, in terms of meaning artist broke free and did not aim to convey a certain, specific *subject matter* anymore. Instead, artist rely on form, color, or technique to engage the viewer on a more *intuitive* level.
--
* Procedural Generation


???
  

* Show homework
* Advantages
    * Compactness
        * Few kilobytes for textures and volumes
    * Continuous and multi-resolution
        * Any resolution
        * Any extent
        * E.g. for VR scenes
    * Potentially randomly accessible
        * Meaning, you can for example compute the color value for one pixel of a rasterimage independently from all other pixel in no particular order.
        * It can be evaluated in a constant time, regardless of the location of the point of evaluation, and regardless of previous evaluations.
        * Harness the power of multi-pipe GPU’s and multi-core CPU’s.
    * Parametrized
        * Often specify a whole visual category or class with controlling large amounts of details
        * Fast to interact with and flexible, e.g. in an interactive system
        * Remain editable throughout an entire visual effect production pipeline for example
* Disadvantages
    * Parametrized
        * Non-intuitive
            * Too abstract characteristics of the underlying functions (e.g. *frequency*)
            * Overlapping effects
        * Too little control
            * Surprising results can also be seen as positive
            * Almost never allow per-pixel control of the output 
        * Time-consuming exploration
    * Implementation effort
    * Limited design space
    * Potential evaluation time issues
    * Potential aliasing issues


---
.header[Inspirations]

## Patterns

* Seeing Patterns & Faces

???
  

* Take at least three pictures of natural patterns and at least three pictures of man-made ones (patterns can be two or three dimensional). Try to include at least one pattern with self-similarity. 

--
* Creating a Pattern


???
  

* Go through results


---
.header[Inspirations]

## Abstraction

* Abstraction in Art

???
  

* Chose one painting from the introduced traditional artistic styles, which is inspirational to you. Explain briefly what you like about the painting and how it might inspire you for your own work.

--
* Abstracted Artistic Expression in CGI

???
  

*  Chose one CG image, which you like and of which you think that it has an artistic quality to it. Explain briefly what you like about the image and why you consider it to be somewhat a pice of art. 


???
  

* Go through results

---
template: inverse

### Chapter

# Unreal Engine


???
  

* Show Script


---
template: inverse

### Chapter

# Beauty in Maths


???
  

* What is the chapter about in terms of designs?

---

.center[<img src="../02_scripts/img/functions/maths_beauty_01.png" alt="maths_beauty_01" style="width:52%;">  
.imgref[[[notonthehighstreet]](https://i2.wp.com/www.notonthehighstreet.com/system/product_images/images/001/458/342/original_mathematics-formula-valentine-s-day-card.jpg)]
]  


---
## The Golden Ratio

???
  

* What is the golden ratio?

--

We have a *golden* ratio if the ratio of two quantities is the same as the ratio of their sum to the larger of the two quantities.

$\frac{a+b}{a} = \frac{a}{b} =  \varphi$

???
  

* A ratio describes one quantity in relationship to another one, e.g. how long the width of an image is in relationship to its height. 

--

Phi represents the golden ratio and is an irrational number with a value of:

$\varphi = \frac{1+{\sqrt{5}}}{2} = 1.618\,033\,988\,7\dots$  


---
## The Golden Ratio

Some believe the Golden Ratio makes the most pleasing and beautiful shape...

.center[<img src="../02_scripts/img/03/goldenratio_03.png" alt="goldenratio_03" style="width:70%;">]

---
## The Golden Ratio

There is a special relationship between the Golden Ratio and Fibonacci Numbers.

--

The ratio of two successive Fibonacci numbers is close to the golden ratio:


.center[<img src="../02_scripts/img/03/goldenratio_04.png" alt="goldenratio_04" style="width:100%;">[[hydrogen2oxygen]](https://hydrogen2oxygen.net/en/2012/06/21/the-fibonacci-sequence-is-the-mathematical-first-cousin-of-the-golden-ratio/)]



???
  


The golden spiral gets wider (or further from its origin) by a factor of $\varphi$ for every quarter turn it makes.

.center[<img src="../02_scripts/img/03/spiral_08.png" alt="spiral_08" style="width:80%;">[[wiki]](https://commons.wikimedia.org/wiki/File:FakeRealLogSpiral.svg)]


---
## Golden Spiral

.center[<img src="../02_scripts/img/03/spiral_09.gif" alt="spiral_09" style="width:48%;">  
.imgref[[[wiki]](https://commons.wikimedia.org/wiki/File:GoldenSpiralLogarithmic_color_in.gif)]]


???
  

* Golden spirals are self-similar. The shape is infinitely repeated when magnified.

---
## Phi in Nature

.center[ <img src="../02_scripts/img/03/goldenangle_04.png" alt="goldenangle_04" style="width:90%;">].imgref[[[LeerZelfBeleggen]](https://leerzelfbeleggen.com/wp-content/uploads/2018/08/Fibonacci-trading-leren-traden-met-de-geheime-formule-voorbeelden.jpeg)]


---
## Phi in Nature


.center[<img src="../02_scripts/img/03/goldenangle_07.png" alt="goldenangle_07" style="width:80%;">  
.imgref[[[gofiguremath]](http://gofiguremath.org/natures-favorite-math/the-golden-ratio/the-golden-angle/)]]


???
  

* The same problem applies if you imagine to be a sunflower and you want to pack as many seeds as possible, while all of them getting as much sun as possible.

---
## Phi in Nature

.center[<img src="../02_scripts/img/03/goldenangle_01.png" alt="goldenangle_01" style="width:47%;">  
.imgref[[[gofiguremath]](http://gofiguremath.org/natures-favorite-math/the-golden-ratio/the-golden-angle/)]]


???
  

* What you want is to turn for every new leave a certain degree as the following (the numbers indicate the order in which the leaves grew).
* Imagine you are a plant and you can spread leaves all around your stem. Now, being a plant, needing Photosynthese and such, you want all of your leafes to soak up as much sun (and rain) as possible. So when you sprout a new leaf, you don’t want it to block your other leaves.

---
.header[Golden Angle]

## Phyllotaxis

.center[<img src="../02_scripts/img/03/phyllotaxis_interactive.gif" alt="phyllotaxis_interactive" style="width:42%;">]


???
  

* Fractions for the `ratio` value lead to spikes, while getting closer to an irrational number produces dense distributions:
* https://editor.p5js.org/legie/sketches/iVLdC_coE


---
.header[Golden Angle]

## Phyllotaxis

.left-even[
H. Vogel's generation model of alternating leaf pattern
  
<br />

$r = c\sqrt{n}$

$\theta = n \times 137.508^\circ$
  
.footnote[Vogel, H (1979). "A better way to construct the sunflower head". Mathematical Biosciences 44 (44): 179–189. doi:10.1016/0025-5564(79)90080-4]

]

--

.right-even[
     
<br />
with

* angle $\theta$,
* radius $r$,
* index number of the current element $n$, and
* a constant scaling factor $c$.
]




???
  

* in polar coordinates



---

## Circle Equation in Parametric Form


.left-even[
<img src="../02_scripts/img/functions/circle_01a.png" alt="circle_01a" style="width:96%;">
]

.right-even[
<img src="../02_scripts/img/functions/trigo_02.png" alt="trigo_02" style="width:100%;">
]

---

## Circle Equation in Parametric Form

.left-even[<img src="../02_scripts/img/functions/trigo_02.png" alt="trigo_02" style="width:90%;">]

--

<br >

$\sin(\theta) = \frac{opposite}{hypotenuse}$  

--
  
$hypotenuse *\sin(\theta) = opposite$  
  

--

$y = r \sin(t)$  

---

## Circle Equation in Parametric Form

.left-even[<img src="../02_scripts/img/functions/trigo_02.png" alt="trigo_02" style="width:90%;">]


<br >

$\cos(\theta) = \frac{adjacent}{hypotenuse}$  

  
$hypotenuse *\cos(\theta) = adjacent$  
  


$x = r \cos(t)$  


---

## Circle Equation in Parametric Form


.center[
<img src="../02_scripts/img/functions/circle_01.png" alt="circle_01" style="width:46%;">
]

---

.header[Circle Equation in Parametric Form]

## Points on the Circle


```c++

//count: number of points on circle

for(int i = 0; i < count; ++i) {

    float circleposition = i / count;

    float x = sin(circleposition * PI * 2.0) * radius;
    float y = cos(circleposition * PI * 2.0) * radius;
    float z = 0.0;

    vec3 position = vec3(x, y, z);
}
```


???
* cartisian equation for circle

---

## Circle Equation in Cartisian Form

.left-even[<img src="../02_scripts/img/03/circle_01.png" alt="circle_01" style="width:100%;">]

--

.right-even[
  
<br />

Centered at the origin (0, 0):

$x^2 + y^2 = r^2$  
]


---

## Circle Equation in Cartisian Form

.left-even[<img src="../02_scripts/img/03/circle_01.png" alt="circle_01" style="width:100%;">]

.right-even[
  
<br />

Centered at the origin (0, 0):

$x^2 + y^2 = r^2$  
  
<br />


With (a, b) as the center of the circle:

$(x - a)^2 + (y - b)^2 = r^2$
]

???
* Standard Form


---

## Circle Equation in General Form

$(x - a)^2 + (y - b)^2 = r^2$
  
<br />

.footnote[[[Math is Fun - Circle Equations]](https://www.mathsisfun.com/algebra/circle-equations.html)]

???
* But you may see a circle equation and not know it!
* Because it may not be in the neat "Standard Form" above.


--

Put in values, e.g. $a=1, b=2, r=3$, we get:
  
$x^2 + y^2 − 2x − 4y − 4 = 0$  



???
TASK:  
$(x−1)^2 + (y−2)^2 = 3^2$  
  
$x^2 − 2x + 1 + y^2 − 4y + 4 = 9$
  
$x^2 + y^2 − 2x − 4y + 1 + 4 − 9 = 0$  

--
  
<br />


Put in constants for the numbers for the General Form:

$x^2 + y^2 − Dx − Ey − F = 0$  



???
* It is a circle equation, but "in disguise"!
* So when you see something like that think "hmm ... that might be a circle!"
* General Form always has x2 + y2 for the first two terms.

As exercise: Going From General Form to Standard Form

---

## Circle Equations Forms

Standard (Cartesian) Form:  
$(x - a)^2 + (y - b)^2 = r^2$


???
Standard (Cartesian) Form: (x - a)^2 + (y - b)^2 = r^2
* Use when:
    * You know the center (a, b) and radius r
    * You’re working with geometry problems or graphing circles
    * You want to easily visualize the circle on a coordinate plane
* Why use it:
    * It’s the most intuitive and visual form
    * Shows symmetry and center-radius relationship clearly

--
  
<br />

General:  
  
$x^2 + y^2 + Dx + Ey + F = 0$


???
General Form: x^2 + y^2 + Dx + Ey + F = 0
* Use when:
    * You get the equation of a circle from an algebraic expression (e.g., after expanding)
    * You’re solving equations algebraically or working in analytical geometry
    * You’re given a messy equation and want to check if it’s a circle
* Why use it:
    * Common in algebra and conic sections
    * Can be used for circle fitting in data (e.g. least squares methods)

--
  
<br />

Parametric:  
  
$x = a + r\cos(t)$  
$y = b + r\sin(t)$

???
Parametric Form: x(t) = a + r\cos(t), \quad y(t) = b + r\sin(t), \quad t \in [0, 2\pi)
* Use when:
    * You’re plotting or animating a circle (e.g., in physics or computer graphics)
    * You want to describe motion along a circular path (e.g., circular motion)
    * You’re integrating or differentiating over a circle
* Why use it:
    * It’s great for trigonometric or time-based problems
    * Natural for expressing circular motion or working with angles

---
## Circle Equations Forms

* Polar Form
* Complex (Parametric) Form
* Matrix Form
* Implicit Level Set Form (Standard form as function)
* Parametric in Terms of a Slope

.footnote[[ChatGPT: *Less common circle representations?*]]

???
  

| **Form**               | **Equation / Idea**                                | **Use Case**                              |
|------------------------|----------------------------------------------------|-------------------------------------------|
| **Polar**              | \(r = R\), or \(r = 2R\cos(\theta - \phi)\)        | Polar problems, wave optics               |
| **Complex Parametric** | \(z(t) = a + re^{it}\)                             | Complex analysis, rotations               |
| **Matrix (Conic)**     | Quadratic form with matrix \(A\)                   | Linear algebra, general conics            |
| **Level Set**          | \(f(x, y) = (x - a)^2 + (y - b)^2 - r^2 = 0\)      | PDEs, simulations, image processing       |
| **Slope Parametric**   | \(x = a + \frac{r}{\sqrt{1 + m^2}},\ y = b + \frac{rm}{\sqrt{1 + m^2}}\) | Geometry problems, tangents |


---
## Famous Irrational Numbers

--

* $\varphi = 1.61803398874989484820...$
    * The most irrational of them all  
* $\pi = 3.1415926535897932384626433832795..$‰
    * The rockstar of the irrational numbers
    * The popular approximation of $\frac{22}{7} = 3.1428571428571$ is close but not accurate
    * Over a quadrillion decimal places have been calculated and *still there is no pattern!!!*
* $e = 2.7182818284590452353602874713527$
    * Euler's Number
    * Base of the Natural Logarithms

???
  

* Many square roots, cube roots, etc. are also irrational numbers.
    * $\sqrt{3} = 1.7320508075688772935274463415059...$
    * $\sqrt{99} = 9.9498743710661995473447982100121...$
    * But e.g. $\sqrt{4} = 2$ (rational), and $\sqrt{9} = 3$ (rational), so not all roots are irrational.


---
## The Rose Function

.center[<img src="../02_scripts/img/03/rose_01.png" alt="rose_01" style="width:50%;">.imgref[[[wiki]](https://en.wikipedia.org/wiki/Rose_\(mathematics\)]]


???
  

Rose curves are defined by (as cartesian parametric equations)

$x=r \cos(k\theta )\cos(\theta )$  
$y=r \cos(k\theta )\sin(\theta )$  

for various $k = n / d$.

---
## Modular Multiplication on a Circle

.center[<img src="../02_scripts/img/03/homework_01.png" alt="homework_01" style="width:50%;">]


???
  

The algorithm connects the starting values to the ending values for a chosen modulus and multiplier .

.center[<img src="../02_scripts/img/03/homework_02.png" alt="homework_02" style="width:50%;">]

* Multiply the positive integers by 3
* Connect to result (mod 10)

---
## Modular Multiplication on a Circle

.center[<iframe width="920" height="517" src="https://www.youtube.com/embed/13be44CqrrI" title="The Dancing Mandala: Multiplication Tables Plotted on a Unit Circle" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>]


???
  

* Ideas for create projects with this?



---
## Modular Multiplication on a Circle

Implementation in Unreal...


???
  

* Go through unreal scene

Circle Equation in Parametric Form

$x = a + r \cos(t)$  
$y = a + r \sin(t)$  

where t is a parametric variable in the range 0 to $2\pi$ [...].

.footnote[[[wiki]](https://en.wikipedia.org/wiki/Circle#Equations)]
  

$x = a + r \cos(t)$  
$y = a + r \sin(t)$  

Equation is based on trigonometry.



---

.center[<img src="../02_scripts/img/functions/pattern_08.png" alt="pattern_08" style="width:60%;">]



???


* Glsl function
* In Unreal with material nodes
* In Unreal with HLSL



* High-level shader language

---

<img src="../02_scripts/img/functions/shader_example_01.png" alt="pattern_08" style="width:100%;">  
.footnote[[[kishimisu - ShaderToy]](https://www.shadertoy.com/view/mtyGWy)]



---
template: inverse

### Chapter
# Function Design


???

* Function Components
    * Transitions
    * Primitive Components
    * Periodicity
* Examples

---
## Function Design

.center[<img src="../02_scripts/img/functions/batman_01.png" alt="batman_01" style="width:80%;">  
.imgref[[[geogebra]](https://www.geogebra.org/m/Wkjz2X92)]]
  


???
  

* *How does the following look like when plotted in a 2D cartesian coordinate system?*
* You are right, [it is Batman!](https://www.youtube.com/watch?v=oaIsCJw0QG8&feature=youtu.be)

---
## Function Design

.center[<img src="../02_scripts/img/functions/batman_02.png" alt="batman_02" style="width:78%;">  

.imgref[[[geogebra]](https://www.geogebra.org/m/Wkjz2X92)]]

---
## Function Design

.center[<img src="../02_scripts/img/functions/batman_02.png" alt="batman_02" style="width:58%;">  

.imgref[[[geogebra]](https://www.geogebra.org/m/Wkjz2X92)]]


By slicing together different functions, you can archive many different curve designs.

---
## Function Design

.center[<img src="../02_scripts/img/functions/batman_03.png" alt="batman_03" style="width:90%;">]  
.imgref[[[math.stackexchange]](https://math.stackexchange.com/questions/54506/is-this-batman-equation-for-real)]  


???
  

* For now, we are having a look into somewhat simpler equations.  

---
## Function Design

.center[<img src="../02_scripts/img/functions/heart_02.png" alt="heart_02" style="width:80%;">  
.imgref[[[Making a heart with mathematics]](https://www.youtube.com/watch?v=aNR4n0i2ZlM)]]  
  


???
  

* For function designs the ultimate rock star / god / person of incredible awesomeness is [Inigo Quilez](http://www.iquilezles.org). His [articles page](http://www.iquilezles.org/www/index.htm) is a resource of unmeasurable value. If interested, check out his explanations on [Making a heart with mathematics](https://www.youtube.com/watch?v=aNR4n0i2ZlM) (which is a somewhat advanced example though).


---
## Function Design

> We want to modify, shape and to combine different functions. 

--

With this approach we can almost draw anything. 

--

.center[<img src="../02_scripts/img/functions/pattern_st_01.png" alt="pattern_st_01" style="width:88%;">] .imgref[[[Shane - shadertoy]](https://en.wikipedia.org/wiki/File:Tiling_procedural_textures.jpg)]  



???
  

* Such individually shaped functions can be used for a variety of applications, such as textures, shading, animation, geometry, dance, etc. 
* We will focus in this script on the generation of 2D graphics but please keep in mind that most functions are equally useful in different contexts and even dimensions.
* https://www.shadertoy.com/view/llSyDh
* https://www.shadertoy.com/view/WdcBDB
* https://www.shadertoy.com/view/ls33DN

---
## 2D Design

Let’s assume we want to color a canvas, meaning giving each pixel a color value, e.g. when computing a texture.

<br />

![canvas](../02_scripts/img/functions/canvas.png)  

---
## 2D Design

.center[<img src="../02_scripts/img/functions/func_02.png" alt="func_01" style="width:75%;">]  

Then we interpret the value of *f(x,y) = z*, hence *z*, as color value.


???
  

* To color this area, we can use a 2D function, meaning a function depending on two input parameters such as *x, y* in 3D space. Please note that in the following examples *z* is the up-axis of the coordinate system.

---
## 2D Design

With *z* interpreted as color value between 0..1 on a 2D canvas:

![func_03](../02_scripts/img/functions/func_03.png).  

---
## 2D Design

<img src="../02_scripts/img/functions/func_04.png" alt="func_04" style="width:55%;">
<img src="../02_scripts/img/functions/func_05.png" alt="func_05" style="width:40%;">


???
  

* You can imagine this as if looking in -z direction onto the plotted gray value, or as if projecting the plot onto the xy-plane.

---
## 2D Design

You often map the function value 0..1 to a color range such as

.center[<img src="../02_scripts/img/functions/func_09.png" alt="func_09" style="width:90%;">]  

---
## 2D Design

Also, the combination of simple  functions can already lead to pleasing patterns

.center[<img src="../02_scripts/img/functions/func_11a.png" alt="func_11a" style="width:100%;">]  


???
  

* In the above plots frequency, amplitude and offset have been adjusted but left out in the equation for simplicity.
* PI for sin is one huegel
* code/glsl/lecture03/sin.frag

---
## 2D Design

Also, the combination of simple  functions can already lead to pleasing patterns

.center[<img src="../02_scripts/img/functions/func_11b.png" alt="func_11b" style="width:100%;">]  

---
## 2D Design

.center[<img src="../02_scripts/img/functions/trigo_01.png" alt="trigo_01" style="width:100%;">]  

---
## 2D Design

.left-quarter[
*f(x) = c*
]

.right-quarter[<img src="../02_scripts/img/functions/func_10.png" alt="func_10" style="width:66%;"> .imgref[[[tobyschachman]](http://tobyschachman.com/Shadershop/)]]


???
  

* You will often find examples and explanations in lower dimensions, meaning in 1D, as the graphs for these functions are easier to visualize: with *c* as the gray or color value. 
* How to interpret in this scenarios the needed second dimension depends on the context. Often it is simply left out as an influencing parameter such as in our start example

![func_13](../02_scripts/img/functions/func_13.png)  



---
template:inverse

# Example


???
  

* In this example, I am walking you through the steps to re-create this subtle pattern. It is a fairly easy design but include several of the most common approaches when putting functions together.

---
.header[Example]

## Environment

--

GLSL + Fragment Shader


???
OpenGL Shading Language

--

* Efficient code, e.g. no explicit loop over pixels

--
* What we are aspiring to learn

---
.header[Example | Environment]

## GLSL + Fragment Shader

Visual Studio Code: [glsl-canvas Extenstion](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas)

---
.header[Example | Environment |  GLSL + Fragment Shader]

```glsl
uniform vec2 u_resolution;

void main() {

    // Normalization of the incoming
    // screen coordinate
    vec2 coord = gl_FragCoord.xy/u_resolution;


    // r, g, b channels from 0..1
    vec3 color = vec3(0.5, 0.0, 0.0);

    // Set the final "pixel" color
    gl_FragColor = vec4(color, 1.0);
}
```


???
* function_design_startscene.glsl

```
// Better
// vec2 coord = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
```

---

.center[<img src="../02_scripts/img/functions/pattern_08.png" alt="pattern_08" style="width:60%;">]  


???
  

*What do you see? What could be the steps to recreate this pattern?*

---
.header[Example]

## One Cell

When working on repetitive patterns, one usually starts with one cell and repeat that cell in a second step.  

.center[<img src="../02_scripts/img/functions/hexgrid_02b.png" alt="hexgrid_02b" style="width:76%;">]  

---
.header[Example]

## One Cell

Let's start with creating a circle...

.left-even[<img src="../02_scripts/img/functions/pattern_02a.png" alt="pattern_02a" style="width:80%;">]  


???
  

* How could we create this?

--

...by plotting the distance of each coordinate to the center point `0.5`, `0.5`.


???
  

* The [`distance()`](https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/distance.xhtml) function calculates the distance between two points.
* The [`mix()`](https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/mix.xhtml) function linearly interpolate between two values.

---
.header[Example]

## One Cell


```glsl
    vec2 coord = gl_FragCoord.xy/u_resolution;

    // 1. One Cell, distance to center point
    float d = distance(coord, vec2(0.5));

    vec3 color = mix(vec3(0.5, 0.0, 0.0), vec3(0.35, 0.2, 0.5), d);
    gl_FragColor = vec4(color, 1.0);
```


---
.header[Example]

## Ridges

Next, let's create ridges with the [`floor`](https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/floor.xhtml) function.

--

<img src="../02_scripts/img/functions/pattern_03a.png" alt="pattern_03a" style="width:40%;">

---
.header[Example]

## Ridges


```glsl
    vec2 coord = gl_FragCoord.xy/u_resolution;

    float d = distance(coord, vec2(0.5));

    // 2. Ridges
    d *= 8.0;
    d -= floor(d);

    vec3 color = mix(vec3(0.5, 0.0, 0.0), vec3(0.35, 0.2, 0.5), d);
    gl_FragColor = vec4(color, 1.0);
```

---
.header[Example] 

## Repetitive Cells

Next, let's create the cells...
  
.left-even[<img src="../02_scripts/img/functions/pattern_04a.png" alt="pattern_04a" style="width:85%;">]  

--
.right-even[...by dividing the 0..1 original x,y coordinate by the cell size.]

---
.header[Example] 

### Repetitive Cells

```glsl
    float CELLSIZE = 0.2; //relative, hence 0..1

    vec2 coord = gl_FragCoord.xy/u_resolution;

    // 3. Create Cells
    // Get into one cell
    float x = coord.x / CELLSIZE;
    float y = coord.y / CELLSIZE;
    x -= floor(x);
    y -= floor(y);
    
    float d = distance(vec2(x, y), vec2(0.5));
    d *= 8.0;
    d -= floor(d);

    vec3 color = mix(vec3(0.5, 0.0, 0.0), vec3(0.35, 0.2, 0.5), d);
    gl_FragColor = vec4(color, 1.0);
```

---
.header[Example] 

## Repetition Within The Cell

.left-even[<img src="../02_scripts/img/functions/pattern_07a.png" alt="pattern_05a" style="width:90%;">]  

--
.right-even[
1. Move Circle Center
2. Move value range from 0..1 to -1..1 and take the absolute 
]
---
.header[Example] 

### 1. Move Center

Now, we simply move the center point (the one that we are computing the distance to for the circles).

--

.center[<img src="../02_scripts/img/functions/pattern_05a.png" alt="pattern_05a" style="width:40%;">]  

---
.header[Example] 

### 1. Move Center


```glsl
float CELLSIZE = 0.2; //relative, hence 0..1
vec2 OFFSET = vec2(0.3);

    vec2 coord = gl_FragCoord.xy/u_resolution;


    float x = coord.x / CELLSIZE;
    float y = coord.y / CELLSIZE;
    x -= floor(x);
    y -= floor(y);

    // 4. Move center point by OFFSET to compute distance to
    float d = distance(vec2(x, y), OFFSET);
    d *= 8.0;
    d -= floor(d);

    vec3 color = mix(vec3(0.5, 0.0, 0.0), vec3(0.35, 0.2, 0.5), d);
    gl_FragColor = vec4(color, 1.0);
```

---
.header[Example] 

### 2. Repetition Within Cell


Lastly, we want to repeat the pattern within the cell as well and also flip it. For this we remap the original value range from 0..1 to -1..1 and take the absolute of those values.

--

.center[<img src="../02_scripts/img/functions/pattern_07a.png" alt="pattern_07a" style="width:36%;">]  



---
.header[Example] 

### Repetition Within Cell

```glsl
    ...
    // 5a. Remapping the range
    float x = coord.x / CELLSIZE;
    float y = coord.y / CELLSIZE;
    x -= floor(x);
    y -= floor(y);

    // Modify value range from 0..1 to -1..1
    float x_remap = (x - 0.5) * 2.0;
    float y_remap = (y - 0.5) * 2.0;
    
    float d = distance(vec2((x_remap), (y_remap)), OFFSET);
    d *= 8.0;
    d -= floor(d);

    vec3 color = mix(vec3(0.5, 0.0, 0.0), vec3(0.35, 0.2, 0.5), d);
    gl_FragColor = vec4(color, 1.0);
```

---
.header[Example] 

## Repetition Within Cell

... and taking the absolute of the new value range


---
.header[Example] 

### Repetition Within Cell

```glsl
    ... 
    // 5a. Remapping the range
    float x = coord.x / CELLSIZE;
    float y = coord.y / CELLSIZE;
    x -= floor(x);
    y -= floor(y);

    // Modify value range from 0..1 to -1..1
    float x_remap = abs((x - 0.5) * 2.0);
    float y_remap = abs((y - 0.5) * 2.0);
    
    float d = distance(vec2((x_remap), (y_remap)), OFFSET);
    d *= 8.0;
    d -= floor(d);

    vec3 color = mix(vec3(0.5, 0.0, 0.0), vec3(0.35, 0.2, 0.5), d);
    gl_FragColor = vec4(color, 1.0);
```



---
## Example

.center[<img src="../02_scripts/img/functions/pattern_08.png" alt="pattern_08" style="width:48%;">]  



???
  

* I hope you didn't go blind by this example... sorry.

---
```glsl
    vec2 coord = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;

    // Create Cells
    // Get into one cell
    float x = coord.x / CELLSIZE;
    float y = coord.y / CELLSIZE;
    x -= floor(x);
    y -= floor(y);

    // Modify value range from 0..1 to -1..1
    // and then taking the absolute
    float x_remap = abs((x - 0.5) * 2.0);
    float y_remap = abs((y - 0.5) * 2.0);
    
    // Ridges
    float d = distance(vec2((x_remap), (y_remap)), OFFSET);
    d *= 8.0;
    d -= floor(d);

    vec3 color = mix(vec3(0.5, 0.0, 0.0), vec3(0.35, 0.2, 0.5), d);
    gl_FragColor = vec4(color, 1.0);
```


---
.header[Example | Using Vectors] 

```glsl
vec2 coord = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;

// Create Cells
// Get into one cell
coord /= CELLSIZE;
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
```

---

## Unreal Version

.center[<img src="../02_scripts/img/functions/pattern_circles_unreal_01.png" alt="pattern_08" style="width:100%;">]

???
  
* Functions (in GLSL)
* Material nodes (in Unreal)
* Functions (in Unreal)
* High-level shader language


---
template:inverse

### The End

# 👋🏻
