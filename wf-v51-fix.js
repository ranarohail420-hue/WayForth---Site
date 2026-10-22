/* Extra brand and crane marker are anchored within the artwork-local FX plane. */
(()=>{const h=document.querySelector('.wf-final-home');if(!h)return;
const plane=h.querySelector('.wf-v48-plane');if(!plane)return;
const t=document.createElement('i');t.className='wf51-trolley';t.setAttribute('aria-hidden','true');plane.append(t);
const m=document.createElement('i');m.className='wf52-mixer-logo';m.setAttribute('aria-hidden','true');plane.append(m);
/* Original brand header is part of approved image: never overlay it. */
})();