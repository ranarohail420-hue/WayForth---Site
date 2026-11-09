WAYFORTH V61 — CONTACT BUTTON, FOOTER & MARKET CONTACTS (update on top of V60)
==============================================================================

COMMIT NAME
WAYFORTH V61 — Contact Button, Footer & Market Contacts

WHAT TO DO
This ZIP contains ONLY the 8 files that changed since V60. Nothing else is touched.
Copy them into the ROOT of the repository (keep the api/ folder structure), replacing the
existing files with the same names. Do not delete or move any other file.

  index.html                  contact button (all pages), Home footer line, contacts per market,
                              co-founder emails on About, US phone format on Trucking/Media support
  wayforth-media.html         US number + US WhatsApp + Support@ in the contact box; owner emails
  wayforth-trucking-v22.html  tells the page when a quote form is open (contact button hides)
  wayforth-build-v5.html      tells the page when the cart is open (contact button moves aside)
  privacy.html                Support@wayforth.ltd instead of info@
  404.html                    version number only
  patch-wayforth.js           version number only (V61)
  api/trucking-inquiry.js     leads go to Support@, Ahmad@, Rohail@ by default; customer gets a
                              "we received your request" confirmation email

CONTACTS BY MARKET
  Build (Pakistan):   0323-146 6332 · 0321-402 2222 · WhatsApp 0323-146 6332 · Support@wayforth.ltd
  Trucking (US):      +1 (410) 262-0680 (call/text/WhatsApp) · Support@wayforth.ltd
  Media (US):         +1 (410) 262-0680 (call/text/WhatsApp) · Support@wayforth.ltd
  About Us:           Ahmad@wayforth.ltd · Rohail@wayforth.ltd (no phone numbers)

VERCEL ENVIRONMENT VARIABLES (Settings -> Environment Variables -> Production)
  WAYFORTH_LEADS_EMAIL   Support@wayforth.ltd,Ahmad@wayforth.ltd,Rohail@wayforth.ltd
  (unchanged) RESEND_API_KEY, WAYFORTH_FROM_EMAIL, WAYFORTH_ALLOWED_HOSTS
  optional    WAYFORTH_AUTOREPLY=off  -> turns off the customer confirmation email
  optional    WAYFORTH_SUPPORT_EMAIL  -> reply-to address on that confirmation (default Support@)
  After changing variables: Deployments -> latest -> Redeploy.

CHECK AFTER DEPLOY
1. https://www.wayforth.ltd/version.txt  ->  WAYFORTH V61
2. Gold contact button bottom-right on Home, Build, Trucking and Media; the list shows
   Pakistan contacts on Build and US contacts on Trucking/Media.
3. Send one test from a form with your own email: the lead arrives at Support@, Ahmad@ and
   Rohail@, and the customer address receives the confirmation.
4. Make sure +1 410 262 0680 is registered on WhatsApp (Business), or the US WhatsApp links
   will not open a chat.
