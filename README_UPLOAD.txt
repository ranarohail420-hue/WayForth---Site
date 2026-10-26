WAYFORTH V27 — CURRENT UPDATE
=============================

Use START_HERE_V27.txt for the current trucking corrections and exact commit name.

Commit name:
WAYFORTH V27 — True Headlight Flashes & Build-Style Ship-a-Car Pulse

V27 fixes:
- Road-car flash effects now sit on the visible headlights of both background cars.
- Ship a Car uses the Build-style category pulse rhythm while keeping the highlight border fixed to the card edges.
- The Ship a Car click area matches the corrected card bounds.
- Electric route animation, blue/cyan map pulses, approved artwork, quote forms, and email-routing assets are preserved.

Deployment remains an update to the existing GitHub/Vercel repository; keep index.html, app.js, styles.css and scenes-data.js. Vercel Build Command: node patch-wayforth.js.

----------------------------------------------------------------

WAYFORTH V5.19 — CUSTOMER-FRIENDLY BUILD QUOTE FLOW

This update keeps the approved Build design and replaces the large informational boxes with cleaner, customer-led guidance.

WHAT CHANGED
- Removed the large custom-unit information box from the top of the materials screen.
- Custom unit guidance now appears quietly beside the unit selector only when a customer chooses Custom.
- Removed the separate commercial discount banner so the page feels like a quote experience, not a list of rules.
- Rewrote the Commercial introduction in customer-friendly language: customers choose materials and quantities, and WAYFORTH prepares a tailored quote while reviewing available wholesale pricing.
- Rewrote the Residential introduction to focus on the customer's selected plot size and quote.
- Kept the approved six materials, product images, quote cart, existing navigation, and approved page design unchanged.

HOW TO APPLY
1. Extract the ZIP and upload its contents to the ROOT of the existing WAYFORTH GitHub repository, replacing matching files.
2. Keep existing index.html, app.js, styles.css and scenes-data.js. Do not delete them.
3. Keep the Vercel Build Command set to: node patch-wayforth.js
4. Commit using this exact message:
WAYFORTH V5.19 — Customer-Friendly Build Quote Flow & Clean Materials UX
5. Wait for Vercel to deploy, then test Home → Build → Residential → Materials & Cart and Home → Build → Commercial.

This is an update bundle for the existing repository, not a standalone full-site export. No live Vercel deployment has been performed from this package.


V5.20 — FINAL BUILD BRANDING POLISH
------------------------------------
- Removed the redundant large Residential/Commercial Materials & Quote Cart title from the sticky materials header.
- Added the approved WAYFORTH / RAW MATERIALS logo lockup to the materials header and made it clickable to Home.
- Kept the smaller project-status line (Residential plot / Commercial bulk order quote).
- Highlighted the words Residential and Commercial in the main materials heading using the WAYFORTH gold brand color.
- No approved cart, material catalog, pricing copy, project flow, images, or Home/Trucking/Media behavior was changed.

V21 TRUCKING UPDATE
-------------------
Adds wayforth-trucking-v21.html, four trucking service forms, car/boat service imagery, and /api/trucking-inquiry.js for configurable Vercel email routing. See START_HERE_V21.txt.


V22 TRUCKING LANDING UPDATE
- Clean integrated WAYFORTH Trucking logo
- Original hero energy restored with subtle map/headlight animation
- Wheel/trackpad scroll fix
- Customer promise strip moved near top
- Modern alternating service-card pulse
- Existing V21 forms/email endpoint preserved

V23 TRUCKING ANIMATION PASS
---------------------------
Use START_HERE_V23.txt for the latest trucking notes. V23 preserves the existing forms/email endpoint and focuses on the approved landing layout and motion.
