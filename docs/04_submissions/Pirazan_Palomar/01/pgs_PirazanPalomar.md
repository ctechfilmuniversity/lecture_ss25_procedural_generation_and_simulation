---
layout: default
title: Session
nav_exclude: true
---


# Syllabus:
## Task 01.01
by: David Leonardo Pirazán Palomar

* **_Which of the chapter topics given in the syllabus are of most interest to you? Why?_**
    Dynamics and complex systems, because it is something that I connect with the dynamics present in nature and I find it very appealing, due to the possibilities of representation of what is way bigger or smaller than the human scale. What  is visible to the naked eye is only one perspective and these topics offer a deeper understanding of those other perspectives. 
  
* **_Are there any further topics regarding procedural generation and simulation that would interest you?_**
    Probably the way in which medical equipments can offer other possibilities of seeing like x-ray, ultrasounds or CT scans. However I am not sure those are inside the scope of our course.

* **_Is there a different tool than Unreal that you would prefer to do the exercises with (e.g. Unreal, Houdini, Unity, Maya, Blender, JavaScript, p5, GLSL, ...)? If so which one, and why?_**
    No, I think Unreal is a nice tool to learn and it is in line with the course's purpose.

# Introduction:
## Task 01.02 - Seeing Patterns

**_Take at least one picture of a natural pattern and at least one of a man-made one (patterns can be two or three-dimensional). Try to include at least one pattern with self-similarity. Taking pictures with your smartphone is just fine._** 

* **Natural:** 
      The root of a palm:
    ![alt text](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/blob/a3dfacf7db668f915779a19e76022521b28e44f9/docs/04_submissions/Pirazan_Palomar/01/img/1_Tejido%20de%20raiz.png)

    Palm leave:
    ![alt text](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/blob/a3dfacf7db668f915779a19e76022521b28e44f9/docs/04_submissions/Pirazan_Palomar/01/img/2_Tejido%20hoja%20palma.png)

    This microscopic images were made by Carolina Pachón Venegas, member of the scientific project about the Adaptation of the vegetation to the climate change and the fire in the lower terrains of the Orinoquía at the National University of Colombia.

* **Man-made:**
    This is a hammock (chinchorro) made in the north of Colombia in a place called "Guajira" by a indigeneuous group called Wayúu. The symbols of the patters are representation of their view of the world.
    ![alt text](https://scontent-ber1-1.xx.fbcdn.net/v/t39.30808-6/441640505_957013786430751_3992035488484907353_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uzS2MuEPl08Q7kNvwFdzOkI&_nc_oc=AdkdhVj3xKpGeylf1cHf3nWudsClruytMIQz6vIfEcsU9_wI-DrbovLtu14yy7YfnOk&_nc_zt=23&_nc_ht=scontent-ber1-1.xx&_nc_gid=VseThaGwsZwsBoxk-RJnww&oh=00_AfESVBq67a5nGZ_r-iT1q1Ui8Jan27RLyqltWEP2VlE8UA&oe=6805C8C9)
    [Here](https://textileartscenter.com/feature/history-in-threads-exploring-wayuu-mochilas/) you can read more about the history and meaning of the Wayúu culture.  

## Task 01.03 - Designing Patterns
**_Create a visual pattern yourself. The pattern must be repetitive and abstracted - and hand-drawn :D. Give pseudo code for its creation algorithm._**
![alt text](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/blob/a3dfacf7db668f915779a19e76022521b28e44f9/docs/04_submissions/Pirazan_Palomar/01/img/3_Mein%20Pattern.jpeg)
Start with 2 opposite triangles that are slightly crossed. Now repeat the same action but this time the new triangles will move closer, crossing until they reach the half of the first tw0. Ise the nre lateral intersections as an starting point for another 2 triangles, but this time perpendicular to the previous ones. Draw the last 2 triangles by completing the symmetry of the composition.  

## Task 01.04 - Seeing Faces
**_As an exercise to see and understand the environment around you (and to have some fun 😊), try to find at least two faces. Link all images in this file._**

![alt text](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/blob/a3dfacf7db668f915779a19e76022521b28e44f9/docs/04_submissions/Pirazan_Palomar/01/img/5_Face2.jpeg)

![alt text](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/blob/a3dfacf7db668f915779a19e76022521b28e44f9/docs/04_submissions/Pirazan_Palomar/01/img/4_Face1.jpeg)

## Task 01.05 - Abstraction in Art
**_Choose one "traditional" painting that is inspirational to you. The image can come from the script or you can refer to any artist or image you like. Explain briefly what you like about the painting and how it might inspire you for your own work._**

This painting is called _"where do we come from? who are we? where are we going to?"_ by Paul Gauguin. I love the colors, the mix of times and spaces, spiritual and mundane, life and death. It is also remarkable the way everything is connected with the nature and the reunion of different moments that could be happening at the same time or be the evidence of different desynchronized pasts that took place in that same space in different moments. 
![alt text](https://www.stilkunst.de/c33_thought/img_where_do_we_come_from/Paul_Gauguin-Woher-kommen-wir_1280.jpg)

## Task 01.06 - Abstracted Artistic Expression in CGI
**_Chose one CG image, which you like and of which you think that it has an artistic quality to it. The image doesn't need to be from the script, again you can choose any CGI image you like (it should use 3D graphics). You can find more examples in the Summary of Artists section. Explain briefly what you like about the image and why you consider it to be artistic._**


![alt text](https://marshmallowlaserfeast.com/app/uploads/2025/01/SCiampone-08874-1280x853.jpeg)
Marshmallow Laser Feast made this work called: _"Poetics of Soil: Fly Agaric I"_ I really like it because they work on creating with CGI a visible nature that it is otherwise invisible to us humans. I think it is artistic because it uses the technology to bring us closer through a poetic and beautiful experience that can makes us feel closer and more connected to nature. 

[Here](https://marshmallowlaserfeast.com/project/poetics-of-soil-fly-agaric-i/) is a link to see to work in more detail 

# Unreal Engine
## Task 01.06 - First Steps

**_You have to submit at least one preview image of the scene that you worked on (for now screenshots are just fine). This can be a really simple scene, e.g. just a couple of elements. Even though the scene can be simple, also try to design the scene a bit in whichever visual direction you want._**

This is the tutorial I did. It is called: **_"Unreal Engine 5 Beginner Tutorial Part 1: Installation and Using Templates"_**


 [![Unreal Engine 5 Beginner Tutorial Part 1: Installation and Using Templates](https://img.youtube.com/vi/bDUFB1ng00Q/0.jpg)](https://www.youtube.com/watch?v=bDUFB1ng00Q "Unreal Engine 5 Beginner Tutorial Part 1: Installation and Using Templates")

 Here my screenshot:
 ![alt text](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/blob/88979ff9c98d44a3dcecc08f0d061670e171ce06/docs/04_submissions/Pirazan_Palomar/01/img/7_unreal.png)

# Beauty in Maths 
## Task 01.07 - Multiplication On A Circle With Modulo In Unreal 
![alt text](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/blob/9f109c10fc96c40194066530139643d1b9ee4e50/docs/04_submissions/Pirazan_Palomar/01/img/001.png)

![alt text](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/blob/9f109c10fc96c40194066530139643d1b9ee4e50/docs/04_submissions/Pirazan_Palomar/01/img/002.png)

![alt text](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/blob/9f109c10fc96c40194066530139643d1b9ee4e50/docs/04_submissions/Pirazan_Palomar/01/img/003.png)

![alt text](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/blob/9f109c10fc96c40194066530139643d1b9ee4e50/docs/04_submissions/Pirazan_Palomar/01/img/004.png)

![alt text](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/blob/9f109c10fc96c40194066530139643d1b9ee4e50/docs/04_submissions/Pirazan_Palomar/01/img/005.png)

![alt text](https://github.com/ctechfilmuniversity/lecture_ss25_procedural_generation_and_simulation/blob/9f109c10fc96c40194066530139643d1b9ee4e50/docs/04_submissions/Pirazan_Palomar/01/img/006.png)


# Learnings
## Task 01.08
**_Summarize your learnings (text or bullet points - whatever you prefer but you must use whole sentences). What was challenging for you in this session? How did you challenge yourself?_**
I learned about the importance of analyzing the representational ways in which we can express ourselves, since there are patterns and structures that are all around us. In order to create the world around us we need to know how that world exists so we can do something similar or at least have the reference of how it works so we can do something different. 

It was challenging to find CGI that I could find appealing. I think that is an opportunity for me, because I do not like the way sometimes is all around selling products or create ""wtf worlds" instead of going beyond that and get closer to other ways that could help us create other relationships with the world around us. Most of the pictures were just "weird" or "plastic" from my point of viewI enjoyed the ones with a more natural approach though. 

It was also challenging to work with unreal, since it is something new for me, but I am very exited about the new possibilities. I got some errors I will speak about in class. 
