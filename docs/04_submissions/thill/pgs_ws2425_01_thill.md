---
layout: default
title: Session
nav_exclude: true
---

### Task 01.01
I found the concept of self-recurrence quite intriguing. While I don’t have a specific area of interest within this topic at the moment, I’m open and curious to see where the upcoming sessions will lead us. I’ve had some experience with Houdini in the past, having created procedural models for various projects. Although it’s been a while, I’d be glad to revisit and refresh that knowledge. At the same time, I’m also keen to explore how similar approaches can be implemented in Unreal, as that’s currently my main focus.

### Task 01.02 - Seeing Patterns

<img src=img/Flowers.png height="400">
<img src=img/Carpet.png height="400">

### Task 01.03 - Designing Patterns

<img src=img/Hand_drawn_pattern.png width="600">

Start drawing a line somewhere on the page according to the following rules:

    A. Either go to the left or right side diagonally and slightly upwards (we call that distance x).

    B. Go straight in the direction you chose in step A, a random distance between 1x and approximately 10x.

    C. Go diagonally down again by 1x.

    D. Go up diagonally in the same direction you went down, by 2x, with a slightly smaller or larger inclination.

    E. Go straight a random distance between 1x and approximately 10x.

    F. Recurrently repeat steps A–E, but after a number of repetitions of your choice, iteratively decrease the randomness from a range of 1x to 10x down to 1x to 1x. At that point, simply go up 3x and end the line.

    G. On the same horizontal line where you began the first line, start drawing a new line somewhere else according to the same rules 
(A–F). Additionally, ensure that you do not intersect with existing lines. If you run into existing lines, simply go in the opposing direction according to the previously established rules.

    H. If the horizontal space has been filled up, start the next line at the lowest point of one of the creases between two existing structures.

### Task 01.04 - Seeing Faces

<img src=img/Mixer_face.png height="250">
<img src=img/Headphone_case_face.png height="250">
<img src=img/Speakers_face.png height="250">

### Task 01.05 - Abstraction in Art

I discovered Aaron Horkey at the age of 13, when my parents took me on holiday to New York. We were in an art shop, and as I was skimming through the books, I came across Horkey’s surreal, hand-drawn illustrations. I really liked the fact that it’s somewhat difficult to draw a clear line between abstraction and surrealism in his work. I’m also drawn to his use of intricate patterns—whether he’s creating entirely abstract elements or, as in this example, the feathers of the bird-like creature.

<img src=img/Aaron_Horkey_Sastrugi.png width="600">

### Task 01.06 - Abstracted Artistic Expression in CGI

This is a typical piece by CG artist Kushagra Gupta, also known as Kushlet. He often plays with organic textures, which makes his artworks feel less CG-like. He also frequently works with volume modelling driven by clones of simple primitives arranged in predetermined patterns.

<img src=img/Kushlet_Blunted:Glacial_Gaze.png width="600">

### Task 01.06 - First Steps

I followed [this tutorial](https://www.youtube.com/watch?v=NwdUdaotzNA) on creating lightning in Unreal Engine and used a self-made tribal design as the lightning input.

<img src=img/Aydin_Tutorial_Result.gif width="600">

### Task 01.07 - Multiplication On A Circle With Modulo In Unreal

I created a new Blueprint Actor from scratch, aiming to address the weaknesses of the original setup. The improved version includes the following features:

- **Optimised performance** by using Hierarchical Instanced Static Meshes (HISMs)
- **Support for different meshes**, allowing greater flexibility
- **Additional variables** for creative experimentation, including material settings and scaling options
- **Fully animatable**, with two toggleable variables that control runtime animation:
  - One animates the modulo variable  
  - The other animates the count variable
- **Thoroughly commented** for clarity and future reuse

<img src=img/moduloVisual.png width="600">
<img src=img/newSetup.png width="600">
<img src=img/moduloCircle_Variables.png width="600">



### Task 01.08 - Learnings

I was familiar with procedural generation as a concept, but of course there were aspects—like specific algorithms—that I wasn’t aware of, so that has been quite eye-opening. During my homework, I experimented with Niagara for the first time.