(function(){
  var win = document.getElementById('tocWin');
  var toc = document.getElementById('toc');
  var article = document.querySelector('.post-content');
  if(!win || !toc || !article) return;

  var heads = article.querySelectorAll('h2, h3');
  if(!heads.length) return;

  var links = [];
  for(var i = 0; i < heads.length; i++){
    var h = heads[i];
    if(!h.id){
      var base = (h.textContent || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || ('section-' + i);
      var id = base, n = 2;
      while(document.getElementById(id)){ id = base + '-' + n; n++; }
      h.id = id;
    }
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = (h.textContent || '').trim();
    if(h.tagName === 'H3') a.className = 'sub';
    toc.appendChild(a);
    links.push(a);
  }
  win.hidden = false;

  var ticking = false;
  function update(){
    var cur = 0;
    for(var i = 0; i < heads.length; i++){
      if(heads[i].getBoundingClientRect().top <= 120) cur = i;
    }
    for(var j = 0; j < links.length; j++){
      links[j].classList.toggle('active', j === cur);
    }
    ticking = false;
  }
  window.addEventListener('scroll', function(){
    if(!ticking){ ticking = true; requestAnimationFrame(update); }
  }, {passive: true});
  update();
})();
