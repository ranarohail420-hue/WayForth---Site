/* WAYFORTH V4.8: ambient effects start immediately, camera reveal starts after home is ready. */
(()=>{
 'use strict';
 const home=document.querySelector('.wf-final-home');if(!home)return;
 const scene=document.getElementById('scene-home');
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const fx=document.createElement('div');fx.className='wf-v48-effects';fx.setAttribute('aria-hidden','true');
 fx.innerHTML=`<div class="wf-v48-plane"><i class="wf-v48-ring r1"></i><i class="wf-v48-ring r2"></i><i class="wf-v48-spark s1"></i><i class="wf-v48-spark s2"></i><i class="wf-v48-spark s3"></i><i class="wf-v48-crane"></i><i class="wf-v48-headlamp h1"></i><i class="wf-v48-headlamp h2"></i><i class="wf-v48-camera c1"></i><i class="wf-v48-camera c2"></i><i class="wf-v48-camera c3"></i></div>`;
 home.appendChild(fx);
 if(reduce||!scene?.classList.contains('is-active'))return;
 home.classList.add('wf-v48-start');
 let played=false;
 const play=()=>{if(played)return;played=true;requestAnimationFrame(()=>requestAnimationFrame(()=>{home.classList.remove('wf-v48-start');home.classList.add('wf-v48-reveal');}));setTimeout(()=>{home.classList.remove('wf-v48-reveal');home.querySelector('.wf-final-art').style.willChange='auto'},2800)};
 if(document.body.classList.contains('ready'))play();
 else{
  const observer=new MutationObserver(()=>{if(document.body.classList.contains('ready')){observer.disconnect();play()}});
  observer.observe(document.body,{attributes:true,attributeFilter:['class']});
  setTimeout(()=>{observer.disconnect();play()},4000);
 }
})();
