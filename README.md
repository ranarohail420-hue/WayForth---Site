# WAYFORTH Website

This repository is the source-controlled baseline for the WAYFORTH website.

## Current locked pages
- `index.html` — approved WAYFORTH home master, wired to the section pages.
- `build.html` — approved BUILD master.
- `trucking.html` — approved TRUCKING master.
- `media.html` — Digital Dynasty handoff page.
- `quote.html` — quote routing page.

The next design phase should upgrade the homepage intro and page transitions without replacing the locked BUILD/TRUCKING masters unless explicitly approved.

## Vercel
Import this GitHub repository into Vercel. No build command is required for the static baseline.

## Local QA
```bash
npm install
npx playwright install chromium
npm run test:e2e
```

The Playwright config tests both desktop Chromium and an iPhone 14 Pro viewport.
