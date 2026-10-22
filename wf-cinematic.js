/* WAYFORTH V4.6 — visual enhancement only; intentionally doesn't override navigation. */
(()=>{
 'use strict';
 const home=document.querySelector('.wf-final-home');
 if(!home) return;
 const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const stage=document.createElement('div');
 stage.className='wf-cinema-layer';stage.setAttribute('aria-hidden','true');
 stage.innerHTML=`<div class="wf-intro-night"></div><div class="wf-intro-aurora"></div>
 <div class="wf-cinema-plane">
 <div class="wf-cinema-orbit o1"></div><div class="wf-cinema-orbit o2"></div>
 <div class="wf-cinema-light l1"></div><div class="wf-cinema-light l2"></div><div class="wf-cinema-light l3"></div>
 <i class="wf-build-weld w1"></i><i class="wf-build-weld w2"></i>
 <i class="wf-truck-glint h1"></i><i class="wf-truck-glint h2"></i>
 <i class="wf-studio-flash f1"></i><i class="wf-studio-flash f2"></i><i class="wf-studio-flash f3"></i>
 </div>`;
 home.appendChild(stage);
 // Scene-specific decorative FX use one correctly aligned plane, never cloned scenery.
 const traveling=document.createElement('div');traveling.className='wf-travel-enhancement';traveling.setAttribute('aria-hidden','true');
 for(let i=0;i<3;i++){let el=document.createElement('div');el.className='wf-tunnel-ring'+(i?' tr'+(i+1):'');traveling.appendChild(el)}
 for(let i=0;i<18;i++){let el=document.createElement('div');el.className='wf-travel-beam';el.style.setProperty('--rotation',(i*20)+'deg');el.style.animationDelay=(i%4)*38+'ms';traveling.appendChild(el)}
 document.body.appendChild(traveling);
 let first=true,returnTimer=null,travelTimer=null;
 const intro=()=>{
   if(reduce)return;
   if(home.closest('.scene')?.classList.contains('is-active')===false)return;
   if(first){first=false;home.classList.add('wf-intro-playing');
     window.setTimeout(()=>{home.classList.remove('wf-intro-playing');},2800);
   }else{stage.classList.remove('wf-home-return');void stage.offsetHeight;stage.classList.add('wf-home-return');
     clearTimeout(returnTimer);returnTimer=setTimeout(()=>stage.classList.remove('wf-home-return'),1050);
   }
 };
 const bodyReady=()=>{
   if(document.body.classList.contains('ready')){intro();return true}return false;
 };
 if(!bodyReady()){
   const watchReady=new MutationObserver(()=>{if(bodyReady())watchReady.disconnect()});
   watchReady.observe(document.body,{attributes:true,attributeFilter:['class']});
   // Fallback if an existing scene takes too long to mount; keep it non-blocking.
   setTimeout(()=>{watchReady.disconnect();bodyReady()},6500);
 }
 let homeWasActive=home.closest('.scene')?.classList.contains('is-active');
 const homeObserver=new MutationObserver(()=>{
   const active=home.closest('.scene')?.classList.contains('is-active');
   if(active&&!homeWasActive&&document.body.classList.contains('ready'))intro();
   homeWasActive=active;
 });
 if(home.closest('.scene'))homeObserver.observe(home.closest('.scene'),{attributes:true,attributeFilter:['class']});
 const portal=document.getElementById('portal');
 if(portal&&!reduce){
   let prev=false;
   const portalObserver=new MutationObserver(()=>{
     const on=portal.classList.contains('is-on');
     if(on&&!prev){
       let bounds=portal.getBoundingClientRect();
       const px=portal.style.getPropertyValue('--px')||'50%';const py=portal.style.getPropertyValue('--py')||'42%';
       traveling.style.setProperty('--wf-x',px);traveling.style.setProperty('--wf-y',py);
       traveling.classList.remove('active');void traveling.offsetHeight;traveling.classList.add('active');
       clearTimeout(travelTimer);travelTimer=setTimeout(()=>traveling.classList.remove('active'),950);
     }else if(!on&&prev){traveling.classList.remove('active')}
     prev=on;
   });
   portalObserver.observe(portal,{attributes:true,attributeFilter:['class']});
 }
})();
