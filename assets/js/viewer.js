(function(){
  const q = new URLSearchParams(location.search);
  const start = parseInt(q.get('s')||'1',10)-1;
  let media = document.getElementById('media');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const counter = document.getElementById('counter');
  const slides = JSON.parse(document.getElementById('slides-data').textContent);
  let i = Math.max(0, Math.min(start, slides.length-1));
  function renderSlide(s){
    media = document.getElementById('media');
    if(s.type === 'video'){
      media.outerHTML = '<video id="media" playsinline controls ' + (s.poster ? ('poster="'+s.poster+'" ') : '') + 'preload="metadata"><source src="'+s.src+'"></video>';
    }else{
      media.outerHTML = '<img id="media" alt="'+(s.alt||'')+'" loading="eager">';
      const m = document.getElementById('media'); m.src = s.src; m.alt = s.alt||'';
    }
    history.replaceState(null, '', '?s='+(i+1));
    counter.textContent = (i+1)+' / '+slides.length;
    const nextIdx = (i+1)%slides.length;
    const link = document.createElement('link'); link.rel='prefetch'; link.href=slides[nextIdx].src; document.head.appendChild(link);
  }
  function show(idx){ i=(idx+slides.length)%slides.length; renderSlide(slides[i]); }
  prev.addEventListener('click',()=>show(i-1));
  next.addEventListener('click',()=>show(i+1));
  document.addEventListener('keydown',(e)=>{ if(e.key==='ArrowRight') show(i+1); if(e.key==='ArrowLeft') show(i-1); });
  renderSlide(slides[i]);
})();