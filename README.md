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

- drop an image in `assets/posters/` and set `poster: { image: 'assets/posters/name.jpg', alt: '…' }`, or
- use a built-in design: `poster: { template: 'ideal-society' | 'just-war' | 'ignorance' | 'pizza' | 'upcoming' }`.

The four poster images in `assets/posters/` were cut out of a mockup
screenshot, so they're low resolution. Replace them with the original files
under the same names (3:4 portrait works best).

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
