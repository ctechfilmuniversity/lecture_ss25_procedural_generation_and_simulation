---
layout: default
title: Session
nav_exclude: true
---

# TASK 2
_**by: David Leonardo Pirazán Palomar**_

# Function Designs
## Task 02.01 - Inspiration
**Go to the shadertoy site and browse the examples a bit. Submit the link to at least one example you like (you don't have to understand the code). Think about what you like about the example and why. You don't have to write anything about that in your submission but be able to explain it in class:**

+ https://www.shadertoy.com/view/lfBBWw

+ https://www.shadertoy.com/view/Nt2GRW

## Task 02.02 - Brick Pattern
**_Understand the given brick pattern code in the brick.frag file and insert comments explaining for each code line of the brick pattern what it does._**

[Here](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/blob/37d596279ccce2adaf7840ff4c38096a6fd71c22/docs/04_submissions/Pirazan_Palomar/02/brick_PirazanPalomar.frag) you will find my commented copy of the code. 

## Task 02.03 - Pattern Experiments
**_Create a digital 2D pattern of your liking._**

This is my pattern: 

![alt text](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/blob/14aebadaf92d83ea96dd58c91735f97a500be4e7/docs/04_submissions/Pirazan_Palomar/02/my%20first%20shader%20ever_%20DLPP.png)

[Here](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/blob/7e74ae02e2de6e3856c1c4d80321cf48a4f7e270/docs/04_submissions/Pirazan_Palomar/02/sin_DLPP.frag) you can download my .frag file 

I based my pattern in [this](docs/01_sessions/02_functions/glsl/examples/sin.frag) glsl example. This is a screenshot of the example: 

![alt text](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/blob/b38f57770114e75619299f0e2eb5bc8fb1e82c6f/docs/04_submissions/Pirazan_Palomar/02/example.png)

**_What did I change?_**
I created this new variable (tan) to interact with both "sin" existing functions. I changed the st.x to st.y of the verti variable and the st.y to st.x of the hori variable. I made use of color and modified the last value "hori+verti" to "hori*verti*diag" of the interpolation function.

# Learnings
## Task 02.04
**_Summarize your learnings (text or bullet points - whatever you prefer but you must use whole sentences). What was challenging for you in this session? How did you challenge yourself?_**

What I learned and the most challenging part are the same in this task for me: 

* First, to understand the basics took me a while: normalization, interpolation and use of floor/modulo to create the pattern on the canvas with the help of concepts like bias,  smoothness and gane. All those concepts are clear now, but due to the complexity of the topic I made use of the internet and watched this video (and other) to understand and to explain the Task 2.02.
  
  [![Tutorial: Sensors + Arduino + p5 = Interactive artistic tool!](https://img.youtube.com/vi/f4s1h2YETNY/0.jpg)](https://www.youtube.com/watch?v=f4s1h2YETNY "Tutorial: Sensors + Arduino + p5 = Interactive artistic tool!") 

* Second, to create my very first shader ever was difficult, so I decided to use an existing example, as I showed before and I could understand better by playing around with the parameters, functions and values. 

I challenged myself watching and analyzing different existing examples to have a better understanding. I think I still have a lot to learn, but I feel I am on the right path to do it better and better.   
