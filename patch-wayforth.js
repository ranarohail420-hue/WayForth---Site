/* WAYFORTH V38 — standalone site build.
   The new index.html (Three Worlds home) is complete on its own, so the build simply copies the site into dist/.
   Older files in the repository (app.js, styles.css, scenes-data.js, ...) are no longer used and can stay. */
'use strict';
const fs=require('fs'),path=require('path');
const root=process.cwd(),dist=path.join(root,'dist');
const skip=new Set(['dist','api','.git','node_modules','.vercel','.github','tests']);
function copy(src,dst){fs.mkdirSync(dst,{recursive:true});
  for(const e of fs.readdirSync(src,{withFileTypes:true})){
    if(skip.has(e.name)||e.name.startsWith('.'))continue;
    const s=path.join(src,e.name),d=path.join(dst,e.name);
    if(e.isDirectory())copy(s,d);
    else if(e.isFile()&&/\.(html?|css|js|json|webp|png|jpe?g|gif|svg|ico|txt|woff2?|ttf|mp4|webm|xml)$/i.test(e.name))fs.copyFileSync(s,d);
  }}
try{
  for(const f of ['index.html','wayforth-build-v5.html','wayforth-trucking-v22.html','wayforth-media.html','wf-home-scene-hd.webp','wf-actual-logo-decal.png'])
    if(!fs.existsSync(path.join(root,f)))throw Error('Missing '+f+' at the repository root.');
  fs.rmSync(dist,{recursive:true,force:true});
  copy(root,dist);
  console.log('WAYFORTH V45 build OK —',fs.readdirSync(dist).length,'files.');
}catch(e){console.error('WAYFORTH V45:',e.message);process.exitCode=1}
