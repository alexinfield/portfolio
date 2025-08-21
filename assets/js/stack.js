(function(){
  const dataEl = document.getElementById('slides-data');
  if(!dataEl) return;
  let slides = [];
  try { slides = JSON.parse(dataEl.textContent || '[]'); } catch(e) { slides = []; }
  const stack = document.getElementById('stack') || document.body;
  const append = (el) => stack.appendChild(el);
  const videos = [];

  slides.forEach((s)=>{
    if(s.type === 'video'){
      const v = document.createElement('video');
      // Attributes for mobile Safari inline autoplay
      v.playsInline = true; v.setAttribute('playsinline','');
      v.muted = (s.muted !== false); if(v.muted) v.setAttribute('muted','');
      v.loop = (s.loop !== false);
      // We'll manage autoplay with IntersectionObserver to avoid odd hover popups
      const shouldAuto = (s.autoplay !== false);
      if(shouldAuto) v.dataset.auto = '1';
      if(s.controls) { v.controls = true; } else { v.controls = false; }
      // Reduce browser chrome/popovers
      try { v.disablePictureInPicture = true; } catch(_){}
      v.setAttribute('disablepictureinpicture','');
      v.setAttribute('controlsList','nodownload noplaybackrate noremoteplayback');
      v.setAttribute('preload','metadata');
      if(s.poster) v.poster = s.poster;
      // Multiple sources support
      if(Array.isArray(s.sources) && s.sources.length){
        s.sources.forEach(srcObj => {
          const source = document.createElement('source');
          source.src = srcObj.src; if(srcObj.mime) source.type = srcObj.mime;
          v.appendChild(source);
        });
      } else if(s.src){
        const src = document.createElement('source'); src.src = s.src; if(s.mime) src.type = s.mime; v.appendChild(src);
      }
      // Prevent accidental fullscreen
      v.addEventListener('webkitbeginfullscreen', (e)=>{ e.preventDefault?.(); try{ v.blur(); }catch(_){} });
      append(v);
      videos.push(v);
    } else {
      const img = document.createElement('img');
      img.loading = 'lazy'; img.decoding = 'async';
      img.src = s.src; img.alt = s.alt || '';
      append(img);
    }
  });

  if(videos.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        const v = entry.target;
        const auto = v.dataset.auto === '1';
        if(!auto) return;
        if(entry.isIntersecting && entry.intersectionRatio > 0.35){
          const p = v.play(); if(p && typeof p.catch === 'function') p.catch(()=>{});
        } else {
          v.pause();
        }
      });
    },{threshold:[0,0.35,0.6,1]});
    videos.forEach(v=>io.observe(v));
  }
})();
