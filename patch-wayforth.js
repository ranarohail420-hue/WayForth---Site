'use strict';
/* WAYFORTH V4.6 — reliable non-destructive Vercel deployment adapter.
 * Reads ORIGINAL GitHub website files, builds dist/, and modifies ONLY the copy.
 * A missing optional update never fails deployment; core files are validated.
 */
const fs=require('fs'), path=require('path');
const root=process.cwd(), output=path.join(root,'dist');
const isFile=p=>fs.existsSync(p)&&fs.statSync(p).isFile();
const text=p=>isFile(p)?fs.readFileSync(p,'utf8'):'';
function copy(src,dst){
 const ignore=new Set(['dist','.git','node_modules','.vercel','.github','tests']);
 fs.mkdirSync(dst,{recursive:true});
 for(const ent of fs.readdirSync(src,{withFileTypes:true})){
   if(ignore.has(ent.name)||ent.name.startsWith('.'))continue;
   const s=path.join(src,ent.name),d=path.join(dst,ent.name);
   if(ent.isDirectory())copy(s,d);
   else if(ent.isFile() && /\.(html?|css|js|json|webp|png|jpe?g|gif|svg|ico|txt|woff2?|ttf|mp4|webm|xml|webmanifest)$/i.test(ent.name))fs.copyFileSync(s,d);
 }
}
function log(s){console.log('WAYFORTH:',s)}
function warn(s){console.warn('WAYFORTH NOTICE:',s)}
try {
 copy(root,output);
 const htmlPath=path.join(output,'index.html');
 if(!isFile(htmlPath)){
  console.error('WAYFORTH: index.html is missing at the root. Upload the complete website, including the existing index.html.');
  process.exitCode=1;
 } else {
 let html=text(htmlPath);
 const img='wf-home-approved.webp';
 const homeRe=/<section\s+id=["']scene-home["'][^>]*>[\s\S]*?<\/section>/i;
 if(isFile(path.join(output,img))&&homeRe.test(html)){
  const replacement=`<section id="scene-home" class="scene scene-home is-active" data-scene="home" aria-label="WAYFORTH Home">
   <div class="wf-final-home">
     <img class="wf-final-art" src="wf-home-approved.webp" alt="WAYFORTH: Move. Build. Create." draggable="false" fetchpriority="high">
     <div id="home-globe" class="wf-final-globe" aria-hidden="true"><img src="globe-opening.webp" alt=""></div>
     <button class="wf-hotspot wf-home-build" type="button" data-open="build" aria-label="Explore WAYFORTH Build"></button>
     <button class="wf-hotspot wf-home-trucking" type="button" data-open="trucking" aria-label="Explore WAYFORTH Trucking"></button>
     <button class="wf-hotspot wf-home-media" type="button" data-open="media" aria-label="Explore WAYFORTH Media"></button>
     <button class="wf-hotspot wf-home-quote" type="button" data-open="quote" aria-label="Get a quote"></button>
     <div class="wf-mobile-controls" aria-label="Explore WAYFORTH">
       <button type="button" data-open="build">BUILD</button>
       <button type="button" data-open="trucking">TRUCKING</button>
       <button type="button" data-open="media">MEDIA</button>
       <button type="button" data-open="quote">GET A QUOTE</button>
     </div>
   </div>
  </section>`;
  html=html.replace(homeRe,replacement);
  if(!html.includes('wf-approved-home.css'))html=html.replace(/<\/head>/i,'<link rel="stylesheet" href="wf-approved-home.css"><link rel="preload" as="image" href="wf-home-approved.webp"></head>');
  log('Approved home artwork installed; old cranes, truck overlay and DD art removed from homepage');
 }else warn('Approved home artwork or scene missing; retaining existing homepage');
 // The brand is WAYFORTH only, including the full Media scene.
 html=html.replace(/WAYFORTH MEDIA × DIGITAL DYNASTY/gi,'WAYFORTH MEDIA')
 .replace(/Choose the part of Digital Dynasty you need\. The studio stays in the scene while the service layer changes around it\./g,'Explore WAYFORTH Media services.')
 .replace(/aria-label=["']Digital Dynasty services["']/gi,'aria-label="WAYFORTH Media services"')
 .replace(/<a\s+href=["']https:\/\/digitaldynasty\.media["'][^>]*>[\s\S]*?<\/a>/gi,'')
 .replace(/<img\s+src=["']world-dd\.webp["']\s+alt=["']Digital Dynasty studio["']\s*\/?>/gi,'<img src="wf-media-approved.webp" alt="WAYFORTH Media studio">')
 .replace(/DIGITAL DYNASTY/gi,'WAYFORTH MEDIA');
 // EXACT menu names requested for this stage.
 const nav=/<nav\b[^>]*class=["']desktop-nav["'][^>]*>[\s\S]*?<\/nav>/i;
 if(nav.test(html))html=html.replace(nav,`<nav class="desktop-nav" aria-label="Primary">
  <button data-open="home" class="nav-link">Home</button>
  <button data-open="build" class="nav-link">Build</button>
  <button data-open="trucking" class="nav-link">Trucking</button>
  <button data-open="media" class="nav-link">Digital Media</button>
  <button type="button" data-aux="contacts" class="nav-link">Contacts</button>
  <button type="button" data-aux="about" class="nav-link">About Us</button>
 </nav>`);
 if(isFile(path.join(output,'wayforth-extra.css'))&&!html.includes('wayforth-extra.css')) html=html.replace(/<\/head>/i,'<link rel="stylesheet" href="wayforth-extra.css"></head>');
 if(isFile(path.join(output,'wayforth-extra.js'))&&!html.includes('wayforth-extra.js'))html=html.replace(/<\/body>/i,'<div class="wf-aux-overlay" role="dialog" aria-modal="true" aria-label="WAYFORTH information"><div class="wf-aux-content"><h2 data-aux-title></h2><p data-aux-description></p><button type="button" data-aux-quote>Get a Quote</button><button type="button" data-aux-close>Close</button></div></div><script src="wayforth-extra.js"></script></body>');
 // V4.6 cinema polish: add the CSS/JS after the approved scene is installed.
 // Both files are optional; a missing extra can never break the live site.
 if(isFile(path.join(output,'wf-cinematic.css')) && !html.includes('wf-cinematic.css'))
   html=html.replace(/<\/head>/i,'<link rel="stylesheet" href="wf-cinematic.css"></head>');
 if(isFile(path.join(output,'wf-cinematic.js')) && !html.includes('wf-cinematic.js'))
   html=html.replace(/<\/body>/i,'<script defer src="wf-cinematic.js"></script></body>');
 fs.writeFileSync(htmlPath,html);
 // Legacy BUILD remains intact underneath the redesigned project selector.
 const dataPath=path.join(output,'scenes-data.js'),base=text(dataPath),build=text(path.join(root,'wayforth-build-v5.html'));
 if(base&&build&&build.includes('__LEGACY_BUILD_BASE64__')){
  const match=base.match(/(\bbuild\s*:\s*['"])([A-Za-z0-9+/=]+)(['"])/);
  if(match){const page=build.replace('__LEGACY_BUILD_BASE64__',match[2]);const encoded=Buffer.from(page,'utf8').toString('base64');fs.writeFileSync(dataPath,base.replace(match[0],match[1]+encoded+match[3]));log('BUILD project selector installed and original materials/cart retained');}
  else warn('BUILD scene marker not found: existing BUILD preserved');
 }else warn('No legacy BUILD marker: existing BUILD retained');
 // Avoid an indefinite hung transition on Safari without changing its look.
 const appPath=path.join(output,'app.js'),app=text(appPath);
 if(app){fs.writeFileSync(appPath,app.replace("await reveal.finished.catch(()=>{});","await Promise.race([reveal.finished.catch(()=>{}),new Promise(done=>setTimeout(done,1200))]);"));}
 log('Deployment output ready: '+fs.readdirSync(output).length+' root files');
 }
} catch(e){console.error('WAYFORTH BUILD ERROR:',e.stack||e.message);process.exitCode=1;}
