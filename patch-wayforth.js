/*
 WAYFORTH V4.3 deployment adapter.
 Keeps the current GitHub website intact. At Vercel build time, creates /dist,
 replaces only the embedded BUILD page and updates the HOME nav labels.
 Existing trucking, media, quote, globe animation, and images remain untouched.
*/
'use strict';
const fs=require('fs');
const path=require('path');
const root=process.cwd(),dist=path.join(root,'dist');
const copyExtensions=new Set(['.html','.htm','.css','.js','.webp','.png','.jpg','.jpeg','.gif','.svg','.ico','.json','.txt','.webmanifest','.woff','.woff2','.ttf','.mp4','.webm','.xml']);
const skip=new Set(['dist','.git','node_modules','.vercel','tests','.github']);
function copyAll(from,to){fs.mkdirSync(to,{recursive:true});for(const ent of fs.readdirSync(from,{withFileTypes:true})){
  if(skip.has(ent.name)||ent.name.startsWith('.'))continue;
  const inPath=path.join(from,ent.name),outPath=path.join(to,ent.name);
  if(ent.isDirectory())copyAll(inPath,outPath);
  else if(copyExtensions.has(path.extname(ent.name).toLowerCase()))fs.copyFileSync(inPath,outPath);
}}
copyAll(root,dist);
const indexPath=path.join(dist,'index.html'),dataPath=path.join(dist,'scenes-data.js');
if(!fs.existsSync(indexPath)||!fs.existsSync(dataPath))throw new Error('Expected current WAYFORTH single-app index.html + scenes-data.js in GitHub root. No changes deployed.');
let data=fs.readFileSync(dataPath,'utf8');
const match=data.match(/(\bbuild\s*:\s*['"])([A-Za-z0-9+/=]+)(['"])/);
if(!match)throw new Error('Cannot find original BUILD scene. Refusing to discard existing materials/cart.');
const legacy=match[2];
let buildPage=fs.readFileSync(path.join(root,'wayforth-build-v5.html'),'utf8');
if(!buildPage.includes('__LEGACY_BUILD_BASE64__'))throw new Error('BUILD preservation marker missing');
buildPage=buildPage.replace('__LEGACY_BUILD_BASE64__',legacy);
const replacement=Buffer.from(buildPage,'utf8').toString('base64');
data=data.replace(match[0],match[1]+replacement+match[3]);
fs.writeFileSync(dataPath,data);
let index=fs.readFileSync(indexPath,'utf8');
const nav=index.match(/<nav\b[^>]*class="desktop-nav"[^>]*>[\s\S]*?<\/nav>/i);
if(!nav)throw new Error('Primary nav not found in current WAYFORTH homepage.');
const newNav=`<nav class="desktop-nav" aria-label="Primary">
<button data-open="home" class="nav-link">Home</button>
<button data-open="build" class="nav-link">Build</button>
<button data-open="trucking" class="nav-link">Trucking</button>
<button data-open="media" class="nav-link">Digital Media</button>
<button data-aux="contacts" class="nav-link" type="button">Contacts</button>
<button data-aux="about" class="nav-link" type="button">About Us</button>
</nav>`;
index=index.replace(nav[0],newNav);
index=index.replace('</head>','<link rel="stylesheet" href="wayforth-extra.css">\n</head>');
index=index.replace('</body>',`<div class="wf-aux-overlay" role="dialog" aria-modal="true" aria-label="WAYFORTH information"><div class="wf-aux-content"><h2 data-aux-title></h2><p data-aux-description></p><button type="button" data-aux-quote>Get a Quote</button><button type="button" data-aux-close>Close</button></div></div>\n<script src="wayforth-extra.js"></script>\n</body>`);
fs.writeFileSync(indexPath,index);

// V4.5: Replace the entire previous HOME composition, instead of layering over it.
// This removes the old duplicate cranes, background truck, DD logo and duplicated card text.
const homeSection=/<section\s+id="scene-home"[^>]*>[\s\S]*?<\/section>/i;
if(!homeSection.test(index))throw new Error('HOME scene missing: not deploying a mismatched patch');
const approvedHome=`<section id="scene-home" class="scene scene-home is-active" data-scene="home" aria-label="WAYFORTH Home">
  <div class="wf-final-home">
    <img class="wf-final-art" src="wf-home-approved.webp" alt="WAYFORTH: construction, hauling, media, globe and skyline" draggable="false" fetchpriority="high">
    <div id="home-globe" class="wf-final-globe" aria-hidden="true"><img src="globe-opening.webp" alt=""></div>
    <button class="wf-hotspot wf-home-build" data-open="build" aria-label="Open WAYFORTH Build"></button>
    <button class="wf-hotspot wf-home-trucking" data-open="trucking" aria-label="Open WAYFORTH Trucking"></button>
    <button class="wf-hotspot wf-home-media" data-open="media" aria-label="Open WAYFORTH Media"></button>
    <button class="wf-hotspot wf-home-quote" data-open="quote" aria-label="Get a quote"></button>
    <div class="wf-mobile-controls" aria-label="Explore WAYFORTH">
      <button data-open="build">BUILD</button><button data-open="trucking">TRUCKING</button><button data-open="media">MEDIA</button><button data-open="quote">GET A QUOTE</button>
    </div>
  </div>
</section>`;
index=index.replace(homeSection,approvedHome);
// HOME is one approved image: no separately composited scenery, labels or branding.
// Use this artwork on all desktop widths; mobile gets responsive usable navigation.
index=index.replace(/<\/head>/i,'<link rel="preload" as="image" href="wf-home-approved.webp"><link rel="stylesheet" href="wf-approved-home.css">\n</head>');
// Remove every historical Digital Dynasty mention and external redirect from Media.
index=index.replace(/WAYFORTH MEDIA × DIGITAL DYNASTY/g,'WAYFORTH MEDIA');
index=index.replace(/Choose the part of Digital Dynasty you need\. The studio stays in the scene while the service layer changes around it\./g,'Explore WAYFORTH Media services. Select a service to see how we can help.');
index=index.replace(/aria-label="Digital Dynasty services"/g,'aria-label="WAYFORTH Media services"');
index=index.replace(/<a href="https:\/\/digitaldynasty\.media"[^>]*>DIGITAL DYNASTY ↗<\/a>/g,'');
index=index.replace(/<img src="world-dd\.webp" alt="Digital Dynasty studio">/g,'<img src="wf-media-approved.webp" alt="WAYFORTH Media studio">');
index=index.replace(/DIGITAL DYNASTY/gi,'WAYFORTH MEDIA');
fs.writeFileSync(indexPath,index);

// Conservative iPhone/desktop transition reliability fixes: eliminate expensive animated filters,
// don't allow the portal to block pointer events, and finalize scenes on animation failure.
const appPath=path.join(dist,'app.js');
let app=fs.readFileSync(appPath,'utf8');
app=app.replace("{transform:'scale(1)',opacity:1,filter:'brightness(1)'},", "{transform:'scale(1)',opacity:1},");
app=app.replace("{transform:'scale(1.022)',opacity:.92,filter:'brightness(.92)'},", "{transform:'scale(1.012)',opacity:.94},");
app=app.replace("{transform:'scale(1.035)',opacity:.28,filter:'brightness(.72)'}", "{transform:'scale(1.018)',opacity:.40}");
app=app.replace("],{duration:860,easing:'cubic-bezier(.36,.02,.12,1)',fill:'forwards'});", "],{duration:620,easing:'cubic-bezier(.36,.02,.12,1)',fill:'forwards'});");
app=app.replace("],{duration:900,easing:'cubic-bezier(.22,.74,.16,1)',fill:'forwards'});", "],{duration:650,easing:'cubic-bezier(.22,.74,.16,1)',fill:'forwards'});");
app=app.replace("],{duration:850,easing:'ease-in-out',fill:'forwards'});", "],{duration:620,easing:'ease-in-out',fill:'forwards'});");
// Avoid an indefinite wait if Safari loses the animation's finished event.
app=app.replace("await reveal.finished.catch(()=>{});", "await Promise.race([reveal.finished.catch(()=>{}),new Promise(resolve=>setTimeout(resolve,900))]);");
fs.writeFileSync(appPath,app);

if(!index.includes('Digital Media')||!data.includes(replacement.slice(0,100)))throw new Error('Patch validation failed');
console.log('WAYFORTH V4.5: approved clean home image, clickable divisions, WayForth-only media; preserves Build/Trucking workflows.');
console.log('Published static assets:',fs.readdirSync(dist).length);
