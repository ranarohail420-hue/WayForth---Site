/* WAYFORTH V53 — production build.
   Publishes ONLY the live pages and the files they actually use, so old files left in the
   repository from earlier versions can never appear on the website.
   Also adds a strict Content-Security-Policy (with exact hashes of our own scripts) to every page. */
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const root = process.cwd(), dist = path.join(root, 'dist');
const VERSION = 'V53.1';
const PAGES = ['index.html', 'wayforth-build-v5.html', 'wayforth-trucking-v22.html', 'wayforth-media.html', 'privacy.html', '404.html'];
const SHARED = ['wf-header.css', 'wf-guide.js'];
const ALWAYS = ['favicon.ico'];
const ASSET_RE = /([A-Za-z0-9_\-./]+\.(?:webp|png|jpe?g|gif|svg|ico|css|js|mp4|webm|woff2?|txt))/g;

const CSP = hashes => [
  "default-src 'self'",
  `script-src 'self' ${hashes.join(' ')}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://vpic.nhtsa.dot.gov",
  "frame-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests'
].join('; ');

function inlineScriptHashes(html) {
  const out = [];
  html.replace(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi, (_, body) => {
    out.push(`'sha256-${crypto.createHash('sha256').update(body, 'utf8').digest('base64')}'`);
  });
  return [...new Set(out)];
}
function addCsp(html) {
  const meta = `<meta http-equiv="Content-Security-Policy" content="${CSP(inlineScriptHashes(html))}">`;
  return html.replace(/<meta charset="utf-8">/i, m => m + '\n' + meta);
}
function copyFile(rel) {
  const src = path.join(root, rel), dst = path.join(dist, rel);
  fs.mkdirSync(path.dirname(dst), {recursive: true});
  fs.copyFileSync(src, dst);
}

try {
  for (const f of [...PAGES, ...SHARED, ...ALWAYS])
    if (!fs.existsSync(path.join(root, f))) throw Error('Missing ' + f + ' at the repository root.');

  // collect every local file the live pages reference
  const files = new Set([...SHARED, ...ALWAYS]);
  files.delete('robots.txt');
  for (const f of [...PAGES, ...SHARED]) {
    const text = fs.readFileSync(path.join(root, f), 'utf8');
    for (const m of text.matchAll(ASSET_RE)) {
      const rel = m[1].replace(/^\.?\//, '');
      if (!rel.includes('..') && fs.existsSync(path.join(root, rel)) && fs.statSync(path.join(root, rel)).isFile()) files.add(rel);
    }
  }
  for (const f of ['patch-wayforth.js', 'vercel.json']) files.delete(f);

  fs.rmSync(dist, {recursive: true, force: true});
  fs.mkdirSync(dist, {recursive: true});
  for (const f of files) copyFile(f);
  // small text files are written by the build itself (hidden folders like .well-known are often skipped on upload)
  fs.writeFileSync(path.join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\nDisallow: /api/\n');
  fs.mkdirSync(path.join(dist, '.well-known'), {recursive: true});
  fs.writeFileSync(path.join(dist, '.well-known', 'security.txt'), 'Contact: mailto:info@wayforth.ltd\nExpires: 2027-11-03T00:00:00.000Z\nPreferred-Languages: en\n');
  for (const f of PAGES) {
    const html = fs.readFileSync(path.join(root, f), 'utf8');
    fs.writeFileSync(path.join(dist, f), addCsp(html));
  }
  console.log(`WAYFORTH ${VERSION} build OK — ${PAGES.length} pages + ${files.size} files published (old repository files are not published).`);
} catch (e) {
  console.error(`WAYFORTH ${VERSION}:`, e.message);
  process.exitCode = 1;
}
