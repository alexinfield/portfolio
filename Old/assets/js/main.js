// minimal
(function(){
  const header = document.querySelector('header');
  if(!header) return;
  const setH = () => {
    const h = Math.round(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--header-h', h + 'px');
  };
  if('ResizeObserver' in window){
    const ro = new ResizeObserver(() => setH());
    ro.observe(header);
  } else {
    window.addEventListener('resize', setH);
  }
  document.addEventListener('DOMContentLoaded', setH);
  window.addEventListener('load', setH);
  setH();
})();
