WAYFORTH V5.5 — LANDING / GLOBE / CRANE / CEMENT LOGO CORRECTION

Upload every file in this ZIP to the ROOT of the existing GitHub repository and REPLACE matching files.
KEEP your existing root index.html, styles.css, app.js, scenes-data.js, brand-logo.webp, globe-opening.webp and other original site assets.
Vercel should continue using the repository root; vercel.json runs patch-wayforth.js and publishes dist.

CORRECTIONS IN V5.5:
1. Landing animation now runs ONCE as the homepage is first revealed. The V5.4 overlay that caused the visible second load/glitch is removed.
2. Cement mixer WF decal is transparent gold/yellow only — no dark blue box — and is repositioned/enlarged on the mixer drum.
3. Globe pulse is re-centered on the actual baked globe with only a slight upward offset. Hard pulse circles/rings are removed; the globe now breathes with a blended glow and fades before the truck area.
4. Fake moving crane sign/load is removed. Only a restrained thin cable sway/extension remains.
5. BUILD welding starts immediately and repeats with a natural double-flash rhythm.
6. MEDIA flashes start immediately at multiple studio positions.
7. Main truck lights retain a low beam and briefly rise to high beam, rather than switching fully off.
8. Home return uses only a short settle; the full first-load animation never replays.
9. Motion effects stay locked to the exact object-fit:contain artwork rectangle on different desktop aspect ratios.

DEPLOYMENT CHECK:
- Hard refresh once after Vercel deploy.
- The first load should show ONE continuous center/globe reveal — no second dark reload.
- Globe pulse should be centered higher on the globe and should not appear as a separate outlined circle.
- Cement mixer should show a gold/yellow WF with no rectangular background.
- Crane should have no moving rectangular sign/load.
- Watch BUILD welding, MEDIA flashes, and truck dipper/high-low cycle for 8–10 seconds.

Suggested commit message:
WAYFORTH V5.5 — Landing Globe Crane and Cement Logo Fix
