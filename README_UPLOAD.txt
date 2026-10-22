WAYFORTH V5.6 — FINAL LIGHT & CEMENT LOGO ALIGNMENT

Upload every file in this ZIP to the ROOT of the existing GitHub repository and REPLACE matching files.
KEEP your existing root index.html, styles.css, app.js, scenes-data.js, brand-logo.webp, globe-opening.webp and other original site assets.
Vercel should continue using the repository root; vercel.json runs patch-wayforth.js and publishes dist.

ONLY CHANGES FROM V5.5:
1. Main truck high/low-beam flashes are aligned to the four real front light positions (two upper headlights + two lower/fog lights).
2. Small warm flashes are aligned along the existing crane boom lamps marked in the approved screenshot. Existing crane cable motion is otherwise unchanged.
3. The transparent yellow/gold WF decal is moved to the visual center of the cement mixer drum. Its color and artwork are unchanged.
4. NO changes to the landing animation, globe pulse, BUILD welding, MEDIA flashes, navigation, transitions, artwork, or other V5.5 behavior.

DEPLOYMENT CHECK:
- Hard refresh once after Vercel deploy.
- Confirm the landing animation and globe behave exactly like V5.5.
- Watch the front truck: flashes should sit directly on all four real front lamps.
- Watch the crane boom: the existing warm lamp points should twinkle in place; no moving sign/load is added.
- Cement mixer: gold/yellow WF should be centered on the drum.

Suggested commit message:
WAYFORTH V5.6 — Final Home Light and Mixer Logo Alignment
