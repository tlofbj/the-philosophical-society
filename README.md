# The Time Machine

Every meeting of the Philosophical Society at ʻIolani School, laid out as a
timeline you can drag through. Plain HTML, CSS and JavaScript modules, with no
build step and no backend, so it runs as-is on GitHub Pages.

Live at **https://tlofbj.github.io/the-philosophical-society/** once deployed.

## Adding or editing a meeting

Everything lives in [`js/data/events.js`](js/data/events.js). Add an object
to `EVENTS` and the timeline sorts it by date. A meeting with `date: null`
counts as upcoming and goes at the end.

For the poster, either:

- drop an image in `assets/posters/` and set `poster: { image: 'assets/posters/name.jpg', alt: '…' }`
  (add `ratio: 1` for a square poster like Club Day; the card and detail view take that shape), or
- use a built-in design: `poster: { template: 'just-war' | 'ignorance' | 'pizza' | 'knowledge' | 'wrongdoings' | 'free-will' | 'rights' | 'upcoming' }`.

Other optional fields:

- `bulletins`: the announcements as they ran in the ʻIolani bulletin, shown as clippings in the detail view. Links and emails become clickable.
- `figures`: big numbers for the detail view (used for attendance stats on the upcoming card).
- `links`: readings and handouts. Handouts live in `assets/docs/`.
- `media`: slides or diagrams from the meeting, as `{ image, alt, caption }`. Images live in `assets/figures/`.
- `quoteBy`: who said the `quote`, when it isn't the Society's own words.

The rail marks where each school year (2024–25, 2025–26, …) begins.

## Structure

```
index.html
css/                 one stylesheet per area (base, masthead, machine, posters, hud, detail, cursor)
js/
  main.js            entry point
  App.js             builds the components and wires their events together
  core/              Ticker (one rAF loop), Spring, Pointer, Router (hash links), Emitter, helpers
  models/            SocietyEvent: one meeting plus its date formatting
  data/events.js     the content
  posters/           PosterFactory, PosterTemplate base class, built-in designs
  components/        TimeMachine (draggable track), PosterCard, DetailView (card → detail flight),
                     TimeDial (rolling date), KineticTitle, Cursor, Roller, TextSwap
tools/version.py     stamps a fresh version on every stylesheet and script before a deploy
```

Every animation runs on a shared `Ticker` and is driven by springs or
exponential easing, never fixed-duration tweens, so motion stays smooth
when it's interrupted. `prefers-reduced-motion` is respected throughout.

## Running locally

ES modules don't load from `file://`, so serve the folder:

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173.

## Deploying to GitHub Pages

1. Create a repository named `the-philosophical-society` under the `tlofbj` account.
2. Push this folder to its `main` branch.
3. Go to **Settings → Pages**, choose **Deploy from a branch**, then `main` and `/ (root)`.

All paths are relative, so the site works under the `/the-philosophical-society/` subpath.

### Every update

GitHub Pages lets browsers cache each file for 10 minutes, so without new
URLs a visitor can get the new page running old scripts. Before each push:

```bash
python3 tools/version.py
```

It adds a fresh `?v=` to every stylesheet and to `js/main.js`, and rewrites
the import map in `index.html` so every other module loads at a new URL too.
