/* WAYFORTH V4.7; purely decorative opening; never blocks navigation */
(()=>{
 'use strict';
 const home=document.querySelector('.wf-final-home');
 if(!home || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
 const opener=document.createElement('div'); opener.className='wf-opening';opener.setAttribute('aria-hidden','true');
 opener.innerHTML='<div class="wf-open-stars"></div><div class="wf-open-halo"></div><div class="wf-open-halo gold"></div><img class="wf-open-globe" src="wf-globe-intro.png" alt=""><span class="wf-open-status">THE WAY. CARRIED FORTH.</span>';
 document.body.appendChild(opener);
 const scene=document.getElementById('scene-home');
 const stop=()=>{opener.classList.add('wf-opening-exit');home.classList.add('wf-opening-underlay-finish');setTimeout(()=>{opener.remove();home.classList.remove('wf-opening-underlay','wf-opening-underlay-finish')},600)};
 const start=()=>{
   if(!scene?.classList.contains('is-active')){opener.remove();return}
   home.classList.add('wf-opening-underlay');requestAnimationFrame(()=>home.classList.add('wf-opening-underlay-finish'));
   setTimeout(stop,2650);
 };
 // start as soon as DOM executes; no awaiting all iframe pages before intro
 start();
 // safety for tab switch and unexpectedly long resource loading
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()},{once:true});
 setTimeout(()=>{if(opener.isConnected)stop()},4600);
})();
