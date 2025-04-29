---
layout: default
title: Session
nav_exclude: true
---

**Procedural Generation and Simulation**  


Prof. Dr. Lena Gieseke \| l.gieseke@filmuniversitaet.de  

---

# Session 03 

This session is due on **Wednesday, May 7th** before class.

This assignment should take <= 4h. As this assignment is open-ended, it is up to you to manage your time.

* [Session 03](#session-03)
    * [Function Designs](#function-designs)
        * [Task 02.01 - Inspiration](#task-0201---inspiration)
        * [Task 02.02 - Brick Pattern](#task-0202---brick-pattern)
        * [Task 02.03 - Pattern Experiments](#task-0203---pattern-experiments)
    * [Learnings](#learnings)
        * [Task 02.04](#task-0204)

## Function Designs


### Task 02.01 - Inspiration

Go to the [shadertoy](https://www.shadertoy.com/) site and browse the examples a bit. Submit the link to at least one example you like (you don't have to understand the code). Think about *what* you like about the example and *why*. You don't have to write anything about that in your submission but be able to explain it in class.

*On a side note*: shadertoy code does not directly run within the glsl-canvas environment (see Task 2.2).

*Submission:* Links in your markdown submission file..


### Task 02.02 - Brick Pattern

Understand the given brick pattern code in the [`brick.frag`](./glsl/brick.frag) file and insert comments explaining for each code line of the brick pattern what it does. 

One cell of the brick pattern is parameterized as follows:

![tex_brick_params](img/tex_brick_params.png)

*Note:* For running the code, install the Visual Studio Code extension [glsl-canvas](https://marketplace.visualstudio.com/items/?itemName=circledev.glsl-canvas). With this plugin, you can display a `.frag` fragment shader file directly in VSCode. For rendering, select from VSCode's Command Palette the command `Show glslCanvas`.

*Submission:* Submit commented copy of the code as `brick_lastname.frag` in your assignments folder. 

### Task 02.03 - Pattern Experiments

Create a digital 2D pattern of your liking, e.g. the one you designed for the last homework by hand (Task 01.03 ) but this is entirely up to you.  
  
With this task, I want you to practice **understanding and building individual function designs**. You are free to choose any design and environment you want, as long as it includes the building of a somewhat complex function, which has a visual outcome. Choose the scenario you are interested in and/or helps you in your learning. Your options are: 

* GLSL fragment shader
    * See the [GLSL examples](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/tree/main/docs/01_sessions/02_functions/glsl/examples)
* Unreal Material Node Network
    * See the [Unreal scene](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/tree/main/docs/01_sessions/02_functions/unreal) -> `M_pattern_circles_nodes`
* Unreal Material Custom Node + HLSL
  * See the [Unreal scene](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/tree/main/docs/01_sessions/02_functions/unreal) -> `M_pattern_circles_hlsl`

 

*Submission:* At least one image of your resulting pattern (an Unreal screenshot is still fine), linked in your `.md` submission file. If you started with given code or a give setup, briefly explain your changes.




## Learnings

### Task 02.04

Summarize your learnings (text or bullet points - whatever you prefer but you must use whole sentences). What was challenging for you in this session? How did you challenge yourself?

*Submission*: Answer in your markdown submission file.  

---
  
Answer all questions directly in a copy of this file and **also link and display all of your images in that file**. Submit your copy as `pgs_XX_lastname.md` in your submissions folder (replace the XX with the number of the session). 

---

**Happy Functioning!**
