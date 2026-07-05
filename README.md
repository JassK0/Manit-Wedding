# Manit's Wedding Week

A mobile-only site for Manit's wedding week (July 7-12, 2026): a scroll-driven
itinerary with dress codes, add-to-calendar, and a live "what's happening
now" banner. Built to be opened once, from a phone, from a link in a group
chat.

## Stack, and why

**Vite + React + TypeScript**, animated with **Framer Motion**.

- Static, content-driven, no backend, no auth, no data fetching: Vite's dev
  server and build are the fastest way to ship that with good HMR.
- React because the itinerary is naturally a tree of small, repeated
  components (day, event, swatch), and the "happening now" banner and
  scroll-linked thread both need local state that stays in sync with the
  DOM. Next.js's routing/SSR machinery isn't buying anything for a single
  scrolling page.
- Framer Motion because the signature interaction (the self-stitching
  thread) is scroll-linked SVG `pathLength` animation, which is exactly its
  `useScroll`/`useSpring` sweet spot, and its `whileTap`/`layout` primitives
  cover every tap micro-interaction (swatch unfold, button press, confetti)
  without hand-rolled transition code. GSAP would work too, but pulls in a
  second animation model for a React app that only needs the one.

No component library, no CSS framework, no date library (native `Date` and
`Intl` cover everything the countdown and time formatting need), no calendar
library (the `.ics` file is ~15 lines of string building, see
[`src/lib/ics.ts`](src/lib/ics.ts)).

One exception to "no backend": the Celebrate button on the Wedding card shows
a shared tap count (how many times *anyone* has tapped it), which needs
somewhere to persist across visitors. That's the one network call in the
whole site, to [counterapi.dev](https://counterapi.dev)'s free hit-counter
API, see [`src/lib/celebrateCounter.ts`](src/lib/celebrateCounter.ts). If
that service is unreachable the count just doesn't render, the button and
confetti still work either way. If it ever goes away, that file is the only
place that needs to change.

## Run it

```bash
npm install
npm run dev       # starts a local dev server, prints the URL
```

## Deploy it

```bash
npm run build     # outputs a static site to dist/
```

`dist/` is a plain static folder, deployable anywhere. For Vercel: push to a
git repo and import it, or run `npx vercel --prod` from this directory. No
environment variables or build settings are needed beyond the defaults.

## Editing the itinerary

Everything guests see (days, event times, dress codes) comes from one file:
[`src/data/events.ts`](src/data/events.ts). To change a date, time, or
dress code, edit the relevant entry there, nothing else needs to change.

A few things worth knowing about that file:

- `start` / `end` are placeholder call times (10am/2pm/7pm-ish depending on
  Morning/Afternoon/Evening). They drive both the "add to calendar" file and
  the live countdown, so once the family locks in real times, update them
  here. Only the time-of-day (Morning/Afternoon/Evening) is shown on the
  page itself.
- Dress codes are typed as `solid` (one hex), `multi` (a gradient of hexes,
  for "multi-colour" days), `pattern` (renders a little phulkari-print
  swatch instead of a flat color), or `open` (no specific color, e.g. "wear
  anything"). Pick whichever shape fits.
- Dates already match July 7-12, 2026 landing on Tue-Sun as given in the
  brief; if the week shifts, update every `date`/`start`/`end` accordingly.

## Placeholders to fill in before sending this out

Venue and RSVP details aren't finalized. The footer section for them has
been removed for now, but the fields still exist in
[`src/data/config.ts`](src/data/config.ts) (marked with `TODO` comments)
since the calendar download already uses `venueName`/`venueAddress` as each
event's location:

- `venueName` / `venueAddress` / `venueMapUrl`: used as the `LOCATION` field
  in every downloaded calendar event. Bring back a venue/RSVP section in
  [`src/components/Footer.tsx`](src/components/Footer.tsx) once these (and
  `rsvpUrl` / `contactLabel` / `contactHref`) are ready to show guests.
- `siteUrl`: used in share text and should match wherever this actually gets
  deployed. Also update the `og:url` / `og:image` / `twitter:image` values
  in [`index.html`](index.html) to the same domain once deployed, since link
  previews (WhatsApp, iMessage) need absolute URLs to fetch the preview
  image.

## Design system

Tokens (colors, type, spacing) live at the top of
[`src/index.css`](src/index.css) as CSS custom properties, six phulkari
thread colors plus a soft tint, a warm serif (Fraunces) for display type
paired with Manrope for body text. Regenerating the favicon/app
icons/social preview image after a palette change:

```bash
npm install -D sharp
node scripts/generate-assets.mjs
npm uninstall sharp
```

(`sharp` isn't kept as a dependency since it's only needed for that one
script; see the comment at the top of
[`scripts/generate-assets.mjs`](scripts/generate-assets.mjs).)

## Structure

```
src/
  data/
    events.ts       the itinerary (source of truth)
    config.ts        venue/RSVP placeholders, site metadata
  lib/
    time.ts          date/status/countdown helpers
    ics.ts            .ics calendar file generation
    share.ts          navigator.share with clipboard fallback
  hooks/
    useNow.ts             ticking clock for the countdown
    useActiveSection.ts    scrollspy for the day nav
    useReducedMotion.ts    prefers-reduced-motion, read reactively
  components/         one component per piece of UI
```

## Notes on the interactive bits

- The stitching thread ([`ThreadSpine.tsx`](src/components/ThreadSpine.tsx))
  ties its draw progress to how far the timeline container has scrolled
  through the viewport, not to the whole page, so it finishes stitching
  right as the last day scrolls into view regardless of how tall the footer
  ends up being.
- Every animated component checks `useReducedMotion()` and renders its final
  state directly with no animation when it's set, rather than relying only
  on a blanket CSS override, since Framer Motion drives most of these via
  JS/WAAPI rather than CSS `transition`/`animation`.
- The "happening now" banner and countdown re-check the clock every 30
  seconds; there's no polling server, it's just comparing `Date.now()`
  against the `start`/`end` fields in `events.ts`.
