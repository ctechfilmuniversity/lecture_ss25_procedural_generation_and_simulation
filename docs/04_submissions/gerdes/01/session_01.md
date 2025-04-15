---
layout: default
title: Session
nav_exclude: true
---

### Task 01.01

- most interesting topics in syllabus

  - noise
    - In any visual application, randomness or noise forms the basic building block for most procedural algorithms. Understanding the math behind that and learning how to write custom noise functions seams like a worth-wile knowledge acquisition to me.
  - dynamics
    - In prior projects I worked on, I already came across force fields but I never got around to learn how they actually work. Especially understanding how to build modular utilities that allow me to apply a matrix of vectors to a moving (animated) object is of interest to me.

- further topic

  - As already mentioned in cc-one I would really like to revisit morphogenesis, in particular physarum simulations. That could probably tie in well with `complex systems` in May.

- tools
  - I never used Unreal so I will try to use Unreal however I already noticed that my laptop will probably not offer a comfortable DX. For that reason I am considering the following alternatives if need be:
    - Blender Geometry Nodes (I have basic experience with Blenders node systems and would benefit from broadening my skills here as well)
    - WebGL Shaders (I have no experience here but am eager to learn and also consider to take part in the Shader Workshop this semester)

## Introduction

### Task 01.02 - Seeing Patterns

![](./img/01-02-natural-01.png)
![](./img/01-02-natural-02.png)
![](./img/01-02-natural-03.png)

> natural pattern

![](./img/01-02-man-made-01.png)
![](./img/01-02-man-made-02.png)
![](./img/01-02-man-made-03.png)

> man-made patterns

### Task 01.03 - Designing Patterns

![](./img/01-03-manual.png)

> manual pattern

pseudo-code

> angles expressed as radians (45°, 135°, 225°, 315°)
```
max_level = 4
initial_length = 4

for angle in [1/4π, 3/4π, 5/4π, 7/4π]:
    branch(0, 0, angle, initial_length, 1)

function branch(start_x, start_y, angle, length, level):
  end_x = start_x + cos(angle) * length
  end_y = start_y + sin(angle) * length

  draw_line(start_x, start_y, end_x, end_y)
  
  if level < max_level:
    next_length = initial_length / (level + 1)
    for split in [-1/4π, 1/4π]:
      branch(end_x, end_y, angle + split, next_length, level + 1)
```
> in a way a fractal (as we saw with mandelbrot) where the result of the previous calculation is recursively input into the next

### Task 01.04 - Seeing Faces

![](./img/01-04-face-01.png)

> face one

![](./img/01-04-face-02.png)

> face two

![](./img/01-04-face-03.png)

> face three

### Task 01.05 - Abstraction in Art

Choose one "traditional" painting that is inspirational to you. The image can come from the script or you can refer to any artist or image you like.

Explain briefly what you like about the painting and how it might inspire you for your own work.

_Submission_: Answer in your markdown submission file and link all images there.

### Task 01.06 - Abstracted Artistic Expression in CGI

Chose one CG image, which you like and of which you think that it has an artistic quality to it. The image doesn't need to be from the script, again you can choose any CGI image you like (it should use 3D graphics). You can find more examples in the [Summary of Artists](../../02_scripts/pgs_01_intro_script.md#summary-of-artists) section.

Explain briefly what you like about the image and why you consider it to be artistic.

_Submission_: Answer in your markdown submission file and link all images there.

## Unreal Engine

### Task 01.06 - First Steps

This task is about installing and getting to know Unreal Engine and the basic functionalities. If you already know Unreal, learn something new about it and summarize it.

You will need to select a tutorial, or whatever resource you want to use, yourself. We started a collection of tutorials and resources for you in the [Unreal script](../../02_scripts/pgs_02_unreal_script.md), e.g. [First Steps Tutorials](../../02_scripts/pgs_02_unreal_script.md#first-steps-tutorials). You can pick a starter tutorial there, or choose your own one.

We also collected various explanations that we think might be helpful in the [Unreal script](../../02_scripts/pgs_02_unreal_script.md).

You have to submit at least one preview image of the scene that you worked on (for now a screen grab is enough). This can be a really simple scene, e.g. just a couple of elements. Even though the scene can be simple, also try to design the scene a bit in whichever visual direction you want.

_Hint:_ Make sure to plan in a bit of time for the installation of Unreal as it takes a while.

_Submission_: At least one preview image, linked in your markdown submission file.

## Beauty in Maths

- Re-cap [Chapter 03 - Beauty in Maths](../../02_scripts/pgs_03_mathsbeauty_script.html)

_On a side note:_ This script includes formulas and GitHub's markdown preview will not display them. To read the script with properly set formulas, you have the following options:

- Read the script [online](../../02_scripts/pgs_03_mathsbeauty_script.html) (this links to an online `.html` version of the script - in case you do not see the proper formulas, try refreshing the page, that usually helps, don't ask me why)
- Download the script folder and open 'pgs_03_mathsbeauty_script.html' locally in your browser.
- Download the script folder and open 'pgs_03_mathsbeauty_script.md' in Visual Studio Code with the [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) plugin installed. Then the preview of the `.md` within VSCode will render the formulas nicely.

### Task 01.07 - Multiplication On A Circle With Modulo In Unreal

![](./pgs_tutorial_multicircle/img/pgs_t1_multicircle_02.png)

Deadline for this task: July 31st.

Adjust the final scene of [Tutorial 1: Multiplication On A Circle With Modulo](./pgs_tutorial_multicircle/pgs_tutorial_multicircle.md) and come up with your own visual. It is up to you, whether you build the scene from scratch (which for sure would be the better learning experience) or if you work with the [completed scene](https://github.com/ctechfilmuniversity/lecture_ss24_procedural_generation_and_simulation/blob/main/docs/01_sessions/01/pgs_tutorial_multicircle/pgs_tutorial_multicircle.zip) directly.

_Submission_: At least one preview image (for now screenshots are just fine), linked in your markdown submission file.

## Learnings

### Task 01.08

Summarize your learnings (text or bullet points - whatever you prefer but you must use whole sentences). What was challenging for you in this session? How did you challenge yourself?

_Submission_: Answer in your markdown submission file.
