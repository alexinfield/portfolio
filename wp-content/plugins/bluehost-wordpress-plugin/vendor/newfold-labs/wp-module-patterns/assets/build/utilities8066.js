(()=>{var l=class{constructor({clientId:t,...n}={}){this.options={activeClass:"nfd-wb-animated-in",root:null,rootMargin:"0px",threshold:0,...n}}observeElements(t,n=null,e=!1){if(!("IntersectionObserver"in window)||!t?.length||document.documentElement.classList.contains("block-editor-block-preview__content-iframe"))return;function a(r,i){this._mutationCallback(r,i,n)}let o=new IntersectionObserver(this._handleIntersection.bind(this),this.options),d=new MutationObserver(a.bind(this)),u=new MutationObserver(this._handleClassMutation.bind(this));t.forEach(r=>{let i=r;r.classList.contains("nfd-wb-reveal-right")&&(i=r.parentElement),o.observe(i),e&&(u.observe(i,{attributes:!0,attributeFilter:["class"]}),d.observe(i,{attributes:!0,attributeFilter:["class"]}))})}_handleIntersection(t,n){t.forEach(e=>{e.isIntersecting&&(e.target.classList.add(this.options.activeClass),e.target.querySelectorAll(".nfd-wb-animate").forEach(a=>{a.classList.add(this.options.activeClass)}),n.unobserve(e.target))})}_handleClassMutation(t){t.forEach(n=>{if(n?.type==="attributes"){let e=n.target;e.classList.contains("nfd-wb-animated-in")||e.classList.add("nfd-wb-animated-in")}})}_mutationCallback(t,n,e=null){t.forEach(a=>{if(a?.type==="attributes"){let o=a.target;e&&e===o.getAttribute("data-block")&&(o.getAttribute("data-replay-animation")===null&&(o.setAttribute("data-replay-animation",!0),requestAnimationFrame(()=>{o.removeAttribute("data-replay-animation")})),n.disconnect())}})}};document.addEventListener("DOMContentLoaded",()=>{c()});document.addEventListener("wonder-blocks/toolbar-button-added",()=>{c()});document.addEventListener("wonder-blocks/animation-changed",s=>{let t=s?.detail?.clientId;c(t)});document.addEventListener("wonder-blocks/block-order-changed",()=>{c()});window.onload=function(){c()};function c(s=null){let t=document.body.classList.contains("block-editor-page")||!!s||document.body.classList.contains("block-editor-iframe__body"),n=t?document.querySelector(".interface-interface-skeleton__content"):null,e=new l({root:n,threshold:0});requestAnimationFrame(()=>{let a=Array.from(document.getElementsByClassName("nfd-wb-animate"));e.observeElements(a,s,t)})}})();