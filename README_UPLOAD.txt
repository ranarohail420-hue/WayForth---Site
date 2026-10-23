WAYFORTH V5.15 — BUILD IMAGE FRAMING + NATIVE MATERIALS QUOTE CART

This update replaces the legacy embedded Residential materials screen with a native, responsive materials selector and quote cart. It also corrects the image framing on the Build hero, Residential/Commercial cards, and plot-size options.

WHAT CHANGED
1. Build hero: the approved construction scene now uses a softer, seamless panoramic treatment so the building is visible without the hard “photo pasted on blurred sides” effect.
2. Residential and Commercial cards: corrected the image assets and aspect ratios to avoid excessive zoom and the blurred filler strip under the residential photo.
3. Plot-size selector: replaced the six cramped, wide-cropped cards with a clean three-column layout using landscape cards and balanced home thumbnails. On smaller screens the layout adapts to two columns and then one column.
4. Materials selection: removed the old circular legacy menu and its nested iframe. The new interface uses clear material cards, search and category filters, quantity/unit controls, a live quote cart, and contact/delivery details.
5. Navigation: the materials screen always provides “Change Plot Size”, “Change Project Type”, and “Commercial Project” actions. Users can return to 5 Marla / 10 Marla / other sizes or switch to Commercial without refreshing.
6. Quote request: the cart sends a structured `wf-build-quote` message with project, contact, location, materials, quantities, units, and notes, matching the existing WAYFORTH quote flow.

PRESERVED
- Approved Home artwork and landing animation assets
- Existing main navigation, transitions, and auxiliary dialogs
- Trucking and Media assets
- Build hero copy, benefits, welding-flash animation, and commercial quote form

HOW TO APPLY
1. Extract the ZIP.
2. Upload the included update files to the root of the existing GitHub repository, replacing matching files only.
3. Keep the repository's existing `index.html`, `app.js`, `styles.css`, and `scenes-data.js` files in place. Do not delete core application files.
4. Ensure the existing Vercel build command still runs `node patch-wayforth.js`; this rebuilds `dist` and writes the new Build page into the `build` scene entry.
5. Commit using the message in `START_HERE_FIRST.txt`, then wait for Vercel to finish deploying.

This is an update bundle for the existing WAYFORTH repository, not a standalone replacement for the entire website.
