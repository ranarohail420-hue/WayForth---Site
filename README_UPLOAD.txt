WAYFORTH V5.18 — BUILD UPDATE

This bundle updates the native Build page and required local assets.

WHAT CHANGED
- Cart material names are larger and easier to distinguish.
- Every unit selector uses Custom as its final option; legacy Load values are normalized to Custom.
- A dismissible notice explains that the consulting and accounts team confirms custom units and measurement details.
- Commercial projects display a separate wholesale / bulk-order discount notice, while using the same six approved materials as Residential.
- The Build hero image blends more smoothly into the dark copy area to reduce the visible blurred/dark side seam.
- The materials screen navigation button is labelled “← Home Page” and returns to the main Home scene.

HOW TO APPLY
1. Extract the ZIP and upload its contents to the ROOT of the existing WAYFORTH GitHub repository, replacing matching files.
2. Keep existing index.html, app.js, styles.css and scenes-data.js. Do not delete them.
3. Keep the Vercel Build Command set to: node patch-wayforth.js
4. Commit using this exact message:
WAYFORTH V5.18 — Cart Clarity, Custom Units, Wholesale Notice & Hero Blend Fix
5. Wait for Vercel to deploy, then test Home → Build → Residential → Materials & Cart and Home → Build → Commercial.

This is an update bundle for the existing repository, not a standalone full-site export.
