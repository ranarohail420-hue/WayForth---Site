WAYFORTH V4.5 — APPROVED HOME FIX

WHAT WAS WRONG
Older releases still composed the old BUILD/crane/DD/truck artwork and labels on top of the screen.
V4.4 did not replace that artwork.

WHAT THIS PATCH DOES
At deployment build-time, patch-wayforth.js replaces the whole HOME section with one image, wf-home-approved.webp, matching the approved reference. It adds transparent click targets over the visible HOME buttons, keeping existing in-app transitions. On mobile it adds accessible bottom navigation. Legacy cranes, truck, and Digital Dynasty home layers are not mounted. The Media section no longer points to Digital Dynasty and uses a WayForth-branded scene image. Original Build and Trucking internals are preserved.

GITHUB UPLOAD
Upload all files INSIDE this ZIP to the ROOT of existing WayForth---Site, replace matching files. Do not upload the ZIP itself. Do not remove index.html/app.js/scenes-data.js (the patch uses these originals). Vercel runs node patch-wayforth.js as configured by vercel.json.
Commit: WAYFORTH V4.5 — Approved Homepage and Media Branding Fix

IMPORTANT
This is a build-time patch release for the existing GitHub repository, NOT a standalone site. The image is static and the previous object-by-object HOME animation is deliberately removed to prevent duplicated artwork. Globe navigation still uses the existing app transition system. Do not copy this ZIP into an empty repository.
After deployment, hard refresh to bypass cached earlier artwork.
