WAYFORTH V33 — TRUCKING FEATURE STRIP CLEANUP
=============================================

COMMIT NAME
WAYFORTH V33 — Trucking Feature Strip Cleanup

CHANGES FROM V32 (artwork only)
- Removed the small description lines under the three feature headings:
  "Send the details once; we route it to the right specialist."
  "Route, timing and equipment details captured before follow-up."
  "Availability and pricing are confirmed directly by WAYFORTH."
- Re-centered each heading ("One request. One team.", "Clear transport planning.", "Real human follow-up.") vertically beside its ring icon.
- Submission source tag updated to "WAYFORTH Trucking V33".

UNCHANGED
- Rings/icons, dividers, service cards, trailer, headline and everything else in the artwork
- All V32 form features (make search, 2028-to-1980 year list), V31 validation and lead email endpoint
- Vercel Build Command: node patch-wayforth.js
- Existing repository files: index.html, app.js, styles.css, scenes-data.js

DEPLOY
1. Extract this ZIP into the ROOT of the existing WAYFORTH GitHub repository and replace matching files.
2. Keep index.html, app.js, styles.css and scenes-data.js.
3. Commit with the exact message above.
4. After deployment, open the Trucking page and hard-refresh (Ctrl+Shift+R) so the new artwork loads.

This is an update bundle for the existing repository. No live deployment was performed by this package build.

----------------------------------------------------------------

WAYFORTH V32 — MAKE SEARCH, YEAR ORDER & TRAILER BRANDING CLEANUP
==================================================================

COMMIT NAME
WAYFORTH V32 — Vehicle Make Search, Year List Order & Trailer Branding Cleanup

CHANGES FROM V31
Ship a Car form (wayforth-trucking-v22.html)
- Vehicle Make now has a search box above the dropdown. Type part of a make name (for example "toy"); the list narrows to matching makes, best matches first. If only one make matches it is selected automatically and its models load. If nothing matches, choose "Other / Not Listed" and type the make.
- Year list now runs from 2028 at the top down to 1980 at the bottom (used by the car and boat forms).
- Submission source tag updated to "WAYFORTH Trucking V32".

Trucking artwork (trucking-final-approved.png)
- The "WAYFORTH TRUCKING" wording on the side of the trailer was removed. The gold WF emblem on the trailer was kept. Nothing else in the artwork changed.

UNCHANGED
- Everything else from V31 (form validation, lead email endpoint), Home, Build, Media, animation, logo behavior, NHTSA catalog, date guard
- Vercel Build Command: node patch-wayforth.js
- Existing repository files: index.html, app.js, styles.css, scenes-data.js

DEPLOY
1. Extract this ZIP into the ROOT of the existing WAYFORTH GitHub repository and replace matching files.
2. Keep index.html, app.js, styles.css and scenes-data.js.
3. Commit with the exact message above.
4. After deployment, test Ship a Car > Vehicle step: pick a year, type in the Make search box, pick a make and a model, and confirm 2028 is first and 1980 is last in the Year list. If the trailer still shows its old wording, hard-refresh the page (Ctrl+Shift+R).

This is an update bundle for the existing repository. No live deployment was performed by this package build.

----------------------------------------------------------------

WAYFORTH V31 — TRUCKING FORM VALIDATION & HARDENED LEAD EMAIL ENDPOINT
======================================================================

COMMIT NAME
WAYFORTH V31 — Trucking Form Validation & Hardened Lead Email Endpoint

CHANGES FROM V30 (no visual or artwork changes)
Trucking forms (wayforth-trucking-v22.html)
- Phone / WhatsApp must contain 7 to 15 digits.
- Freight: Requested Delivery Date cannot be before the Pickup Date.
- Number of Vehicles must be at least 1 (whole number).
- Required text fields no longer accept spaces only.
- Browser autofill and the right mobile keyboard for name, email and phone.
- Submission source tag updated to "WAYFORTH Trucking V31".

Lead email endpoint (api/trucking-inquiry.js) — same path, same environment variables
- Server-side validation: name, valid email and phone are required.
- Limits on field count and field length; HTML is escaped; line breaks in notes are kept.
- Only same-site requests are accepted (blocks other websites from posting to the endpoint).
- Contact details appear first in the email; subject includes the customer name; reply-to is the customer.
- Email-provider call times out after 8 seconds with a clear error message.

UNCHANGED
- Home, Build, Media, artwork, animation, logo behavior, NHTSA vehicle catalog, date guard
- Vercel Build Command: node patch-wayforth.js
- Existing repository files: index.html, app.js, styles.css, scenes-data.js

DEPLOY
1. Extract this ZIP into the ROOT of the existing WAYFORTH GitHub repository and replace matching files.
2. Keep index.html, app.js, styles.css and scenes-data.js.
3. Commit with the exact message above.
4. In Vercel > Project > Settings > Environment Variables confirm these exist for Production AND Preview:
   RESEND_API_KEY, WAYFORTH_FROM_EMAIL, WAYFORTH_LEADS_EMAIL (comma-separated for several recipients)
   If they were just added or changed, redeploy once.
5. Test after deployment:
   - Ship a Car, Ship a Boat, Move a Load and Join as a Carrier: submit one real test each and confirm the email arrives.
   - Type 123 as the phone number: it must be refused.
   - Freight: pick a delivery date earlier than the pickup date: it must be refused.
   - Build page: submit one materials quote and confirm the email arrives (see note below).

NOTE
The Build materials cart sends its request to the main site (index.html / app.js), which is not part of this ZIP. Confirm by test that Build quotes reach your inbox.

This is an update bundle for the existing repository. No live deployment was performed by this package build.

----------------------------------------------------------------

WAYFORTH V30 — CURRENT UPDATE
=============================

Use START_HERE_V30.txt for the latest trucking form changes and exact commit name.

Commit name:
WAYFORTH V30 — Trucking Form Vehicle Catalog, Date Guard & Transport Choices

V30 is a form-only update over V29:
- High-contrast white calendar icon; dates before today are blocked/validated.
- Open Carrier is labelled “Save ~30%”; Enclosed Carrier is labelled “More Protection”.
- Vehicle type is selected with visual buttons, followed by a 1981–2028 year dropdown and US-market make/model options from NHTSA vPIC where available.
- An Other / Not Listed route is available for vehicles missing from the catalog.
- Operability uses the reference-style selection buttons and contextual non-operable guidance.
- Boat form follows the same interaction pattern using vessel terminology and boat-specific options.

The approved landing page, animation, artwork, logo behavior, Build/Home files, quote endpoint, and email-routing configuration are preserved.

DEPLOY
1. Extract this ZIP into the ROOT of the existing WAYFORTH GitHub repository, replacing matching files only.
2. Keep index.html, app.js, styles.css, and scenes-data.js.
3. Keep the Vercel Build Command: node patch-wayforth.js
4. Commit using the exact message above and test the Car and Boat form flows.

No live Vercel deployment has been performed from this package.

----------------------------------------------------------------

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
