(function(){
  var lines = [
    "mapping opcode table...",
    "patching anti-debug check...",
    "waiting for IDA to stop hanging...",
    "brewing coffee...",
    "chasing a segfault..."
  ];
  var li = 0, ci = 0, deleting = false;
  var el = document.getElementById('statusLine');
  if(!el) return;
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
