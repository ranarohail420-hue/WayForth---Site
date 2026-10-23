/* WAYFORTH V5.12 — BUILD hero framing and alternating category-card motion; all other approved assets and transitions preserved. */
'use strict';
const fs=require('fs'),path=require('path');const root=process.cwd(),dist=path.join(root,'dist');
const file=(n)=>path.join(dist,n);const exists=(n)=>fs.existsSync(file(n));
const skip=new Set(['dist','.git','node_modules','.vercel','.github','tests']);
function copy(src,dst){fs.mkdirSync(dst,{recursive:true});for(const e of fs.readdirSync(src,{withFileTypes:true})){if(skip.has(e.name)||e.name.startsWith('.'))continue;let s=path.join(src,e.name),d=path.join(dst,e.name);if(e.isDirectory())copy(s,d);else if(e.isFile()&&/\.(html?|css|js|json|webp|png|jpe?g|gif|svg|ico|txt|woff2?|ttf|mp4|webm|xml)$/i.test(e.name))fs.copyFileSync(s,d)}}
function read(n){return fs.readFileSync(file(n),'utf8')}function write(n,s){fs.writeFileSync(file(n),s)}
try{
copy(root,dist);
if(!exists('index.html')||!exists('app.js')||!exists('scenes-data.js'))throw Error('Missing original index.html, app.js or scenes-data.js at GitHub root. Keep those existing files.');
let html=read('index.html');
const original=/<section\s+id=["']scene-home["'][^>]*>[\s\S]*?<\/section>/i;
if(!original.test(html))throw Error('HOME scene not found. Wrong repository version.');
if(!exists('wf-home-approved.webp'))throw Error('Missing wf-home-approved.webp');
html=html.replace(original,`<section id="scene-home" class="scene scene-home is-active" data-scene="home" aria-label="WAYFORTH Home"><div class="wf-final-home"><img class="wf-final-art" src="wf-home-approved.webp" alt="WAYFORTH home" fetchpriority="high"><div id="home-globe" class="wf-final-globe" aria-hidden="true"></div><button class="wf-hotspot wf-top-hotspot wf-top-home" data-open="home" aria-label="Home"></button><button class="wf-hotspot wf-top-hotspot wf-top-build" data-open="build" aria-label="Build"></button><button class="wf-hotspot wf-top-hotspot wf-top-trucking" data-open="trucking" aria-label="Trucking"></button><button class="wf-hotspot wf-top-hotspot wf-top-media" data-open="media" aria-label="Media"></button><button class="wf-hotspot wf-top-hotspot wf-top-contact" data-aux="contact" aria-label="Contact Us"></button><button class="wf-hotspot wf-top-hotspot wf-top-about" data-aux="about" aria-label="About Us"></button><button class="wf-hotspot wf-top-hotspot wf-top-support" data-aux="support" aria-label="Support"></button><button class="wf-hotspot wf-home-build" data-open="build" aria-label="Build"></button><button class="wf-hotspot wf-home-trucking" data-open="trucking" aria-label="Trucking"></button><button class="wf-hotspot wf-home-media" data-open="media" aria-label="Media"></button><button class="wf-hotspot wf-home-quote" data-open="quote" aria-label="Quote"></button><div class="wf-mobile-controls"><button data-open="build">BUILD</button><button data-open="trucking">TRUCKING</button><button data-open="media">MEDIA</button><button data-open="quote">GET A QUOTE</button></div></div></section>`);
html=html.replace(/WAYFORTH MEDIA × DIGITAL DYNASTY/gi,'WAYFORTH MEDIA').replace(/Choose the part of Digital Dynasty you need\. The studio stays in the scene while the service layer changes around it\./g,'Explore WAYFORTH Media services.').replace(/DIGITAL DYNASTY/gi,'WAYFORTH MEDIA').replace(/<a\s+href=["']https:\/\/digitaldynasty\.media["'][^>]*>[\s\S]*?<\/a>/gi,'').replace(/<img\s+src=["']world-dd\.webp["']\s+alt=["']Digital Dynasty studio["']\s*\/?>/gi,'<img src="wf-media-approved.webp" alt="WAYFORTH Media">');
const nav=/<nav\b[^>]*class=["']desktop-nav["'][^>]*>[\s\S]*?<\/nav>/i;
if(nav.test(html))html=html.replace(nav,`<nav class="desktop-nav" aria-label="Primary"><button data-open="home" class="nav-link">Home</button><button data-open="build" class="nav-link">Build</button><button data-open="trucking" class="nav-link">Trucking</button><button data-open="media" class="nav-link">Media</button><button data-aux="contact" class="nav-link">Contact Us</button><button data-aux="about" class="nav-link">About Us</button><button data-aux="support" class="nav-link">Support</button></nav>`);

/* Remove every historical/current motion import before adding exactly one stable pair. */
html=html.replace(/<link\b[^>]*href=["'][^"']*(?:wf-v48-motion|wf-v50-motion|wf-v51-fix|wf-cinematic|wf-globe-zoomout|wf-stable-motion)[^"']*["'][^>]*>/gi,'')
         .replace(/<script\b[^>]*src=["'][^"']*(?:wf-v48-motion|wf-v50-motion|wf-v51-fix|wf-cinematic|wf-globe-zoomout|wf-stable-motion)[^"']*["'][^>]*><\/script>/gi,'')
         .replace(/<script[^>]*>\s*document\.documentElement\.classList\.add\(['"]wf-v55-boot['"]\);?\s*<\/script>/gi,'');

/* Mark the page before first paint. CSS then starts the landing reveal exactly when body.ready appears. */
html=html.replace(/<\/head>/i,`<script>document.documentElement.classList.add('wf-v55-boot');</script><link rel="stylesheet" href="wf-approved-home.css"><link rel="stylesheet" href="wf-stable-motion.css"><link rel="preload" href="wf-home-approved.webp" as="image"></head>`);
html=html.replace(/<\/body>/i,'<script defer src="wf-stable-motion.js"></script></body>');
if(exists('wayforth-extra.css'))html=html.replace(/<\/head>/i,'<link rel="stylesheet" href="wayforth-extra.css"></head>');
if(exists('wayforth-extra.js'))html=html.replace(/<\/body>/i,'<div class="wf-aux-overlay" role="dialog" aria-modal="true"><div class="wf-aux-content"><h2 data-aux-title></h2><p data-aux-description></p><button data-aux-quote>Get a Quote</button><button data-aux-close>Close</button></div></div><script defer src="wayforth-extra.js"></script></body>');
write('index.html',html);

/* BUILD: re-use original materials/cart payload unchanged inside project selector. */
let data=read('scenes-data.js');let page=fs.existsSync(path.join(root,'wayforth-build-v5.html'))?fs.readFileSync(path.join(root,'wayforth-build-v5.html'),'utf8'):'';
if(page.includes('__LEGACY_BUILD_BASE64__')){let m=data.match(/(\bbuild\s*:\s*['"])([A-Za-z0-9+/=]+)(['"])/);if(m){let next=Buffer.from(page.replace('__LEGACY_BUILD_BASE64__',m[2]),'utf8').toString('base64');data=data.replace(m[0],m[1]+next+m[3]);write('scenes-data.js',data)}}
console.log('WAYFORTH V5.12 build OK —',fs.readdirSync(dist).length,'files. BUILD hero now shows the full construction image; Residential/Commercial cards pulse and lift alternately. Existing Home, navigation, quote flow, and transitions preserved.');
}catch(e){console.error('WAYFORTH V5.9:',e.stack||e);process.exitCode=1}
