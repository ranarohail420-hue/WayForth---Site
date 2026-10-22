WAYFORTH V4.5.1 — VERCEL BUILD RECOVERY
=======================================
WHY
The prior V4.5 deployment ran "node patch-wayforth.js" and terminated with code 1. This revision changes the assembler to preserve the existing site and tolerate optional markers/assets rather than fail the whole deployment. It keeps the approved WayForth-only home artwork and preserves the existing embedded BUILD/TRUCKING sections.

UPLOAD
1. Extract this ZIP. Upload ALL FILES INSIDE the ZIP to the ROOT of your existing GitHub repository "WayForth---Site". Replace matching files, especially patch-wayforth.js and vercel.json. Do not upload ZIP as a single file.
2. IMPORTANT: keep all existing index.html, app.js, styles.css, scenes-data.js and the older assets in GitHub. Do not delete them: this update assembles the existing site into the dist folder.
3. Commit: WAYFORTH V4.5.1 — Fix Vercel Build Failure
4. Vercel should redeploy automatically. If Project Settings > Build & Output Settings has a manually overridden Build Command, make it "node patch-wayforth.js" and Output Directory "dist" (or use the repo vercel.json). Framework = Other.
5. In Vercel Build Logs expect "WAYFORTH V4.5.1 build complete".
6. Check homepage, BUILD, materials/cart, TRUCKING, MEDIA, and going BACK HOME on desktop and iPhone.

VERIFIED HERE
The script passes node --check; a representative local fixture assembled successfully and rebuilt a second time with the same result. Actual Vercel production behavior and iPhone layout remain to be verified by a new deployment.

NOTE
The homepage artwork is one image, so animation on the individual crane, truck and cameras is not implemented in this patch. The scene transition remains the existing single-app transition.
