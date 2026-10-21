WAYFORTH V4.4 — BUILD PROJECT CHOOSER + NAVIGATION + PULSE

Upload ALL files INSIDE this ZIP to the ROOT of the existing repository:
  ranarohail420-hue / WayForth---Site
Do not delete or replace the existing index.html, app.js, styles.css,
scenes-data.js, Trucking or Media files.

Commit message:
  WAYFORTH V4.4 — BUILD Project Options + Navigation + Pulse

How it works:
- vercel.json runs a small build script automatically when Vercel deploys.
- patch-wayforth.js COPIES existing site files into dist/ and changes only
  the header navigation and the embedded BUILD screen in that deployment.
- Home, Trucking, Media, Quote and globe transition code are preserved.
- In BUILD, eight responsive clickable Residential/Commercial cards pulse
  gently, with reduced-motion support.
- Clicking any card selects it. "Explore Materials & Cart" opens the PREVIOUS
  full BUILD materials/quote scene. Cart and forms are not deleted.
- Primary navigation labels are:
  Home | Build | Trucking | Digital Media | Contacts | About Us
- Contacts/About Us open small informational modals (no invented contact numbers).

IMPORTANT:
- Build-time preview: the source GitHub index.html will remain unchanged,
  but the deployed Vercel build will contain the new HTML assembled in dist/.
- This is a targeted update to the current public single-app repository.
- If Vercel overrides output settings manually, set Output Directory to dist.
- If a Vercel build fails, inspect the build logs. The script stops if the old
  source files are missing instead of deploying a broken or empty website.
- No backend pricing, official quotes, or live contact forms are claimed.

V4.4 targeted reliability adjustment:
- No additional truck lettering or logos have been added.
- Leaves approved homepage artwork and site layouts intact.
- Transition animation time shortened and Safari fallback ensures completion.
- Removes costly brightness/filter animation during scene swaps.
- BUILD card pulse is gentler; original materials/cart remain embedded.
- Existing Vercel deployment integration is needed: upload all files in this archive.

Note: This does not replace the existing homepage image; it preserves the image already installed in your repository. The exact photo-only homepage reference can be swapped as a separate approved step.
