WAYFORTH V5.11 — BUILD INTERACTION & WELDING EFFECTS

This package layers BUILD-only updates onto the approved V5.9 Home/navigation/transition package. The patch script preserves the approved Home artwork and existing Home / Build / Trucking / Media transition system.

BUILD PAGE CHANGES
1. Removed the crossed-out supporting slogan and paragraph from the hero. The BUILD YOUR DREAM headline remains.
2. Replaced the small benefit pills with four clear circular icon badges: Quality Materials, Dedicated Project Support, Competitive Pricing, and Exclusive Offers for Returning Clients.
3. Added staggered welding flashes and sparks over the construction-site hero image. These are CSS effects layered over the image; the source photo itself is unchanged.
4. Added a gentle pulsing glow to the Residential and Commercial category cards, inspired by the existing Trucking page card treatment.
5. Residential opens a second step with six choices: 5 Marla, 10 Marla, 10 Marla + Excess Land, 11 Marla, 1 Kanal, and 2 Kanal. Selecting a plot enables the existing Materials & Cart flow.
6. Commercial opens a materials quote form with contact details, project type/location, multiple material rows, quantity/unit fields, and additional requirements. The form sends a structured `wf-build-quote` message to the parent WAYFORTH quote flow. Live delivery depends on the site's existing quote handler; this package does not add a new external email/database service.
7. Kept the Raw Materials logo lockup and seven-item navigation in the approved dark navy/gold style. The logo remains clickable to return Home.

PRESERVED
- Approved Home artwork, slogan, globe pulse, crane/truck/media animation assets and stable transition files.
- Existing Trucking and Media scene content.
- Existing embedded materials/quote/cart payload. The build patch inserts the current root `scenes-data.js` build payload into the updated Build page so the Residential Materials & Cart action continues to use it.
- Existing project photos and logo assets; no new external dependencies were added.

GITHUB / VERCEL
1. Extract this ZIP.
2. Upload the package files into the root of the existing repository, replacing matching files.
3. Keep your existing root `index.html`, `app.js`, `styles.css`, and `scenes-data.js`; the included patch-wayforth.js uses those files to apply the approved site patch and inject the updated BUILD scene.
4. Commit with: WAYFORTH V5.11 — BUILD Interaction Welding Effects and Quote Form
5. Wait for the Vercel deployment, then test Home -> Build, Residential -> each plot size -> Materials & Cart, and Commercial -> submit a sample quote request.

Note: This ZIP includes the BUILD scene and integration patch. The live site's external quote handler/server-side delivery cannot be verified from this package alone.
