---
layout: default
title: Session
nav_exclude: true
---

## Function Designs

### Task 02.01 - Inspiration

A while back (and also before reading the [script](../../../02_scripts/pgs_04_functions_script.md#design-goals) and learning that he is actually running shadertoy), I came across [this video](https://www.youtube.com/watch?v=BFld4EBO2RE) describing in great detail how a landscape scene is created step by step entirely inside of a shader.

[![](./img/02-01-landscape.png)](https://www.shadertoy.com/view/4ttSWf)

> Landscape Shader by Inigo Quilez (click image to open on shadertoy)

What I find fascinating about this implementation is how far beyond of common uses for shaders this work goes. Not only is the whole scene entirely constructed using math but also the lighting and clouds are computed entirely from scratch. While it runs painfully slow on my machine I still think this a great example to show how far you can (maybe not always should) go with shaders. Inigo Quilez is in general a great source of inspiration as the artist shares some creations with detailed explanations on a [youtube channel](https://www.youtube.com/@InigoQuilez) and [website](https://iquilezles.org/).

### Task 02.02 - Brick Pattern

Please find the commented [`brick_gerdes.frag`](./src/brick_gerdes.frag) file in the `src` subdirectory.

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
