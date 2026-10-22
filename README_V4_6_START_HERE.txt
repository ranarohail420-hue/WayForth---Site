WAYFORTH V4.6 — CINEMATIC OPENING + ORBITAL NAVIGATION POLISH
=============================================================

This package is an incremental upgrade for your existing GitHub repository.
It is NOT an independent website. Do NOT delete the existing index.html,
app.js, styles.css, scenes-data.js, and other existing assets.

What changes in V4.6
---------------------
1. Approved static HOME image stays the same: no extra crane/truck/logo duplicates.
2. New entrance animation: close-on-globe camera pulls back to full artwork;
   layered warm/blue illumination wakes up BUILD / TRUCKING / MEDIA in phases.
3. Continual subtle effects aligned to the full artwork: construction welds,
   truck headlight glow, and studio strobes. Does NOT clone photos of buildings.
4. Existing SPA globe page transition gains light-tunnel rings / radial beams;
   navigation itself and the destination screens are unchanged.
5. No new external dependencies and no blank-screen loader.
6. Existing responsive and reduced-motion settings respected.

How to deploy
-------------
1. Extract ZIP. Select its files (not the enclosing folder).
2. In GitHub's WayForth---Site repository: Add file > Upload files.
3. Replace matching filenames at the repository root. Keep all existing
   index.html, app.js, styles.css, and scenes-data.js files.
4. Commit: "WAYFORTH V4.6 — Cinematic Home Intro + Orbital Motion"
5. Vercel will build using the included patch-wayforth.js. If Vercel has
   an old build-command override, it should be "node patch-wayforth.js";
   Output Directory should be "dist". vercel.json is included.
6. Refresh the site in a new tab or hard refresh and check HOME, then tap
   BUILD and HOME; next TRUCKING and HOME; then MEDIA and HOME.

Testing and known limits
------------------------
The entrace motion/portal overlay is implementation-level verified via script
checks and a local browser smoke test, not verified on your specific phone.
As the approved HOME artwork is one flattened picture, this version simulates
living lights and camera movement; the crane cannot rotate independently and
truck wheels cannot truly turn until separate transparent source layers exist.

Do not upload the ZIP itself to the GitHub file uploader; unzip first.
