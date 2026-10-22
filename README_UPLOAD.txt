WAYFORTH V5.4 — FINAL HOMEPAGE MOTION REFINEMENT

Upload every file in this folder to the ROOT of the existing GitHub repository and REPLACE files with the same names.
KEEP the existing root index.html, styles.css, app.js, scenes-data.js, brand-logo.webp, globe-opening.webp and other existing assets.
Vercel should use repository root; vercel.json runs patch-wayforth.js and publishes dist.

V5.4 homepage fixes only:
1. Restores the landing-page reveal using the approved homepage artwork.
2. Restores the WF decal on the BUILD-side cement mixer cab.
3. Restores a visible globe pulse and moves the pulse slightly upward/reduces its expansion so it does not grow across the main truck.
4. Restores restrained crane cable/hook movement.
5. BUILD welding starts immediately and repeats more frequently.
6. MEDIA camera/studio flashes start immediately and repeat more frequently.
7. Main truck headlights use a low-beam/high-beam dipper cycle rather than disappearing/blinking.
8. Home re-entry motion is a short settle to reduce the stuck/snap feeling.

No new homepage artwork and no second animation framework were added. wf-stable-motion.js + wf-stable-motion.css remain the one controlled motion layer.

Recommended verification after Vercel deploy:
- Hard refresh once.
- Check initial landing animation.
- Watch the globe for 5 seconds.
- Watch BUILD side for welding and crane cable movement.
- Check the cement mixer cab for the WF decal.
- Watch the main truck headlights for low/high beam cycling.
- Watch MEDIA for multiple camera flashes.
- Test Home -> BUILD -> Home -> Trucking -> Home -> Media -> Home.
