# Bridgeland Key Club — Webmaster Guide

Built by Srikar Karri, Class of 2029 · srikar.karri@gmail.com

## Tech stack

Pure HTML/CSS/JS — no build tools, no React, no npm. Every page is a self-contained `.html` file. Open any file in a browser and it works immediately.

## File structure

```
/
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
├── assets/            Logos, photos (KC1–KC13.jpg in assets/photos/)
└── shared/
    ├── styles.css     Design tokens + all shared CSS
    └── data.js        Single source of truth — window.BKC object
```

## The most important file: shared/data.js

All dynamic content lives here. Edit this file to update officers, events, stats, news, and FAQs without touching any HTML.

```js
window.BKC = {
  officers: [ ... ],   // renders on officers.html + home.html
  events:   [ ... ],   // renders on events.html list view
  stats:    { ... },   // animated counters on home.html + hours.html
  news:     [ ... ],   // renders on news.html + home.html recap
  faqs:     [ ... ],   // renders on contact.html accordion
}
```

## How to update each page

### Add/update an officer
Edit the `officers` array in `shared/data.js`:
```js
{ role: "President", name: "First Last", year: 2026, email: "email@example.com", pronouns: "she/her" }
```
The cards on `officers.html` and the preview on `home.html` update automatically.

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
In `hours.html`, replace both instances of `HOURS_FORM_URL` with the actual Google Form share link. The QR code updates automatically (it uses the same URL variable).

### Update the gallery
- **Drive embed**: The iframe in `gallery.html` points to folder `1aHO_INA4...`. Replace the folder ID in the `embeddedfolderview` URL if the folder changes.
- **Album cards**: Edit the `albums` array in `gallery.html` JS. Update each `url` to point to the specific subfolder for that event, and `thumb` to a local photo path.
- **Polaroid photos**: Drop new photos into `assets/photos/` and update the `KC{n}.jpg` references in the sticker pile JS.

### Add a district/division officer
Edit `district.html` directly — search for `"Placeholder — confirm with district"` and replace with the real name and contact.

## Updating the Google Calendar

The events calendar (`events.html`) embeds `bridgelandkeyclub@gmail.com`'s Google Calendar. To show events:
1. Add events to that Google Calendar account
2. Make sure the calendar is set to **public** (Google Calendar Settings → your calendar → Access permissions → "Make available to public")

## Critical placeholders to fill before competition

| What | Where | How |
|------|-------|-----|
| Officer names (7 TBAs) | `shared/data.js` → `officers` array | Replace `"Placeholder"` with real names |
| Faculty advisor names | `officers.html` lines ~176-181 | Replace "Ms. Placeholder" / "Mr. Placeholder" |
| Lt. Governor name | `shared/data.js` → `district.ltGov` | Confirm with TX-OK district |
| Kiwanis email | `shared/data.js` → `kiwanis.email` | Remove `example.org` domain |
| Hours log form URL | `hours.html` (both `HOURS_FORM_URL` instances) | Paste real Google Form link |
| Slide deck URLs | `slides.html` JS `decks` array | Replace `u/0/` with real share links |

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

## Hours tracker — Apps Script setup (one-time)

Tab 2 ("Track Submitted Hours") loads live data via a Google Apps Script web app.
Third-party CORS proxies cannot reach Google's servers — this is the only reliable approach.

### Steps (≈3 minutes)

1. Open the Google Form responses spreadsheet (Google Forms → Responses tab → green Sheets icon)
2. In the spreadsheet: **Extensions → Apps Script**
3. Delete everything in `Code.gs` and paste this:

```js
function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data  = sheet.getDataRange().getValues();
  var headers = data[0].map(function(h) { return String(h).trim(); });
  var rows = [];
  for (var i = 1; i < data.length; i++) {
    if (!data[i][0]) continue;
    var row = {};
    headers.forEach(function(h, j) { row[h] = data[i][j]; });
    rows.push(row);
  }
  return ContentService
    .createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Deploy → New deployment**
5. Set: Type = **Web app**, Execute as = **Me**, Who has access = **Anyone**
6. Click **Deploy** → copy the Web App URL (looks like `https://script.google.com/macros/s/ABC.../exec`)
7. In `hours.html`, replace `PASTE_APPS_SCRIPT_URL_HERE` with that URL

### Updating the deployment

When the spreadsheet changes structure (new columns), you don't need to change anything — the script reads headers dynamically. Just keep the deployment live.

If the URL stops working, redeploy: Apps Script → Deploy → Manage deployments → edit → new version.

## External service links to maintain

| Service | URL | Where used |
|---------|-----|------------|
| Google Calendar | `bridgelandkeyclub@gmail.com` calendar | events.html embed |
| Google Drive gallery | Folder `1aHO_INA4...` | gallery.html embed |
| Apps Script web app | `APPS_SCRIPT_URL` in `hours.html` | Track tab live data |
| OSC Sheet | Sheets link in `hours.html` | OSC tab |
| Hours log form | set in `hours.html` (already configured) | Log tab + QR |

## Deploying

This is a static site — upload the entire folder to any web host (GitHub Pages, Netlify, Cloudflare Pages). No server-side code needed.

For GitHub Pages: push to a repo, enable Pages in repo Settings → Pages → Deploy from branch `main` → root `/`.
