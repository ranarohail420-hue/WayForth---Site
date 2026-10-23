WAYFORTH V5.12 — BUILD HERO FRAMING & ALTERNATING CATEGORY MOTION

This is a minimal update to the approved WAYFORTH V5.11 package. It changes only the BUILD hero image framing and the Residential/Commercial card motion.

CHANGES
1. The top-right BUILD hero now uses build-commercial-hero-wide.webp, a wide version of the same approved construction image that keeps the complete building visible instead of cropping/zooming into the center. The original build-commercial-scene.webp remains unchanged for the Commercial card.
2. The Residential and Commercial cards now have a clearer glow pulse and gentle vertical lift. Their timing is offset by half a cycle so the two cards draw attention alternately. The motion remains disabled for visitors who request reduced motion.

PRESERVED
- Approved Home artwork and landing animation assets
- Navigation and transitions
- Trucking and Media assets
- BUILD text, benefit badges, welding flashes, residential plot sizes, commercial quote form, and materials/cart flow

HOW TO APPLY
1. Extract the ZIP.
2. Upload its website/update files to the root of the existing GitHub repository.
3. Replace matching files only; do not delete any existing repository files.
4. Keep index.html, app.js, styles.css, and scenes-data.js in place. The patch script uses the existing files to rebuild dist.
5. Commit using the message in START_HERE_FIRST.txt and wait for Vercel to deploy.

The package does not include a full replacement for the repository's core application files. It is intended to be applied to the same working repository/version used for V5.11.


V5.14 BUILD MODERNIZATION
-------------------------
- Replaced the top hero with the cleaner uncropped construction image treatment (removed side poster/blurry band effect).
- Repositioned and reduced welding flashes so they stay inside the structure and feel more like welding sparks.
- Refined Residential and Commercial image cropping for a cleaner card presentation.
- Strengthened alternating Residential / Commercial pulse motion.
- Reset the Residential materials cart each time it opens so previous selections do not remain loaded.
