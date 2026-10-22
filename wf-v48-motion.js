/* WAYFORTH V4.9 — single artwork, reverse-navigation-style landing reveal, aligned live effects. */
(()=>{
 'use strict';
 const home=document.querySelector('.wf-final-home');if(!home)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const fx=document.createElement('div');fx.className='wf-v48-effects';fx.setAttribute('aria-hidden','true');
 fx.innerHTML=`<div class="wf-v48-plane"><i class="wf-v48-ring r1"></i><i class="wf-v48-ring r2"></i><i class="wf-v48-spark s1"></i><i class="wf-v48-spark s2"></i><i class="wf-v48-spark s3"></i><i class="wf-v48-headlamp h1"></i><i class="wf-v48-headlamp h2"></i><i class="wf-v48-camera c1"></i><i class="wf-v48-camera c2"></i><i class="wf-v48-camera c3"></i></div>`;
 home.appendChild(fx);
 if(reduced)return;

})();
