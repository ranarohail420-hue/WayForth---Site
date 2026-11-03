/* WAYFORTH "choose a service" guide: GET A QUOTE makes the options below move one after another,
   with a small hint, so visitors know where to click next. */
window.wfGuide=function(targets,text,pos){
  targets=[...targets].filter(Boolean);if(!targets.length)return;
  let pill=document.querySelector('.wf-guide');
  if(!pill){pill=document.createElement('div');pill.className='wf-guide';pill.setAttribute('role','status');document.body.appendChild(pill);}
  pill.innerHTML=(text||'Choose a service to get your quote')+'<i>↓</i>';
  const first=targets[0].getBoundingClientRect();
  const top=pos&&pos.top!=null?pos.top:Math.max(80,first.top-58);
  pill.style.top=top+'px';pill.style.bottom='auto';
  pill.classList.add('show');clearTimeout(window.__wfgT);window.__wfgT=setTimeout(()=>pill.classList.remove('show'),3800);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  targets.forEach((t,i)=>{
    [0,1].forEach(round=>setTimeout(()=>{t.classList.remove('wf-pick');void t.offsetWidth;t.classList.add('wf-pick');
      setTimeout(()=>t.classList.remove('wf-pick'),reduced?1400:950);},(round*targets.length+i)*260+(round?320:0)));
  });
};

/* phone menu: adds a menu button to the shared WAYFORTH header on small screens */
(function(){function init(){document.querySelectorAll('.wfh').forEach(function(h){var bar=h.querySelector('.wfh-bar'),nav=h.querySelector('.wfh-nav');
  if(!bar||!nav||bar.querySelector('.wfh-burger'))return;var b=document.createElement('button');b.type='button';b.className='wfh-burger';b.setAttribute('aria-label','Open menu');b.setAttribute('aria-expanded','false');
  b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  bar.appendChild(b);var set=function(o){h.classList.toggle('menu-open',o);b.setAttribute('aria-expanded',String(o));};
  b.addEventListener('click',function(e){e.stopPropagation();set(!h.classList.contains('menu-open'));});
  nav.addEventListener('click',function(){set(false);});document.addEventListener('click',function(e){if(!h.contains(e.target))set(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});});}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();
