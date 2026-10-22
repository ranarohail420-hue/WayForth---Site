/* V5.0: approved artwork; independently breathing globe texture, no duplicate crane/hook.
   Existing V4.9 inter-scene transition is untouched. */
(()=>{
'use strict';
const home=document.querySelector('.wf-final-home'); if(!home) return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const plane=home.querySelector('.wf-v48-plane');
if(plane){
 const orb=document.createElement('div');orb.className='wf-v50-live-orb';orb.setAttribute('aria-hidden','true');
 orb.innerHTML='<img src="wf-globe-live.webp" alt="">';
 // Put orb below the light rings and flash effects, but above the fixed approved artwork.
 plane.prepend(orb);
 const crane=document.createElement('div');crane.className='wf-v50-crane-beam';crane.setAttribute('aria-hidden','true');
 crane.innerHTML='<i class="wf-v50-crane-runner"></i><i class="wf-v50-crane-lamp"></i>';
 plane.append(crane);
}
const fx=document.createElement('div');fx.className='wf-v50-entrance';fx.setAttribute('aria-hidden','true');
fx.innerHTML='<div class="wf-v50-vignette"></div><div class="wf-v50-orbit o1"></div><div class="wf-v50-orbit o2"></div><div class="wf-v50-arrival a1"></div><div class="wf-v50-arrival a2"></div><div class="wf-v50-arrival a3"></div><div class="wf-v50-energy"></div>';
home.append(fx);
if(reduced){fx.remove();return;}
const begin=()=>{
 if(!document.getElementById('scene-home')?.classList.contains('is-active')){fx.remove();return;}
 // Start on first paint when home app becomes ready; no multi-second intro delay.
 requestAnimationFrame(()=>requestAnimationFrame(()=>fx.classList.add('play')));
 setTimeout(()=>fx.remove(),2850);
};
if(document.body.classList.contains('ready'))begin();
else{
 const mo=new MutationObserver(()=>{if(document.body.classList.contains('ready')){mo.disconnect();begin();}});
 mo.observe(document.body,{attributes:true,attributeFilter:['class']});
 setTimeout(()=>{mo.disconnect();begin()},2800);
}
})();
