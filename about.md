---
layout: wide-page
title: About
permalink: /about/
---

Hey, I'm **Maryam** (aka Atria), and I'm actually a **retired mage**.

I like any cybersecurity-related stuff, but I think I'll be into low-level the most. Sometimes I play CTFs and write nice stuff (hopefully) under the handle **AtriaIX**, mainly in **Reverse Engineering**.

When I'm not in my wizard form, I be an **ECE student** .. also, you will often see me chilling with my **wizard cat** (his spells are top tier).

## Languages & Tools

<div class="tool-row">
  <span class="tool-pill">C</span>
  <span class="tool-pill">C++</span>
  <span class="tool-pill">Python</span>
  <span class="tool-pill">Assembly</span>
  <span class="tool-pill">Linux</span>
  <span class="tool-pill">IDA Pro</span>
  <span class="tool-pill">Ghidra</span>
  <span class="tool-pill">GDB</span>
  <span class="tool-pill">x86dbg</span>
  <span class="tool-pill">dnSpy</span>
  <span class="tool-pill">Wireshark</span>
</div>


<div class="terminal-widget">
  <span class="t-prompt">atria@war-machine:~$</span> <span id="statusLine"></span><span class="t-cursor"></span>
</div>

<script>
(function(){
  var lines = [
    "chasing fluffy cats...",
    "eating yummy apples...",
    "missing around on pluto...",
    "learning new spells...",
  ];
  var li = 0, ci = 0, deleting = false;
  var el = document.getElementById('statusLine');
  function tick(){
    var full = lines[li];
    if(!deleting){
      ci++; el.textContent = full.slice(0, ci);
      if(ci === full.length){ deleting = true; setTimeout(tick, 1400); return; }
    } else {
      ci--; el.textContent = full.slice(0, ci);
      if(ci === 0){ deleting = false; li = (li + 1) % lines.length; }
    }
    setTimeout(tick, deleting ? 30 : 55);
  }
  tick();
})();
</script>

## Say Hi

<div class="discord-widget" id="discordWidget">
  <div class="dw-avatar-wrap">
    <img id="dwAvatar" class="dw-avatar" src="" alt="Discord avatar">
    <span id="dwStatusDot" class="dw-status-dot"></span>
  </div>
  <div class="dw-info">
    <div class="dw-name-row">
      <strong id="dwName">Loading...</strong>
      <span id="dwTag" class="dw-tag"></span>
    </div>
    <span id="dwStatusText"></span>
  </div>
</div>

<script src="{{ '/assets/js/discord-widget.js' | relative_url }}"></script>

## Find Me

[GitHub]({{ site.social.github }}){:target="_blank"} · [Discord]({{ site.social.discord }}){:target="_blank"} · [LinkedIn]({{ site.social.linkedin }}){:target="_blank"} · [Medium]({{ site.social.medium }}){:target="_blank"} · [X]({{ site.social.x }}){:target="_blank"}
