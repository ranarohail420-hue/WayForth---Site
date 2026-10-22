/* WAYFORTH V5.4 — final controlled home motion layer. */
(()=>{'use strict';
const home=document.querySelector('.wf-final-home');
if(!home)return;

/* Remove any cached / older injected effects before mounting the one current layer. */
home.querySelectorAll('.wf-v48-effects,.wf-v48-plane,.wf-v50-live-orb,.wf-v50-entrance,.wf51-header,.wf51-mixer-mark,.wf52-mixer-logo,.wf-v53-stage,.wf-v53-intro,.wf-v54-stage,.wf-v54-intro').forEach(n=>n.remove());

const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const stage=document.createElement('div');
stage.className='wf-v54-stage';
stage.setAttribute('aria-hidden','true');
stage.innerHTML=`
  <i class="wf-v54-globe"></i>
  <i class="wf-v54-crane"><b></b></i>
  <i class="wf-v54-weld wf-v54-weld-a"></i>
  <i class="wf-v54-weld wf-v54-weld-b"></i>
  <i class="wf-v54-media-flash wf-v54-media-a"></i>
  <i class="wf-v54-media-flash wf-v54-media-b"></i>
  <i class="wf-v54-media-flash wf-v54-media-c"></i>
  <i class="wf-v54-headlight wf-v54-headlight-left"></i>
  <i class="wf-v54-headlight wf-v54-headlight-right"></i>
  <i class="wf-v54-headlight wf-v54-cement-headlight"></i>
  <i class="wf-v54-roof-lights"></i>
  <img class="wf-v54-cement-logo" src="wf-actual-logo-decal.png" alt="" draggable="false">
`;
home.append(stage);

/* Match the effect layer to the *rendered* object-fit:contain artwork box.
   This prevents position drift on ultrawide / laptop aspect ratios. */
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

function homeIsActive(){
  const scene=document.getElementById('scene-home');
  return !scene || scene.classList.contains('is-active');
}

function runIntro(){
  if(reduced || !homeIsActive())return;
  home.querySelector('.wf-v54-intro')?.remove();
  const intro=document.createElement('div');
  intro.className='wf-v54-intro';
  intro.setAttribute('aria-hidden','true');
  home.append(intro);
  requestAnimationFrame(()=>intro.classList.add('is-playing'));
  window.setTimeout(()=>intro.remove(),2350);
}

/* Initial landing animation: run as soon as the existing app declares itself ready,
   with a fallback so it cannot be lost behind the boot screen. */
if(!reduced){
  if(document.body.classList.contains('ready')) requestAnimationFrame(runIntro);
  else{
    const readyObserver=new MutationObserver(()=>{
      if(document.body.classList.contains('ready')){
        readyObserver.disconnect();
        requestAnimationFrame(runIntro);
      }
    });
    readyObserver.observe(document.body,{attributes:true,attributeFilter:['class']});
    window.setTimeout(()=>{readyObserver.disconnect();runIntro();},2600);
  }

  /* When returning Home from BUILD/TRUCKING/MEDIA, use a short settle instead of
     replaying the full landing animation. This keeps transitions fluid. */
  const scene=document.getElementById('scene-home');
  if(scene){
    let wasActive=scene.classList.contains('is-active');
    const sceneObserver=new MutationObserver(()=>{
      const active=scene.classList.contains('is-active');
      if(active&&!wasActive){
        home.classList.remove('wf-v54-home-return');
        void home.offsetWidth;
        home.classList.add('wf-v54-home-return');
        window.setTimeout(()=>home.classList.remove('wf-v54-home-return'),650);
      }
      wasActive=active;
    });
    sceneObserver.observe(scene,{attributes:true,attributeFilter:['class']});
  }
}

/* Boot fallback: a missing resource must never leave the visitor on the loader. */
window.setTimeout(()=>{
  if(!document.body.classList.contains('ready')){
    document.body.classList.add('ready');
    const boot=document.getElementById('boot');
    if(boot)boot.style.display='none';
  }
},4800);
})();
