# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Bridgeland Key Club — Webmaster Guide

Built by Srikar Karri, Class of 2029 · srikar.karri@gmail.com

## Tech stack

Pure HTML/CSS/JS — no build tools, no React, no npm, no package.json. Every page is a self-contained `.html` file with inline `<style>`/`<script>` blocks plus the shared files below. There is no lint/test/build command — to preview, open a `.html` file directly in a browser, or serve the folder locally (e.g. `python3 -m http.server`) if a page needs `fetch`-style same-origin behavior.

## File structure

```
/
├── index.html         Redirects to home.html
├── home.html          Landing page
├── about.html         Mission, values, Key Club objects
├── officers.html      Board cards (Polaroid / Clean / Yearbook styles)
├── events.html        Google Calendar embed + Featured Projects
├── hours.html         3-tab portal: Log / Track / OSC Sheet
├── gallery.html       Photo gallery (Drive embed + polaroid pile)
├── news.html          Event recaps feed
├── slides.html        Meeting slide deck archive
├── district.html      Division 3W + TX-OK District info
├── contact.html       Contact directory + FAQ accordion
├── assets/            Logos, officer photos, KC1–KC13.jpg in assets/photos/
└── shared/
    ├── styles.css     Design tokens + all shared CSS
    └── data.js        Single source of truth — window.BKC object
```

**Legacy/unused, do not edit expecting effect:** `assets/css/site.css`, `assets/js/chrome.js`, `assets/js/data.js`, `assets/js/site.js`, `assets/js/tweaks.js`, `shared/components.jsx`, `shared/page-shell.jsx`. None of these are referenced by any `.html` page (confirmed via grep across all pages) — they're leftovers from an earlier prototype. All active styling lives in `shared/styles.css` plus per-page inline `<style>` blocks; all active data lives in `shared/data.js`.

## The most important file: shared/data.js

All dynamic content lives here. Edit this file to update club/district info, officers, events, stats, requirements, news, and FAQs without touching any HTML.

```js
window.BKC = {
  club:         { ... },  // name, meeting time, contact, Remind codes
  district:     { ... },  // Lt. Governor, Region 12 advisor, district site
  kiwanis:      { ... },  // sponsoring Kiwanis club contact
  intl:         { ... },  // Key Club International site
  webmaster:    { ... },  // credit footer
  officers:     [ ... ],  // renders on officers.html + home.html
  events:       [ ... ],  // renders on events.html list view
  stats:        { ... },  // animated counters on home.html + hours.html
  requirements: { ... },  // hours/socials thresholds, shown on hours.html
  news:         [ ... ],  // renders on news.html + home.html recap
  faqs:         [ ... ],  // renders on contact.html accordion
}
```

## How to update each page

### Add/update an officer
Edit the `officers` array in `shared/data.js`:
```js
{ role: "President", name: "First Last", year: 2026, email: "email@example.com", photo: "assets/officers/first-last.jpeg" }
```
The cards on `officers.html` and the preview on `home.html` update automatically. Add the headshot to `assets/officers/`.

### Add a news post
Add an object to the `news` array in `shared/data.js`:
```js
{ date: "2026-05-10", title: "Event recap title", excerpt: "One paragraph summary.", tag: "Service", url: "optional-link" }
```

### Add a meeting slide deck
Edit the `decks` array in `slides.html` (bottom `<script>` block):
```js
{ date: "2026-05-07", title: "Meeting title", slides: 14, present: "Officer Name", url: "GOOGLE_SLIDES_SHARE_LINK" }
```
Get the URL from Google Slides → File → Share → "Anyone with the link can view" → copy link.

### Update the hours log form
`hours.html` already links to the live Google Form (Tab 1) and its QR code, both pointing at the same `docs.google.com/forms/d/e/...` URL — search for that URL to update it if the form changes.

### Update the hours tracker / OSC sheet
Tabs 2 and 3 of `hours.html` ("Track Submitted Hours" and "Check OSC Sheet") are plain links (`class="osc-btn"`) to view-only Google Sheets — search `docs.google.com/spreadsheets/d/` in `hours.html` to find and swap the two sheet URLs. There is no Apps Script / live-fetch integration currently wired up; both tabs just open the sheet in a new tab.

### Update the gallery
- **Drive embed**: The iframe in `gallery.html` points to folder `1aHO_INA4...`. Replace the folder ID in the `embeddedfolderview` URL (and the two other links to the same folder, plus the `GALLERY_ROOT` JS variable) if the folder changes.
- **Album cards**: Edit the `albums` array in `gallery.html` JS. Update each `url` to point to the specific subfolder for that event, and `thumb` to a local photo path.
- **Polaroid photos**: Drop new photos into `assets/photos/` and update the `KC{n}.jpg` references in the sticker pile JS.

### Update the newsletter archive
`news.html` embeds folder `1ukCvSQFaIY7hy93AZpObx0JQzoMMzZVO` (Google Drive) via `embeddedfolderview`, plus a "View all newsletters" button and an "Open in Google Drive" button linking to the same folder. Newsletters are posted directly into that Drive folder — no HTML edit needed for new newsletters, just upload the file there. If the folder ever changes, search `1ukCvSQFaIY7hy93AZpObx0JQzoMMzZVO` in `news.html` and replace all three occurrences. The folder must be set to public (Drive Settings → Access permissions → "Anyone with the link") or the embed shows a sign-in prompt.

### Add a district/division officer
Edit `district.html` directly — search for `"Placeholder — confirm with district"` and replace with the real name and contact.

## Updating the Google Calendar

The events calendar (`events.html`) embeds `bridgelandkeyclub@gmail.com`'s Google Calendar. To show events:
1. Add events to that Google Calendar account
2. Make sure the calendar is set to **public** (Google Calendar Settings → your calendar → Access permissions → "Make available to public")

## Remaining placeholders to fill

| What | Where | How |
|------|-------|-----|
| Faculty advisor names | `officers.html` lines ~126-127 | Replace "Ms. Placeholder" / "Mr. Placeholder" |
| Kiwanis email | `shared/data.js` → `kiwanis.email` | Currently `cypresskeyclub@example.org` — replace with the real address |
| Slide deck URLs | `slides.html` JS `decks` array | All entries currently point at the generic `docs.google.com/presentation/u/0/` — replace with real per-deck share links |

Officer names, the Lt. Governor name, and the hours-log form URL are already filled in with real data — no longer placeholders.

## Design system

All CSS variables are in `shared/styles.css`:

| Variable | Value | Used for |
|----------|-------|----------|
| `--navy-900` | `#0e2a4e` | Primary text, borders, nav |
| `--red-600` | `#e87722` | Accent orange (eyebrows, buttons, mascot) |
| `--butter` | `#f5c451` | Gold highlights, active states |
| `--cream` | `#f3f4f7` | Page backgrounds |
| `--cream-2` | `#ecedf1` | Alternating section backgrounds |
| `--mint` | `#c8f0e0` | Card accent |
| `--peach` | `#fde8d8` | Card accent |
| `--sky` | `#d4eaf7` | Card accent |
| `--display` | Fraunces | Headlines |
| `--mono` | JetBrains Mono | Labels, eyebrows, tags |
| `--hand` | Caveat | Handwritten captions |
| `--serif` | Instrument Serif | Body serif text |

## Scroll reveals

Add `data-reveal` to any element to make it fade up on scroll. Delay with inline style:
```html
<div data-reveal style="transition-delay:.1s;">...</div>
```

## External service links to maintain

| Service | URL | Where used |
|---------|-----|------------|
| Google Calendar | `bridgelandkeyclub@gmail.com` calendar | events.html embed |
| Google Drive gallery | Folder `1aHO_INA4...` | gallery.html embed |
| Google Drive newsletters | Folder `1ukCvSQFaIY7hy93AZpObx0JQzoMMzZVO` | news.html embed + buttons |
| Hours log form | `docs.google.com/forms/d/e/...` in `hours.html` | Log tab + QR (already configured) |
| Hours tracker sheet | `docs.google.com/spreadsheets/d/1_4rde7.../` in `hours.html` | Track tab (view-only link) |
| OSC sheet | `docs.google.com/spreadsheets/d/1T_aGg1.../` in `hours.html` | OSC tab (view-only link) |
| Site visit counter | `hitscounter.dev/api/hit?url=bridgeland-key-club.pages.dev/home` | `.footer-visits` badge, all 10 pages |

### About the visit counter

Every page's footer embeds a live badge image from the free, no-signup [hitscounter.dev](https://hitscounter.dev) service. Every page uses the **same** `url=` query value (`https://bridgeland-key-club.pages.dev/home`) so all pages increment one shared sitewide total, not a per-page count — the badge fetches fresh on every page load/refresh (no caching, so it updates live). No account or API key is involved.

**Trade-offs to know:**
- It's a third-party hobby service with no uptime guarantee. Its predecessor (`hits.seeyoufarm.com`) and the older `countapi.xyz` both shut down; if this one goes down too, the badge just breaks (shows a broken image icon) — it won't break the rest of the site.
- If the site's real deployed URL ever changes from `https://bridgeland-key-club.pages.dev/home`, the counter will silently start a fresh count at the new URL unless you update it. Search `hitscounter.dev/api/hit?url=` across all 10 HTML files to update it everywhere at once.
- The badge shows two numbers ("hits / unique visitors") — that's the service's fixed format, not something we control.

## Deploying

This is a static site — upload the entire folder to any web host (GitHub Pages, Netlify, Cloudflare Pages). No server-side code needed.

For GitHub Pages: push to a repo, enable Pages in repo Settings → Pages → Deploy from branch `main` → root `/`.
