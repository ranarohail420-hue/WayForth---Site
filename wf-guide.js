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
