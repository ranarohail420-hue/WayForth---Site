WAYFORTH V5.3 STABLE DEPLOY FIX
Upload every file in this folder to the ROOT of the existing GitHub repository; REPLACE same names.
KEEP existing index.html, styles.css, app.js, scenes-data.js, brand-logo.webp, globe-opening.webp, plus existing assets. These are required by the build adapter.
Vercel should use repository root; vercel.json executes patch-wayforth.js and publishes dist.
Deployment test: Home / Build / Home / Trucking / Home / Media.
This package removes accumulated historical motion imports at build time and adds one controlled stable layer.
