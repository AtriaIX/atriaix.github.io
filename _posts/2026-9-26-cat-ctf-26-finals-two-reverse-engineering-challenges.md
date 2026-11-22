---
layout: post
title: "CAT CTF 26 Finals — Two Reverse Engineering Challenges"
excerpt: "My solutions for some nice challenges so far."
tags: [reverse-engineering, rust, ida]
thumb: /assets/images/thumbs/catf26-banner.png
date: 2026-9-26
last_modified_at: 2026-11-17
category: "CTF Write-Ups"
---

My solutions for some nice challenges so far.

**Hey friends!**

**I had so much fun in CATF finals and it was a really nice experience (I was laughing for 8 hours straight XD), huge thanks to all authors and organizers for this amazing event.**

**In this write-up, I’ll be sharing my solutions for [ELJoOker](https://www.eljooker.tech)’s two reverse engineering challenges.**

---

## 67 iq (first blood btw)

![67 iq challenge card](/assets/images/catf26/67.png)

We got Linux file here, in DIE:

![DIE output](/assets/images/catf26/die1.png)

*64-bit ELF file, written in Rust, nice*

Running our game:

![Running the game](/assets/images/catf26/game.png)

*It’s waiting for us to enter a 81-digit input (9\*9), left to right .. etc*

Of course we’re not gonna solve it the normal way (it will not be solved btw, it’s not even a real sudoku :D) so let’s open it in IDA and see what is it:

![main in IDA](/assets/images/catf26/ida1.png)

*i’m just pointing on these cause i think they’re important to remember*

![IDA grid printing code](/assets/images/catf26/ida2.png)

*this part prints the game starting lines and the sudoku grid, also it tells us that the random numbers (clues) and the empty cells all depend on the array (dword_2180), pointed to by v3*

![dword_2180 array in .rodata](/assets/images/catf26/ida3.png)

*this is an array of 81 (int)s (one int per sudoku cell), holds the puzzle’s given numbers that we saw, and we see that most of them are zeros (for ex: dd 6 dup(0) = repeat (0) 6 times, and we see the first 6 cells are empty in the game, then there is a 5, then 9 empty cells and so on)*

![input reading loop](/assets/images/catf26/ida4.png)

Note: I will not be going deep in the code cause I will not solve the challenge by reversing the code, we will use a faster way.

![hash loop](/assets/images/catf26/ida5.png)

*this is a loop for hashing the stuff in dword_2180 using some seed (v12), and counter (v11), it stops when exactly 81 are done*

![keystream loop](/assets/images/catf26/ida6.png)

*this generates some keystream and stores it in v18*

Please note that v18 only depends on v12 that is computed above from fixed stuff, so it is the same 16-byte keystream no matter what.

![check loop](/assets/images/catf26/ida7.png)

*this loop computes something using some array (byte_2120) and then compares it digit by digit to our input (remember that v7 is pointing to our input (v19)), if any cell mismatched, “Incorrect.” will pop up and the program will stops.. if clean, we will move to the next code.*

![flag construction loop](/assets/images/catf26/ida8.png)

*this nice yummy loop constructs the flag using (byte_2100) stored in the binary and v18, then writes every char of it using putc() function.*

I don’t see our input here, do you?

I solved the challenge using a debugger, by setting a break point before the checking loop, entering a dummy 81-digit input, and redirecting the instruction pointer (RIP) to the flag construction loop.

Let’s see in action (I used IDA’s remote Linux debugger for this):

![breakpoint set](/assets/images/catf26/ida9.png)

*first a break point here*

Running the program and entering dummy input:

![dummy input](/assets/images/catf26/dummy.png)

![breakpoint hit](/assets/images/catf26/ida10.png)

*it runs and hits the break point*

![Set IP](/assets/images/catf26/ida11.png)

*redirecting the RIP*

Then continue running, when returning to the terminal we see the flag.

![flag in terminal](/assets/images/catf26/flag.png)

And here we go!
```
CATF{QU1CK_BR41N_W4RM_UP}
```

---

Btw we can solve it by patching and also by actually reversing the code and getting the right input, all great and all fun.

---

**To be continued soon..**
