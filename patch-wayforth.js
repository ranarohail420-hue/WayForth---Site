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
if(!index.includes('Digital Media')||!data.includes(replacement.slice(0,100)))throw new Error('Patch validation failed');
console.log('WAYFORTH V4.3 ready: preserved prior site, updated nav and embedded interactive BUILD project chooser with 8 pulsing options.');
console.log('Published static assets:',fs.readdirSync(dist).length);
