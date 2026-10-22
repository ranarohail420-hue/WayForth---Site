(()=>{'use strict';
const home=document.querySelector('.wf-final-home');if(!home)return;
// Dispose previous overlays if a cached page contains an earlier version.
home.querySelectorAll('.wf-v48-effects,.wf-v48-plane,.wf-v50-live-orb,.wf-v50-entrance,.wf51-header,.wf51-mixer-mark,.wf52-mixer-logo').forEach(n=>n.remove());
const stage=document.createElement('div');stage.className='wf-v53-stage';stage.setAttribute('aria-hidden','true');
stage.innerHTML='<i class="wf-v53-globe"></i><i class="wf-v53-flash wf-v53-weld"></i><i class="wf-v53-flash wf-v53-build"></i><i class="wf-v53-flash wf-v53-studio"></i><i class="wf-v53-flash wf-v53-studio-two"></i><i class="wf-v53-flash wf-v53-lamp"></i>';
home.append(stage);
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
 const intro=document.createElement('div');intro.className='wf-v53-intro';intro.setAttribute('aria-hidden','true');home.append(intro);
 const run=()=>{if(!document.querySelector('#scene-home.is-active')){intro.remove();return}intro.classList.add('is-playing');setTimeout(()=>intro.remove(),1900)};
 if(document.body.classList.contains('ready'))requestAnimationFrame(run);
 else{const ob=new MutationObserver(()=>{if(document.body.classList.contains('ready')){ob.disconnect();requestAnimationFrame(run)}});ob.observe(document.body,{attributes:true,attributeFilter:['class']});setTimeout(()=>{ob.disconnect();run()},3500)}
}
// Boot fallback: broken scene resources should never leave the visitor staring at a blank screen.
setTimeout(()=>{if(!document.body.classList.contains('ready')){document.body.classList.add('ready');const b=document.getElementById('boot');if(b)b.style.display='none';}},4800);
})();
