// Render homepage cards from #cards-data
(function(){
  const dataEl = document.getElementById('cards-data');
  const grid = document.getElementById('grid');
  if(!dataEl || !grid) return;
  let cards = [];
  try { cards = JSON.parse(dataEl.textContent || '[]'); } catch(e) { cards = []; }
  cards.forEach(c => {
    const a = document.createElement('a');
    a.className = 'card';
    a.href = c.href;
    a.setAttribute('aria-label', c.title || '');
    if(c.external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }

    if(c.img){
      const media = document.createElement('div');
      media.className = 'media';
      if(c.ratio) media.style.aspectRatio = c.ratio;
      const img = document.createElement('img');
      img.src = c.img; img.alt = c.alt || c.title || '';
      img.loading = 'lazy'; img.decoding = 'async';
      img.setAttribute('draggable','false');
      if(c.pos) img.style.objectPosition = c.pos; // e.g., '50% 30%'
      media.appendChild(img);
      a.appendChild(media);
    }
    if(c.title){
      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = c.title;
      a.appendChild(label);
    }

    grid.appendChild(a);
  });
})();
