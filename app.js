(()=>{
  const app=document.getElementById('app');
  const portal=document.getElementById('portal');
  const portalGlobe=document.getElementById('portal-globe');
  const homeGlobe=document.getElementById('home-globe');
  const toast=document.getElementById('toast');
  const scenes={};
  document.querySelectorAll('.scene[data-scene]').forEach(s=>scenes[s.dataset.scene]=s);
  let current='home',transitioning=false,pendingAfter=null;

  const routes={home:'/',build:'/build',trucking:'/trucking',media:'/media',quote:'/quote'};
  const materialData={
    'Steel / Sariya':{supplier:'Mughal Steel',specs:['Grade 40','Grade 60','Other / confirm with WAYFORTH'],units:['Ton','Kg']},
    'Cement':{supplier:'Maple Leaf Cement',specs:['50 kg bag','Bulk / project inquiry'],units:['Bag','Truckload']},
    'Bricks':{supplier:'WAYFORTH verified Brick Kilns',specs:['Awwal / Grade A','Machine-made / project specification'],units:['1,000 bricks','Brick']},
    'Paints':{supplier:'Berger Paints',specs:['Interior Emulsion','Exterior / Weathercoat','Enamel','Primer / Putty'],units:['Gallon','Bucket','Litre']},
    'Pipes':{supplier:'Popular Pipes',specs:['uPVC','PPRC','HDPE / project specification'],units:['Length','Feet','Piece']},
    'Electrical':{supplier:'Premium electrical supply',specs:['Wires & Cables','Switches & Sockets','DB / Breakers','Lighting'],units:['Coil','Piece','Box']}
  };
  let selectedMaterial='';
  let cart=[];
  try{cart=JSON.parse(localStorage.getItem('wf-build-cart')||'[]')}catch(_){cart=[]}

  const qs=s=>document.querySelector(s);
  const qsa=s=>[...document.querySelectorAll(s)];
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const showToast=(msg)=>{toast.textContent=msg;toast.classList.add('is-on');clearTimeout(showToast._t);showToast._t=setTimeout(()=>toast.classList.remove('is-on'),2200)};

  function viewport(){
    const vv=window.visualViewport;
    return {w:vv?.width||innerWidth,h:vv?.height||innerHeight};
  }
  function farRadius(x,y,w,h){return Math.hypot(Math.max(x,w-x),Math.max(y,h-y))*1.08}
  function globeRect(){
    const r=homeGlobe.getBoundingClientRect();
    return {x:r.left+r.width/2,y:r.top+r.height/2,w:r.width};
  }
  function sceneOrigin(){
    const {w,h}=viewport();
    if(current==='home'){
      const r=globeRect();return {x:r.x,y:r.y,w:r.w};
    }
    return {x:w/2,y:h*.44,w:Math.min(w,h)*.40};
  }
  function portalPrepare(o){
    portal.style.setProperty('--px',`${o.x}px`);
    portal.style.setProperty('--py',`${o.y}px`);
    portal.style.setProperty('--gx',`${o.x}px`);
    portal.style.setProperty('--gy',`${o.y}px`);
    portal.style.setProperty('--gw',`${o.w}px`);
    portal.classList.add('is-on');
  }
  function cleanSceneStyles(s){
    s.style.clipPath='';s.style.webkitClipPath='';s.style.zIndex='';
  }

  async function go(target,{replace=false,after=null}={}){
    if(!scenes[target]||target===current||transitioning){if(after) after();return}
    transitioning=true;pendingAfter=after;
    const from=scenes[current],to=scenes[target];
    const {w,h}=viewport();
    const o=sceneOrigin();
    const radius=farRadius(o.x,o.y,w,h);

    to.classList.add('is-under');
    to.style.zIndex='2';
    from.style.zIndex='1';
    to.style.clipPath=`circle(0px at ${o.x}px ${o.y}px)`;
    to.style.webkitClipPath=`circle(0px at ${o.x}px ${o.y}px)`;
    portalPrepare(o);

    // Persistent globe moves with the reveal. There is no document navigation or loading gap.
    const centerX=w/2,centerY=h*.46;
    const moveX=centerX-o.x,moveY=centerY-o.y;
    const p1=portalGlobe.animate([
      {transform:'translate(-50%,-50%) translate3d(0,0,0) scale(1)',opacity:1},
      {transform:`translate(-50%,-50%) translate3d(${moveX*.72}px,${moveY*.72}px,0) scale(1.36)`,opacity:1,offset:.52},
      {transform:`translate(-50%,-50%) translate3d(${moveX}px,${moveY}px,0) scale(.22)`,opacity:0}
    ],{duration:860,easing:'cubic-bezier(.36,.02,.12,1)',fill:'forwards'});

    const reveal=to.animate([
      {clipPath:`circle(0px at ${o.x}px ${o.y}px)`,webkitClipPath:`circle(0px at ${o.x}px ${o.y}px)`},
      {clipPath:`circle(${radius*.22}px at ${o.x}px ${o.y}px)`,webkitClipPath:`circle(${radius*.22}px at ${o.x}px ${o.y}px)`,offset:.32},
      {clipPath:`circle(${radius}px at ${o.x}px ${o.y}px)`,webkitClipPath:`circle(${radius}px at ${o.x}px ${o.y}px)`}
    ],{duration:900,easing:'cubic-bezier(.22,.74,.16,1)',fill:'forwards'});

    const dim=from.animate([
      {transform:'scale(1)',opacity:1,filter:'brightness(1)'},
      {transform:'scale(1.022)',opacity:.92,filter:'brightness(.92)'},
      {transform:'scale(1.035)',opacity:.28,filter:'brightness(.72)'}
    ],{duration:850,easing:'ease-in-out',fill:'forwards'});

    await reveal.finished.catch(()=>{});
    from.classList.remove('is-active');
    to.classList.remove('is-under');
    to.classList.add('is-active');
    cleanSceneStyles(to);cleanSceneStyles(from);
    [p1,reveal,dim].forEach(a=>{try{a.cancel()}catch(_){}});
    portalGlobe.getAnimations().forEach(a=>a.cancel());
    portal.classList.remove('is-on');
    current=target;
    document.body.dataset.scene=target;
    updateHistory(target,replace);
    transitioning=false;
    if(pendingAfter){const fn=pendingAfter;pendingAfter=null;setTimeout(fn,40)}
  }

  function updateHistory(scene,replace=false){
    if(location.protocol==='file:'){
      const hash=scene==='home'?'#home':'#'+scene;
      if(replace) history.replaceState({scene},'',hash); else history.pushState({scene},'',hash);
      return;
    }
    const path=routes[scene]||'/';
    const fn=replace?'replaceState':'pushState';
    history[fn]({scene},'',path);
  }
  function sceneFromLocation(){
    const hash=location.hash.replace('#','');
    if(scenes[hash]) return hash;
    const p=location.pathname.replace(/^\/|\/$/g,'');
    return scenes[p]?p:'home';
  }
  function setInitial(scene){
    Object.entries(scenes).forEach(([k,s])=>s.classList.toggle('is-active',k===scene));
    current=scene;document.body.dataset.scene=scene;
    if(scene!=='home') document.documentElement.classList.add('skip-home-intro');
  }

  qsa('[data-open]').forEach(el=>el.addEventListener('click',e=>{
    e.preventDefault();
    const target=el.dataset.open;
    const form=el.dataset.form;
    if(form){go(target,{after:()=>openTruckForm(form)});return}
    go(target);
  }));

  addEventListener('popstate',()=>{
    const s=sceneFromLocation();
    if(s!==current) go(s,{replace:true});
  });

  // Build materials.
  qsa('[data-material]').forEach(b=>b.addEventListener('click',()=>openMaterial(b.dataset.material)));
  const materialModal=qs('#material-modal');
  function openMaterial(name){
    selectedMaterial=name;const cfg=materialData[name];if(!cfg)return;
    qs('#material-title').textContent=name;qs('#material-supplier').textContent=cfg.supplier;
    qs('#material-spec').innerHTML=cfg.specs.map(x=>`<option>${x}</option>`).join('');
    qs('#material-unit').innerHTML=cfg.units.map(x=>`<option>${x}</option>`).join('');
    qs('#material-qty').value='1';qs('#material-price').value='';qs('#material-note').value='';
    materialModal.classList.add('is-open');materialModal.setAttribute('aria-hidden','false');
  }
  qs('#add-material').addEventListener('click',()=>{
    const qty=Number(qs('#material-qty').value||0);if(qty<=0){showToast('Enter a quantity.');return}
    cart.push({id:Date.now(),material:selectedMaterial,spec:qs('#material-spec').value,qty,unit:qs('#material-unit').value,target:qs('#material-price').value,note:qs('#material-note').value});
    saveCart();closeOverlay(materialModal);showToast(`${selectedMaterial} added to quote.`);
  });
  function saveCart(){localStorage.setItem('wf-build-cart',JSON.stringify(cart));qs('#cart-count').textContent=cart.length;renderCart()}
  function renderCart(){
    const host=qs('#cart-items');if(!host)return;
    if(!cart.length){host.innerHTML='<div class="empty">Your material quote list is empty.</div>';return}
    host.innerHTML=cart.map(i=>`<div class="cart-row"><div><b>${escapeHTML(i.material)}</b><small>${escapeHTML(i.spec)} · ${i.qty} ${escapeHTML(i.unit)}${i.target?` · Target ${escapeHTML(i.target)}`:''}</small></div><button data-remove="${i.id}">REMOVE</button></div>`).join('');
    host.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{cart=cart.filter(i=>String(i.id)!==b.dataset.remove);saveCart()});
  }
  function escapeHTML(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
  qs('.scene-quote-btn').addEventListener('click',e=>{e.stopPropagation();qs('#cart-drawer').classList.add('is-open');qs('#cart-drawer').setAttribute('aria-hidden','false')});
  qs('#send-cart').addEventListener('click',()=>{if(!cart.length){showToast('Add at least one material first.');return}showToast('Quote request captured for backend connection.');});

  // Trucking forms.
  qsa('[data-form].truck-card-hit').forEach(b=>b.addEventListener('click',()=>openTruckForm(b.dataset.form)));
  const truckingModal=qs('#trucking-modal');
  function openTruckForm(type){
    const trucker=type==='trucker';
    qs('#truck-form-title').textContent=trucker?'Plan my week.':'Move my load.';
    qs('#truck-form-kicker').textContent=trucker?'FOR TRUCK DRIVERS':'FOR SHIPPERS & BROKERS';
    qs('#trucker-form').classList.toggle('is-hidden',!trucker);qs('#broker-form').classList.toggle('is-hidden',trucker);
    truckingModal.classList.add('is-open');truckingModal.setAttribute('aria-hidden','false');
  }
  qsa('.dynamic-form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();showToast('Form captured for backend connection.');closeOverlay(truckingModal)}));

  qsa('[data-close]').forEach(b=>b.addEventListener('click',()=>{
    const what=b.dataset.close;
    closeOverlay(what==='material'?materialModal:what==='trucking'?truckingModal:qs('#cart-drawer'));
  }));
  qsa('.modal,.drawer').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)closeOverlay(o)}));
  function closeOverlay(o){o.classList.remove('is-open');o.setAttribute('aria-hidden','true')}

  // Make the current single-app architecture feel instant: decode every core scene before releasing boot.
  const critical=qsa('img').filter(i=>/globe-opening|world-build|world-truck|world-dd|build-0|trucking-0/.test(i.src));
  Promise.all(critical.map(i=>i.decode().catch(()=>{}))).then(()=>{
    document.body.classList.add('ready');
  });

  // Avoid accidental double-tap zoom-like gesture states on the stage.
  let lastTouchEnd=0;
  document.addEventListener('touchend',e=>{const now=Date.now();if(now-lastTouchEnd<=280)e.preventDefault();lastTouchEnd=now},{passive:false});

  setInitial(sceneFromLocation());
  saveCart();
})();
