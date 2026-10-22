WAYFORTH V4.5.2 — APPROVED HOME + BUILD + VERCEL BUILD REPAIR
==========================================================
PURPOSE:
The production V4.5 deployment failed on `node patch-wayforth.js`.
This version replaces that script with a syntax-checked, locally exercised assembler.
It keeps your EXISTING website's index.html, app.js, styles.css, scenes-data.js,
assets, and Trucking functionality; it updates the deployed dist/ copies only.

DEPLOY TO THE EXISTING REPOSITORY:
1. Extract this ZIP.
2. Upload ALL files inside this ZIP into the root of your existing
   ranarohail420-hue/WayForth---Site GitHub repository.
3. REPLACE matching files when asked. Do not erase existing website source files.
4. Commit: WAYFORTH V4.5.2 — Approved Home and Vercel Build Repair
5. Vercel should run node patch-wayforth.js and publish dist/.
6. Check the Vercel Build Logs for "WAYFORTH: Deployment output ready".

WHAT IT CHANGES:
- A single image-backed, approved WayForth-only home scene (no overlaid old
  construction or Digital Dynasty artwork), with clickable division hotspots.
- WAYFORTH MEDIA content and branding (no Digital Dynasty redirect).
- Home navigation labels (Home/Build/Trucking/Digital Media/Contacts/About Us).
- BUILD project selection cards plus original materials/cart within the existing
  embedded single-app setup.
- Bound an indefinite animation wait with a safe timeout on Safari.

WHAT IT DOES NOT DO:
- It does not modify your original index.html or app.js in GitHub source: it
  patches only the dist/ copies during deployment.
- It does not guarantee the animation renders the same on an iPhone or desktop;
  check the live Vercel site after deploy.
- The homepage uses an approved composite image; independent crane/truck motion
  is not included in this revision.

IMPORTANT:
This ZIP is an update overlay, NOT a fresh standalone copy of your entire repo.
It must be uploaded on TOP OF the source files that already exist in your repo.
Do NOT set Vercel Output Directory to something other than dist if using this config.
