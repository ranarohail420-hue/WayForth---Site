/* WAYFORTH V5.7 — V5.6 motion preserved; CSS only adjusts mixer decal, globe pulse and first-load globe turn. */
(()=>{'use strict';
const home=document.querySelector('.wf-final-home');
if(!home)return;

/* Remove every older injected motion layer. */
home.querySelectorAll('.wf-v48-effects,.wf-v48-plane,.wf-v50-live-orb,.wf-v50-entrance,.wf51-header,.wf51-mixer-mark,.wf52-mixer-logo,.wf-v53-stage,.wf-v53-intro,.wf-v54-stage,.wf-v54-intro,.wf-v55-stage,.wf-v55-intro').forEach(n=>n.remove());

const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
  <img class="wf-v55-cement-logo" src="wf-actual-logo-decal.png" alt="" draggable="false">
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

/* Returning from another scene gets only a quick settle. The initial landing animation
   is CSS-driven by body.ready and therefore cannot replay over an already visible page. */
if(!reduced){
  const scene=document.getElementById('scene-home');
  if(scene){
    let wasActive=scene.classList.contains('is-active');
    const sceneObserver=new MutationObserver(()=>{
      const active=scene.classList.contains('is-active');
      if(active&&!wasActive){
        home.classList.remove('wf-v55-home-return');
        void home.offsetWidth;
        home.classList.add('wf-v55-home-return');
        window.setTimeout(()=>home.classList.remove('wf-v55-home-return'),560);
      }
      wasActive=active;
    });
    sceneObserver.observe(scene,{attributes:true,attributeFilter:['class']});
  }
}

/* Boot safety only. It never re-runs the landing animation and never changes a ready page. */
window.setTimeout(()=>{
  if(!document.body.classList.contains('ready')){
    document.body.classList.add('ready');
    const boot=document.getElementById('boot');
    if(boot)boot.style.display='none';
  }
},4800);
})();
