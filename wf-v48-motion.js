/* WAYFORTH V4.9 — single artwork, reverse-navigation-style landing reveal, aligned live effects. */
(()=>{
 'use strict';
 const home=document.querySelector('.wf-final-home');if(!home)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const fx=document.createElement('div');fx.className='wf-v48-effects';fx.setAttribute('aria-hidden','true');
 fx.innerHTML=`<div class="wf-v48-plane"><i class="wf-v48-ring r1"></i><i class="wf-v48-ring r2"></i><i class="wf-v48-spark s1"></i><i class="wf-v48-spark s2"></i><i class="wf-v48-spark s3"></i><i class="wf-v48-headlamp h1"></i><i class="wf-v48-headlamp h2"></i><i class="wf-v48-camera c1"></i><i class="wf-v48-camera c2"></i><i class="wf-v48-camera c3"></i></div>`;
 home.appendChild(fx);
 if(reduced)return;
 // Start live pulses immediately; don't wait for entrance and don't animate large blurs.
 const cover=document.createElement('div');cover.className='wf-v49-intro-cover';
 const orbit=document.createElement('div');orbit.className='wf-v49-intro-orbit';
 home.append(cover,orbit);
 let done=false;
 function play(){
   if(done)return;done=true;
   if(!document.getElementById('scene-home')?.classList.contains('is-active'))return;
   cover.classList.add('is-playing');orbit.classList.add('is-playing');
   const clear=()=>{cover.remove();orbit.remove()};
   orbit.addEventListener('animationend',clear,{once:true});setTimeout(clear,2500);
 }
 if(document.body.classList.contains('ready'))requestAnimationFrame(play);
 else {
   const mo=new MutationObserver(()=>{if(document.body.classList.contains('ready')){mo.disconnect();requestAnimationFrame(play)}});
   mo.observe(document.body,{attributes:true,attributeFilter:['class']});
   setTimeout(()=>{mo.disconnect();play()},2300);
 }
})();
