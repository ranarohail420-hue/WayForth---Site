# WAYFORTH V4 — Single App Architecture

This version changes the underlying architecture instead of adding another cross-page transition.

## What changed
- HOME, BUILD, TRUCKING, MEDIA and QUOTE live in one persistent app.
- Clicking a division does not load another HTML document.
- The destination scene is already mounted before the tap.
- The globe is a persistent transition object and the destination is revealed through an expanding globe-centered mask.
- Browser history still exposes /build, /trucking, /media and /quote through Vercel rewrites.
- The homepage uses the richer sky/road visual direction requested from the latest reference image.
- Build materials and Trucking forms work inside the same app.
- Media is intentionally a gateway scene; full Digital Dynasty content is the next design phase.
- Quote is intentionally easy to revise in the next quote-list phase.

## GitHub / Vercel
Upload every file and the `assets` folder to the root of the existing WAYFORTH repository.
Vercel will redeploy automatically.

Recommended commit:
`WAYFORTH V4 — Single App Globe Transition Architecture`

## Domain structure recommendation
- `wayforth.ltd` -> production branch
- `staging.wayforth.ltd` -> staging branch while the experience is still being tuned
