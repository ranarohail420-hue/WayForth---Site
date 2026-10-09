# WAYFORTH V3.5 — Smooth Transition + Full-Screen Fit

Changes from the user's iPhone recordings:
- Disabled accidental pinch/double zoom on the homepage and destination pages.
- Home uses the iPhone visual viewport dimensions so fixed layers do not stay cropped after browser chrome changes.
- Mobile composition is slightly smaller/inset so BUILD, DD, truck, globe, labels and edges fit within the visible screen.
- Background atmosphere is richer: stronger blue cloud/haze texture, horizon light and road reflections.
- Transition handoff is now fully opaque before navigation, hiding the browser page swap.
- Removed expensive blur/filter animation during the handoff; globe motion uses transform + opacity only.
- Destination pages begin with the globe already huge on the first rendered frame, preventing the "small globe / stuck / sudden page" flash.
- BUILD/TRUCKING/MEDIA/QUOTE and index are prefetched/warmed to reduce navigation stalls.
- Existing V3.4 page content, truck, DD, BUILD, flashes and wheel/headlight effects are preserved.

Upload every file from this package to the root of the existing WayForth---Site GitHub repository.
