/* WAYFORTH V37 — full-screen cinematic Home; V26 — electric route, road-car headlight and Ship-a-Car border alignment; approved BUILD preserved. */
'use strict';
const fs=require('fs'),path=require('path');const root=process.cwd(),dist=path.join(root,'dist');
const file=(n)=>path.join(dist,n);const exists=(n)=>fs.existsSync(file(n));
const skip=new Set(['dist','api','.git','node_modules','.vercel','.github','tests']);
function copy(src,dst){fs.mkdirSync(dst,{recursive:true});for(const e of fs.readdirSync(src,{withFileTypes:true})){if(skip.has(e.name)||e.name.startsWith('.'))continue;let s=path.join(src,e.name),d=path.join(dst,e.name);if(e.isDirectory())copy(s,d);else if(e.isFile()&&/\.(html?|css|js|json|webp|png|jpe?g|gif|svg|ico|txt|woff2?|ttf|mp4|webm|xml)$/i.test(e.name))fs.copyFileSync(s,d)}}
function read(n){return fs.readFileSync(file(n),'utf8')}function write(n,s){fs.writeFileSync(file(n),s)}
try{
copy(root,dist);
if(!exists('index.html')||!exists('app.js')||!exists('scenes-data.js'))throw Error('Missing original index.html, app.js or scenes-data.js at GitHub root. Keep those existing files.');
let html=read('index.html');
const original=/<section\s+id=["']scene-home["'][^>]*>[\s\S]*?<\/section>/i;
if(!original.test(html))throw Error('HOME scene not found. Wrong repository version.');
if(!exists('wf-home-wide.webp'))throw Error('Missing wf-home-wide.webp');
html=html.replace(original,`<section id="scene-home" class="scene scene-home is-active" data-scene="home" aria-label="WAYFORTH Home"><div class="wf-final-home"><div class="wf-home-stage"><div class="wf-home-cam"><img class="wf-final-art" src="wf-home-wide.webp?v=37" alt="WAYFORTH — Build, Trucking and Media" fetchpriority="high" width="1960" height="941"><button class="wf-hotspot wf-top-hotspot wf-top-logo" data-open="home" aria-label="WAYFORTH Home"></button><button class="wf-hotspot wf-top-hotspot wf-top-home" data-open="home" aria-label="Home"></button><button class="wf-hotspot wf-top-hotspot wf-top-build" data-open="build" aria-label="Build"></button><button class="wf-hotspot wf-top-hotspot wf-top-trucking" data-open="trucking" aria-label="Trucking"></button><button class="wf-hotspot wf-top-hotspot wf-top-media" data-open="media" aria-label="Media"></button><button class="wf-hotspot wf-top-hotspot wf-top-contact" data-aux="contact" aria-label="Contact Us"></button><button class="wf-hotspot wf-top-hotspot wf-top-about" data-aux="about" aria-label="About Us"></button><button class="wf-hotspot wf-top-hotspot wf-top-support" data-aux="support" aria-label="Support"></button><button class="wf-hotspot wf-home-card wf-home-build" data-open="build" aria-label="Build"></button><button class="wf-hotspot wf-home-card wf-home-trucking" data-open="trucking" aria-label="Trucking"></button><button class="wf-hotspot wf-home-card wf-home-media" data-open="media" aria-label="Media"></button><button class="wf-hotspot wf-home-quote" data-open="quote" aria-label="Get a Quote"></button></div></div><div class="wf-mobile-controls"><button data-open="build">BUILD</button><button data-open="trucking">TRUCKING</button><button data-open="media">MEDIA</button><button data-open="quote">GET A QUOTE</button></div></div></section>`);
html=html.replace(/WAYFORTH MEDIA × DIGITAL DYNASTY/gi,'WAYFORTH MEDIA').replace(/Choose the part of Digital Dynasty you need\. The studio stays in the scene while the service layer changes around it\./g,'Explore WAYFORTH Media services.').replace(/DIGITAL DYNASTY/gi,'WAYFORTH MEDIA').replace(/<a\s+href=["']https:\/\/digitaldynasty\.media["'][^>]*>[\s\S]*?<\/a>/gi,'').replace(/<img\s+src=["']world-dd\.webp["']\s+alt=["']Digital Dynasty studio["']\s*\/?>/gi,'<img src="wf-media-approved.webp" alt="WAYFORTH Media">');
const nav=/<nav\b[^>]*class=["']desktop-nav["'][^>]*>[\s\S]*?<\/nav>/i;
if(nav.test(html))html=html.replace(nav,`<nav class="desktop-nav" aria-label="Primary"><button data-open="home" class="nav-link">Home</button><button data-open="build" class="nav-link">Build</button><button data-open="trucking" class="nav-link">Trucking</button><button data-open="media" class="nav-link">Media</button><button data-aux="contact" class="nav-link">Contact Us</button><button data-aux="about" class="nav-link">About Us</button><button data-aux="support" class="nav-link">Support</button></nav>`);

/* Remove every historical/current motion import before adding exactly one stable pair. */
html=html.replace(/<link\b[^>]*href=["'][^"']*(?:wf-v48-motion|wf-v50-motion|wf-v51-fix|wf-cinematic|wf-globe-zoomout|wf-stable-motion)[^"']*["'][^>]*>/gi,'')
         .replace(/<script\b[^>]*src=["'][^"']*(?:wf-v48-motion|wf-v50-motion|wf-v51-fix|wf-cinematic|wf-globe-zoomout|wf-stable-motion)[^"']*["'][^>]*><\/script>/gi,'')
         .replace(/<script[^>]*>\s*document\.documentElement\.classList\.add\(['"]wf-v55-boot['"]\);?\s*<\/script>/gi,'');

/* Mark the page before first paint. CSS then starts the landing reveal exactly when body.ready appears. */
html=html.replace(/<\/head>/i,`<script>document.documentElement.classList.add('wf-v55-boot');</script><link rel="stylesheet" href="wf-approved-home.css?v=37"><link rel="stylesheet" href="wf-stable-motion.css?v=37"><link rel="preload" href="wf-home-wide.webp?v=37" as="image"></head>`);
html=html.replace(/<\/body>/i,'<script defer src="wf-stable-motion.js?v=37"></script></body>');
if(exists('wayforth-extra.css'))html=html.replace(/<\/head>/i,'<link rel="stylesheet" href="wayforth-extra.css"></head>');
if(exists('wayforth-extra.js'))html=html.replace(/<\/body>/i,'<div class="wf-aux-overlay" role="dialog" aria-modal="true"><div class="wf-aux-content"><h2 data-aux-title></h2><p data-aux-description></p><button data-aux-quote>Get a Quote</button><button data-aux-close>Close</button></div></div><script defer src="wayforth-extra.js"></script></body>');
write('index.html',html);

/* BUILD: replace the old embedded materials scene with the complete current native Build page. */
let data=read('scenes-data.js');let page=fs.existsSync(path.join(root,'wayforth-build-v5.html'))?fs.readFileSync(path.join(root,'wayforth-build-v5.html'),'utf8'):'';
if(!page)throw Error('Missing wayforth-build-v5.html.');
const buildEntry=data.match(/(\bbuild\s*:\s*['"])([A-Za-z0-9+/=]+)(['"])/);
if(!buildEntry)throw Error('BUILD scene entry not found in scenes-data.js.');
const nextBuild=Buffer.from(page,'utf8').toString('base64');
data=data.replace(buildEntry[0],buildEntry[1]+nextBuild+buildEntry[3]);

/* TRUCKING V22: restored animated landing + modern service choices; existing service forms preserved. */
const truckingPage=fs.existsSync(path.join(root,'wayforth-trucking-v22.html'))?fs.readFileSync(path.join(root,'wayforth-trucking-v22.html'),'utf8'):'';
if(!truckingPage)throw Error('Missing wayforth-trucking-v22.html.');
const truckingEntry=data.match(/(\btrucking\s*:\s*['"])([A-Za-z0-9+/=]+)(['"])/);
if(!truckingEntry)throw Error('TRUCKING scene entry not found in scenes-data.js.');
const nextTrucking=Buffer.from(truckingPage,'utf8').toString('base64');
data=data.replace(truckingEntry[0],truckingEntry[1]+nextTrucking+truckingEntry[3]);
write('scenes-data.js',data);
console.log('WAYFORTH V37 build OK —',fs.readdirSync(dist).length,'files. Approved BUILD preserved; electric route, road-car headlight alignment, blue map pulses, Ship-a-Car border and existing forms.');
}catch(e){console.error('WAYFORTH V22:',e.stack||e);process.exitCode=1}
