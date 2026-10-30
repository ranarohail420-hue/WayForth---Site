/* WAYFORTH V37 — cinematic globe landing + living Home scene.
   Artwork: wf-home-wide.webp (1960 x 941). All coordinates below are artwork pixels. */
(()=>{'use strict';
const home=document.querySelector('.wf-final-home');
if(!home)return;
const stage=home.querySelector('.wf-home-stage'), cam=home.querySelector('.wf-home-cam'), art=home.querySelector('.wf-final-art');
if(!stage||!cam||!art)return;
const section=home.closest('section')||home;
const AW=1960, AH=941, ART_URL=art.getAttribute('src');
const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const rand=(a,b)=>a+Math.random()*(b-a);
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;

/* =========================== LIVING SCENE (canvas) =========================== */
const fx=document.createElement('canvas');fx.className='wf-fx';fx.setAttribute('aria-hidden','true');
cam.insertBefore(fx,art.nextSibling);
const ctx=fx.getContext('2d');
let scale=1,dpr=1;
function sizeFx(){
  const r=stage.getBoundingClientRect(); if(!r.width)return;
  dpr=Math.min(window.devicePixelRatio||1,1.6); scale=r.width/AW;
  fx.width=Math.round(r.width*dpr); fx.height=Math.round(r.height*dpr);
}
sizeFx(); window.addEventListener('resize',sizeFx,{passive:true});
if(window.ResizeObserver)new ResizeObserver(sizeFx).observe(stage);

const G={cx:945,cy:332,r:272};
const JIB_A=[381,153], JIB_B=[676,251], APEX=[360,79];
const JIB_LAMPS=[[268,123],[392,156],[472,181],[532,196],[590,215],[645,233],[92,92],[142,120]];
const WELD=[[410,362],[552,481],[277,470],[492,560],[575,638],[338,412]].map(p=>({x:p[0],y:p[1],on:false,t:rand(0,1.5)}));
const WHEELS=[{x:969,y:619,rx:15,ry:40},{x:843,y:628,rx:10,ry:30},{x:822,y:628,rx:10,ry:30},{x:720,y:634,rx:7,ry:21},{x:711,y:634,rx:7,ry:21}];
const HEAD=[[1028,573,1],[1170,577,1],[1023,631,.6],[1181,634,.6]];
const ROOF=[];for(let i=0;i<8;i++)ROOF.push([983+i*14.6,458-i*.6]);
const MEDIA=[[1260,596],[1597,571],[1700,573],[1232,571],[1294,576],[1514,561],[1750,558],[1342,600],[1462,602],[1650,600]];
const sparks=[], flashes=[], twinkles=[], streaks=[];
let nextFlash=.6;

function glow(x,y,r,col,a){
  const g=ctx.createRadialGradient(x,y,0,x,y,r);
  g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(.35,`rgba(${col},${a*.45})`);g.addColorStop(1,`rgba(${col},0)`);
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
}
function star(x,y,len,a,col){
  ctx.strokeStyle=`rgba(${col},${a})`;ctx.lineWidth=1.2;ctx.beginPath();
  ctx.moveTo(x-len,y);ctx.lineTo(x+len,y);ctx.moveTo(x,y-len);ctx.lineTo(x,y+len);ctx.stroke();
}

function drawCrane(t){
  // trolley travels along the jib, the hook raises / lowers, the steel beam swings
  const u=.40+.22*Math.sin(t*.23);
  const px=JIB_A[0]+(JIB_B[0]-JIB_A[0])*u, py=JIB_A[1]+(JIB_B[1]-JIB_A[1])*u+7;
  const L=78+46*Math.sin(t*.31+1.1), sw=.07*Math.sin(t*1.25)+.02*Math.sin(t*2.9);
  const hx=px+Math.sin(sw)*L, hy=py+Math.cos(sw)*L;
  ctx.save();ctx.globalCompositeOperation='source-over';
  ctx.fillStyle='rgba(40,22,10,.95)';ctx.fillRect(px-7,py-5,14,6);
  ctx.strokeStyle='rgba(28,18,12,.9)';ctx.lineWidth=1.1;
  ctx.beginPath();ctx.moveTo(px-2.5,py);ctx.lineTo(hx-1.5,hy);ctx.moveTo(px+2.5,py);ctx.lineTo(hx+1.5,hy);ctx.stroke();
  ctx.fillStyle='rgba(255,190,70,.9)';ctx.beginPath();ctx.arc(hx,hy+2,2.6,0,Math.PI*2);ctx.fill();
  // slings + beam
  ctx.translate(hx,hy+4);ctx.rotate(sw*1.6);
  ctx.strokeStyle='rgba(30,18,10,.8)';ctx.lineWidth=.9;
  ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-26,15);ctx.moveTo(0,0);ctx.lineTo(26,15);ctx.stroke();
  const bg=ctx.createLinearGradient(0,14,0,22);bg.addColorStop(0,'#f2a14a');bg.addColorStop(.5,'#8a4a1c');bg.addColorStop(1,'#2a1408');
  ctx.fillStyle=bg;ctx.fillRect(-34,14,68,9);
  ctx.fillStyle='rgba(255,220,150,.55)';ctx.fillRect(-34,14,68,1.6);
  ctx.restore();
  ctx.globalCompositeOperation='lighter';
  glow(px,py-2,9,'255,170,60',.55+.25*Math.sin(t*6));
  const ap=(t%1.6)<.18?1:.15; glow(APEX[0],APEX[1],14,'255,40,30',ap*.9);
  JIB_LAMPS.forEach((p,i)=>{const a=.25+.35*Math.max(0,Math.sin(t*2.2+i*1.7));glow(p[0],p[1],10,'255,200,110',a);});
}

function drawWelding(t,dt){
  ctx.globalCompositeOperation='lighter';
  WELD.forEach(w=>{
    w.t-=dt; if(w.t<=0){w.on=!w.on;w.t=w.on?rand(.7,1.9):rand(.5,2.2);}
    if(!w.on)return;
    const fl=Math.random();
    glow(w.x,w.y,80+fl*30,'255,140,50',.18+fl*.12);
    glow(w.x,w.y,22+fl*14,'210,230,255',.85+fl*.15);glow(w.x,w.y,6,'255,255,255',1);
    if(fl>.4)star(w.x,w.y,14+fl*18,.85,'235,245,255');
    const n=Math.round(dt*rand(180,320));
    for(let i=0;i<n;i++)sparks.push({x:w.x,y:w.y,vx:rand(-140,140),vy:rand(-170,30),l:0,m:rand(.35,.95)});
  });
  for(let i=sparks.length-1;i>=0;i--){
    const s=sparks[i]; s.l+=dt; if(s.l>s.m){sparks.splice(i,1);continue;}
    s.vy+=560*dt; s.vx*=.985; s.x+=s.vx*dt; s.y+=s.vy*dt;
    const k=1-s.l/s.m, r=255, g=Math.round(150+105*k), b=Math.round(40+200*k*k);
    ctx.strokeStyle=`rgba(${r},${g},${b},${.25+.75*k})`; ctx.lineWidth=1.8;
    ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x-s.vx*.022,s.y-s.vy*.022);ctx.stroke();
  }
}

function drawTruck(t,dt){
  ctx.globalCompositeOperation='lighter';
  // spinning wheels: lug-nut glints travel round each rim + a motion-blur arc
  WHEELS.forEach((w,wi)=>{
    const th=t*8.5+wi;
    for(let k=0;k<6;k++){
      const ph=th+k*Math.PI/3, c=Math.cos(ph), sn=Math.sin(ph);
      const a=.35+.65*Math.max(0,-c*.6+sn*.4);
      ctx.fillStyle=`rgba(210,232,255,${a})`;
      ctx.beginPath();ctx.ellipse(w.x+c*w.rx*.55,w.y+sn*w.ry*.55,Math.max(1.4,w.rx*.13),Math.max(1.8,w.ry*.09),0,0,Math.PI*2);ctx.fill();
    }
    ctx.strokeStyle='rgba(170,215,255,.5)';ctx.lineWidth=Math.max(1.5,w.rx*.16);
    ctx.beginPath();ctx.ellipse(w.x,w.y,w.rx*.86,w.ry*.86,0,th%(Math.PI*2),th%(Math.PI*2)+1.1);ctx.stroke();
  });
  // headlights: steady pulse + periodic high-beam double flash
  const cyc=t%5.2, hb=(cyc<.12||(cyc>.26&&cyc<.38))?1:0;
  HEAD.forEach(([x,y,k],i)=>{
    const p=.55+.25*Math.sin(t*5+i);
    glow(x,y,(30+8*p)*k,'150,205,255',.55*p*k);
    if(hb){glow(x,y,110*k,'190,225,255',.55*k);star(x,y,46*k,.75,'225,240,255');}
  });
  // roof marker chase
  ROOF.forEach(([x,y],i)=>{const a=.25+.75*Math.pow(Math.max(0,Math.sin(t*4-i*.55)),6);glow(x,y,9,'255,170,60',a);});
  // road streaks sliding under the truck (motion)
  if(Math.random()<dt*9)streaks.push({x:rand(1150,1260),y:rand(652,700),v:rand(700,1100),len:rand(50,140),c:Math.random()<.5?'255,170,70':'110,180,255'});
  for(let i=streaks.length-1;i>=0;i--){
    const s=streaks[i]; s.x-=s.v*dt; if(s.x<640){streaks.splice(i,1);continue;}
    const a=.22*Math.min(1,(s.x-640)/200);
    const g=ctx.createLinearGradient(s.x,0,s.x+s.len,0);g.addColorStop(0,`rgba(${s.c},${a})`);g.addColorStop(1,`rgba(${s.c},0)`);
    ctx.strokeStyle=g;ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x+s.len,s.y+s.len*.04);ctx.stroke();
  }
}

function drawMedia(t,dt){
  ctx.globalCompositeOperation='lighter';
  glow(1420,567,130,'120,90,255',.08+.06*Math.sin(t*1.7));
  nextFlash-=dt;
  if(nextFlash<=0){
    const p=MEDIA[Math.floor(Math.random()*MEDIA.length)];
    flashes.push({x:p[0],y:p[1],l:0});
    if(Math.random()<.3)flashes.push({x:p[0],y:p[1],l:-.13});
    nextFlash=rand(.18,.8);
  }
  for(let i=flashes.length-1;i>=0;i--){
    const f=flashes[i]; f.l+=dt; if(f.l<0)continue; if(f.l>.32){flashes.splice(i,1);continue;}
    const k=Math.pow(1-f.l/.32,2.2);
    glow(f.x,f.y,190,'230,235,255',.45*k);
    glow(f.x,f.y,22,'255,255,255',.95*k);
    star(f.x,f.y,48*k+8,.95*k,'255,255,255');glow(f.x,f.y,60,'255,255,255',.6*k);
  }
}

function drawGlobe(t,dt){
  ctx.globalCompositeOperation='lighter';
  const br=.5+.5*Math.sin(t*2.05);
  ctx.save();ctx.beginPath();ctx.arc(G.cx,G.cy,G.r+16,0,Math.PI*2);ctx.arc(G.cx,G.cy,G.r-26,0,Math.PI*2,true);ctx.clip();
  glow(G.cx,G.cy,G.r+18,'70,160,255',.10+.10*br);ctx.restore();
  if(twinkles.length<16&&Math.random()<dt*10){const a=rand(0,Math.PI*2),d=Math.sqrt(Math.random())*(G.r-30);
    twinkles.push({x:G.cx+Math.cos(a)*d,y:G.cy+Math.sin(a)*d*.95,l:0,m:rand(.6,1.4)});}
  for(let i=twinkles.length-1;i>=0;i--){const s=twinkles[i];s.l+=dt;if(s.l>s.m){twinkles.splice(i,1);continue;}
    const k=Math.sin(Math.PI*s.l/s.m);glow(s.x,s.y,7,'255,210,120',.8*k);star(s.x,s.y,8*k,.6*k,'255,235,190');}
  // satellite glint on an orbit around the globe
  for(let j=0;j<2;j++){
    const ang=t*(j?.42:.31)+j*2.4, rx=j?380:345, ry=j?118:96, rot=j?.22:-.2;
    const ex=Math.cos(ang)*rx, ey=Math.sin(ang)*ry, x=G.cx+ex*Math.cos(rot)-ey*Math.sin(rot), y=G.cy-20+ex*Math.sin(rot)+ey*Math.cos(rot);
    if(Math.sin(ang)<-.15&&Math.hypot(x-G.cx,y-G.cy)<G.r)continue; // behind the globe
    glow(x,y,16,j?'120,200,255':'255,200,110',.75);star(x,y,9,.7,'255,245,220');
  }
}

let last=performance.now(), running=false, fxOn=false;
function visible(){
  if(document.hidden)return false;
  const r=home.getBoundingClientRect(); if(r.width<2||r.height<2)return false;
  const cs=getComputedStyle(section); if(cs.display==='none'||cs.visibility==='hidden'||parseFloat(cs.opacity)<.05)return false;
  return true;
}
function frame(now){
  const dt=Math.min(.05,(now-last)/1000); last=now; const t=now/1000;
  if(visible()){
    ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,fx.width,fx.height);
    ctx.setTransform(dpr*scale,0,0,dpr*scale,0,0);
    drawGlobe(t,dt);drawCrane(t);drawWelding(t,dt);drawTruck(t,dt);drawMedia(t,dt);
  }
  requestAnimationFrame(frame);
}
function startFx(){if(fxOn||reduced)return;fxOn=true;fx.classList.add('on');if(!running){running=true;requestAnimationFrame(t=>{last=t;frame(t)});}}

/* subtle depth: the whole scene leans a few pixels with the mouse */
let mx=0,my=0,cx=0,cy=0;
if(!reduced&&window.matchMedia('(pointer:fine)').matches){
  home.addEventListener('mousemove',e=>{const r=home.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5;},{passive:true});
  home.addEventListener('mouseleave',()=>{mx=0;my=0;});
  (function lean(){cx+=(mx-cx)*.06;cy+=(my-cy)*.06;
    stage.style.transform=`translate(-50%,-50%) translate(${(-cx*12).toFixed(2)}px,${(-cy*7).toFixed(2)}px)`;
    requestAnimationFrame(lean);})();
}

/* =========================== CINEMATIC INTRO =========================== */
function sectionActive(){const cs=getComputedStyle(section);return cs.display!=='none'&&cs.visibility!=='hidden'&&(section.classList.contains('is-active')||parseFloat(cs.opacity)>.5);}

function runIntro(){
  const hr=home.getBoundingClientRect(), sr=stage.getBoundingClientRect();
  const s=sr.width/AW, ox=sr.left-hr.left, oy=sr.top-hr.top, W=hr.width, H=hr.height;
  const anims=[], sceneAnims=[]; const A=(el,kf,o)=>{const a=el.animate(kf,Object.assign({fill:'both'},o));(el===cam||el===art?sceneAnims:anims).push(a);return a;};
  const intro=document.createElement('div');intro.className='wf-intro';intro.setAttribute('aria-hidden','true');
  intro.innerHTML='<div class="wf-intro-bg"></div><canvas class="wf-intro-stars"></canvas><div class="wf-intro-rings"><i></i><i></i><i></i></div><div class="wf-intro-globe"></div><div class="wf-intro-word">WAYFORTH<small>BUILD · MOVE · CREATE</small></div><div class="wf-intro-flash"></div><button class="wf-intro-skip" type="button">SKIP INTRO</button>';
  home.appendChild(intro);
  const bg=intro.querySelector('.wf-intro-bg'), sc=intro.querySelector('.wf-intro-stars'), rings=intro.querySelector('.wf-intro-rings'),
        globe=intro.querySelector('.wf-intro-globe'), word=intro.querySelector('.wf-intro-word'), flash=intro.querySelector('.wf-intro-flash');

  // globe: an exact crop of the artwork's globe, so it lands on the real one pixel-perfect
  const RC=300, gd=2*RC*s, gl=ox+(G.cx-RC)*s, gt=oy+(G.cy-RC)*s;
  Object.assign(globe.style,{left:gl+'px',top:gt+'px',width:gd+'px',height:gd+'px',
    backgroundImage:`url("${ART_URL}")`,backgroundSize:`${AW*s}px ${AH*s}px`,backgroundPosition:`${-(G.cx-RC)*s}px ${-(G.cy-RC)*s}px`,
    WebkitMaskImage:'radial-gradient(circle closest-side,#000 86%,rgba(0,0,0,.6) 92%,transparent 99%)',
    maskImage:'radial-gradient(circle closest-side,#000 86%,rgba(0,0,0,.6) 92%,transparent 99%)'});
  const m=Math.min(W,H), dx=W/2-(gl+gd/2), dy=H*.46-(gt+gd/2), k0=.30*m/gd, k1=.70*m/gd;
  word.style.top=(H*.46+.37*m)+'px';
  rings.style.top=(H*.46)+'px';
  [...rings.children].forEach((r,i)=>{const d=m*(.86+i*.17);Object.assign(r.style,{width:d+'px',height:d+'px',left:-d/2+'px',top:-d/2+'px'});});

  // stars that wheel around the centre = the camera orbiting the globe
  const st=sc.getContext('2d'), sd=Math.min(window.devicePixelRatio||1,1.5); sc.width=W*sd; sc.height=H*sd;
  const stars=[...Array(420)].map(()=>({a:rand(0,Math.PI*2),d:Math.sqrt(Math.random())*Math.hypot(W,H)*.6,z:rand(.3,1),tw:rand(0,6)}));
  const t0=performance.now(); let alive=true;
  (function drawStars(now){ if(!alive)return; const e=(now-t0)/1000;
    const rot=-1.25*(1-Math.exp(-e*1.1)), zoom=1+e*.12;
    st.setTransform(sd,0,0,sd,0,0);st.clearRect(0,0,W,H);
    stars.forEach(p=>{const a=p.a+rot*p.z, d=p.d*zoom; const x=W/2+Math.cos(a)*d, y=H*.46+Math.sin(a)*d*.8;
      const al=(.35+.65*Math.abs(Math.sin(e*2+p.tw)))*p.z; st.fillStyle=`rgba(${p.z>.8?'255,226,170':'190,215,255'},${al})`;
      st.fillRect(x,y,1.6*p.z,1.6*p.z);
      if(e<1.6){st.strokeStyle=`rgba(170,205,255,${al*.35})`;st.lineWidth=p.z;st.beginPath();st.moveTo(x,y);
        const a2=a-.05*p.z*(1.6-e);st.lineTo(W/2+Math.cos(a2)*d,H*.46+Math.sin(a2)*d*.8);st.stroke();}
    });
    requestAnimationFrame(drawStars);})(t0);

  const E1='cubic-bezier(.22,.8,.18,1)', E2='cubic-bezier(.65,0,.2,1)', E3='cubic-bezier(.16,.84,.24,1)';
  // 0.0 – 1.9s : globe appears and the camera revolves around it
  A(globe,[{opacity:0,transform:`translate(${dx}px,${dy}px) scale(${k0*.7}) rotate(-150deg)`,filter:'brightness(.6) saturate(1.2)'},
           {opacity:1,offset:.25,transform:`translate(${dx}px,${dy}px) scale(${k0}) rotate(-105deg)`,filter:'brightness(1.1) saturate(1.2)'},
           {opacity:1,transform:`translate(${dx}px,${dy}px) scale(${k1}) rotate(0deg)`,filter:'brightness(1.15) saturate(1.1)'}],{duration:1900,easing:E2});
  A(rings,[{transform:'rotateX(68deg) rotateZ(0deg) scale(.6)',opacity:0},{offset:.2,opacity:1},{offset:.8,opacity:1},{transform:'rotateX(74deg) rotateZ(250deg) scale(1.15)',opacity:0}],{duration:2200,easing:'cubic-bezier(.3,.1,.3,1)'});
  [...rings.children].forEach((r,i)=>A(r,[{transform:`rotateY(${[0,38,-30][i]}deg) rotateZ(0deg)`},{transform:`rotateY(${[0,38,-30][i]+[40,-60,70][i]}deg) rotateZ(${[180,-240,300][i]}deg)`}],{duration:2200,easing:'linear'}));
  A(word,[{opacity:0,letterSpacing:'.3em',filter:'blur(6px)'},{opacity:1,offset:.45,letterSpacing:'.9em',filter:'blur(0)'},{opacity:1,offset:.75},{opacity:0,letterSpacing:'1.2em'}],{delay:450,duration:1500,easing:'ease-out'});
  // 1.9 – 3.2s : camera pulls back, the globe settles exactly into the scene
  A(globe,[{transform:`translate(${dx}px,${dy}px) scale(${k1}) rotate(0deg)`},{transform:'translate(0,0) scale(1) rotate(0deg)'}],{delay:1900,duration:1300,easing:E3,fill:'forwards'});
  A(globe,[{opacity:1},{opacity:1,offset:.75},{opacity:0}],{delay:1900,duration:1650,easing:'linear',fill:'forwards'});
  A(flash,[{opacity:0},{opacity:.85,offset:.25},{opacity:0}],{delay:1850,duration:700});
  A(bg,[{opacity:1},{opacity:0}],{delay:1950,duration:900,easing:'ease-in-out'});
  A(sc,[{opacity:1},{opacity:0}],{delay:2050,duration:900});
  A(cam,[{transform:'scale(1.7)'},{transform:'scale(1)'}],{delay:1900,duration:1500,easing:E3});
  A(art,[{filter:'blur(14px) brightness(.3) saturate(1.3)'},{filter:'blur(0px) brightness(1) saturate(1)'}],{delay:1900,duration:1500,easing:'ease-out'});
  art.style.webkitMaskImage=art.style.maskImage='linear-gradient(to bottom,#000 69%,transparent 72.5%)';
  // the three worlds fly into place
  const mk=(clip)=>{const d=document.createElement('div');d.className='wf-slice';d.style.backgroundImage=`url("${ART_URL}")`;d.style.clipPath=clip;cam.insertBefore(d,fx);return d;};
  const msk=(d,m)=>{d.style.clipPath='none';d.style.webkitMaskImage=d.style.maskImage=m;return d;};
  const build=msk(mk(''),'linear-gradient(90deg,#000 0%,#000 31%,transparent 36.5%)');
  const truck=msk(mk(''),'radial-gradient(ellipse 15% 17% at 48% 58%,#000 62%,transparent 100%)');
  const media=msk(mk(''),'linear-gradient(90deg,transparent 61%,#000 66.5%,#000 100%)');
  const band=mk('inset(71% 0 0 0)');
  A(build,[{opacity:0,transform:'perspective(1200px) translateX(-34%) rotateY(32deg) scale(1.08)'},{opacity:1,offset:.35},{opacity:1,transform:'perspective(1200px) translateX(0) rotateY(0) scale(1)'}],{delay:2050,duration:1350,easing:E3});
  A(media,[{opacity:0,transform:'perspective(1200px) translateX(34%) rotateY(-32deg) scale(1.08)'},{opacity:1,offset:.35},{opacity:1,transform:'perspective(1200px) translateX(0) rotateY(0) scale(1)'}],{delay:2150,duration:1350,easing:E3});
  A(truck,[{opacity:0,transform:'translateY(26%) scale(1.25)',filter:'brightness(2)'},{opacity:1,offset:.3},{opacity:1,transform:'translateY(0) scale(1)',filter:'brightness(1)'}],{delay:2300,duration:1200,easing:E3});
  A(band,[{opacity:0,clipPath:'inset(71% 50% 0 50%)',transform:'translateY(3%)'},{opacity:1,offset:.2},{opacity:1,clipPath:'inset(71% 0% 0 0%)',transform:'translateY(0)'}],{delay:3050,duration:900,easing:E3});

  let done=false;
  function finish(){ if(done)return; done=true;
    anims.concat(sceneAnims).forEach(a=>{try{a.finish()}catch(e){}});
    art.style.webkitMaskImage=art.style.maskImage='';
    sceneAnims.forEach(a=>{try{a.cancel()}catch(e){}});
    [build,truck,media,band].forEach(n=>n.remove());
    intro.style.pointerEvents='none';
    intro.animate([{opacity:1},{opacity:0}],{duration:300,fill:'forwards'}).onfinish=()=>{alive=false;intro.remove();};
    startFx();
    home.querySelectorAll('.wf-home-card').forEach((c,i)=>setTimeout(()=>{c.classList.add('wf-sweep');setTimeout(()=>c.classList.remove('wf-sweep'),1100);},120+i*160));
  }
  setTimeout(finish,4050);
  setTimeout(startFx,3200);
  intro.addEventListener('click',finish);
  window.addEventListener('keydown',finish,{once:true});
  window.addEventListener('wheel',finish,{once:true,passive:true});
}

function boot(){
  if(reduced||!sectionActive()){startFx();return;}
  runIntro();
}
function whenReady(cb){
  const go=()=>{ if(art.complete&&art.naturalWidth) (art.decode?art.decode().catch(()=>{}):Promise.resolve()).then(cb); else art.addEventListener('load',()=>cb(),{once:true}); };
  if(document.body.classList.contains('ready'))return go();
  const mo=new MutationObserver(()=>{if(document.body.classList.contains('ready')){mo.disconnect();go();}});
  mo.observe(document.body,{attributes:true,attributeFilter:['class']});
  setTimeout(()=>{mo.disconnect(); if(!document.body.classList.contains('ready')){document.body.classList.add('ready');const b=document.getElementById('boot');if(b)b.style.display='none';} go();},3500);
}
let started=false; whenReady(()=>{if(started)return;started=true;boot();});
})();
