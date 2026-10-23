/* WAYFORTH V5.9 — approved V5.8 visuals preserved; cement decal removed and secondary Home settle removed for smooth native transitions. */
(()=>{'use strict';
const home=document.querySelector('.wf-final-home');
if(!home)return;

/* Remove every older injected motion layer. */
home.querySelectorAll('.wf-v48-effects,.wf-v48-plane,.wf-v50-live-orb,.wf-v50-entrance,.wf51-header,.wf51-mixer-mark,.wf52-mixer-logo,.wf-v53-stage,.wf-v53-intro,.wf-v54-stage,.wf-v54-intro,.wf-v55-stage,.wf-v55-intro,.wf-v58-entry').forEach(n=>n.remove());

const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* FIRST LOAD ONLY: use the same globe/WF portal visual language as the existing scene transitions.
   This does not alter navigation or the working section-transition code. */
let entry=null;
if(!reduced){
  entry=document.createElement('img');
  entry.className='wf-v58-entry';
  entry.src='globe-opening.webp';
  entry.alt='';
  entry.setAttribute('aria-hidden','true');
  entry.draggable=false;
  home.append(entry);
  entry.addEventListener('animationend',()=>entry&&entry.remove(),{once:true});
  window.setTimeout(()=>{if(entry&&entry.isConnected)entry.remove();},5500);
}

const stage=document.createElement('div');
stage.className='wf-v55-stage';
stage.setAttribute('aria-hidden','true');
stage.innerHTML=`
  <i class="wf-v55-globe"></i>
  <i class="wf-v55-crane"></i>
  <i class="wf-v55-crane-flash wf-v55-crane-flash-1"></i>
  <i class="wf-v55-crane-flash wf-v55-crane-flash-2"></i>
  <i class="wf-v55-crane-flash wf-v55-crane-flash-3"></i>
  <i class="wf-v55-crane-flash wf-v55-crane-flash-4"></i>
  <i class="wf-v55-crane-flash wf-v55-crane-flash-5"></i>
  <i class="wf-v55-crane-flash wf-v55-crane-flash-6"></i>
  <i class="wf-v55-crane-flash wf-v55-crane-flash-7"></i>
  <i class="wf-v55-weld wf-v55-weld-a"></i>
  <i class="wf-v55-weld wf-v55-weld-b"></i>
  <i class="wf-v55-media-flash wf-v55-media-a"></i>
  <i class="wf-v55-media-flash wf-v55-media-b"></i>
  <i class="wf-v55-media-flash wf-v55-media-c"></i>
  <i class="wf-v55-headlight wf-v55-headlight-left"></i>
  <i class="wf-v55-headlight wf-v55-headlight-right"></i>
  <i class="wf-v55-headlight wf-v55-headlight-low-left"></i>
  <i class="wf-v55-headlight wf-v55-headlight-low-right"></i>
  <i class="wf-v55-headlight wf-v55-cement-headlight"></i>
  <i class="wf-v55-roof-lights"></i>
`;
home.append(stage);

/* Lock effects to the real object-fit:contain artwork rectangle on every desktop size. */
function fitStage(){
  const w=home.clientWidth,h=home.clientHeight,ratio=1672/941;
  if(!w||!h)return;
  let sw,sh,x,y;
  if(w/h>ratio){sh=h;sw=h*ratio;x=(w-sw)/2;y=0;}
  else{sw=w;sh=w/ratio;x=0;y=(h-sh)/2;}
  Object.assign(stage.style,{left:`${x}px`,top:`${y}px`,width:`${sw}px`,height:`${sh}px`,right:'auto',bottom:'auto'});
}
fitStage();
window.addEventListener('resize',fitStage,{passive:true});
if(window.ResizeObserver)new ResizeObserver(fitStage).observe(home);

/* Scene-to-scene transitions are intentionally left to the original site transition system.
   No secondary Home-settle animation is stacked on top. */

/* Boot safety only. It never re-runs the landing animation and never changes a ready page. */
window.setTimeout(()=>{
  if(!document.body.classList.contains('ready')){
    document.body.classList.add('ready');
    const boot=document.getElementById('boot');
    if(boot)boot.style.display='none';
  }
},4800);
})();
