/* Extra brand and crane marker are anchored within the artwork-local FX plane. */
(()=>{const h=document.querySelector('.wf-final-home');if(!h)return;
const plane=h.querySelector('.wf-v48-plane');if(!plane)return;
const t=document.createElement('i');t.className='wf51-trolley';t.setAttribute('aria-hidden','true');plane.append(t);
const m=document.createElement('span');m.className='wf51-mixer-mark';m.textContent='WF';m.setAttribute('aria-hidden','true');plane.append(m);
const hd=document.createElement('div');hd.className='wf51-header';hd.setAttribute('aria-hidden','true');hd.innerHTML='<span class="wf51-header-logo">WF</span><span class="wf51-header-name">WAYFORTH</span>';plane.append(hd);
})();