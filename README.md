# Consequences on Coffman Street

Public event site for LoCo Pro Wrestling's next show, **Consequences on Coffman
Street**.

- Canonical domain: `https://consequences.locopro.pw/`
- Hosting: GitHub Pages through the included Actions workflow
- Publish source: a generated `_site` artifact from `scripts/build-pages.sh`
- Frozen files: none

## Current content boundary

The event title, Sunday, January 24, 2027 date, and Historic Elks Lodge
Ballroom venue in Longmont, Colorado are confirmed. Bell time, card, and ticket
URL remain explicitly unannounced. Update the site only from confirmed event
information. Do not infer details from earlier Coffman Street events.

## Local preview

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Reusable event logo

The transparent event logo is available in two formats:

- `webimages/branding/consequences-on-coffman-st.svg` is the resolution-independent master. All lettering is stored as vector paths, so it has no external font dependency.
- `webimages/branding/consequences-on-coffman-st.png` is a 1600 × 800 transparent RGBA render for tools that do not accept SVG.

## Event photography

Three CMRice Photography gallery images are reused without modifying their pixels
from `/Users/gecko/locoprowrestling/LoCoProWebsites/presskit/webimages/press-photos/`:
`battle-upside-down-chandelier.jpg`,
`battle-arms-raised-crowd.jpg`, and `vendetta-belt-overhead.jpg`.
The originals remain in `/Users/gecko/locoprowrestling/characterCreator/CMR/`.
Every placement includes the linked credit **Photo by CMRice Photography**.
These are past-show photographs, not a Consequences card or venue announcement.

The hero rotates through Carter Cash, Zeak Gallent, Nicky Hyde, and Adam
Starling in that order. Each image is copied unchanged from the CMR originals and
checked against `/Users/gecko/locoprowrestling/characterCreator/photo-tagger/tags.json`:

| Hero image | CMR source filename |
| --- | --- |
| `carter-cash.jpg` | `CMR-02-VENDETTA-1647533527377738.jpg` |
| `zeak-gallent.jpg` | `CMR-02-VENDETTA-1600834685380956.jpg` |
| `nicky-hyde.jpg` | `CMR-02-VENDETTA-1647533677377723.jpg` |
| `adam-starling.jpg` | `CMR-02-VENDETTA-1600834502047641.jpg` |

Rotation advances every seven seconds. Named buttons, arrow/Home/End keys,
touch swipes, and Pause/Play provide manual control. Leaving the pointer over
the photo does not stop autoplay. Keyboard focus and a hidden browser tab
suspend rotation; manual photo selection pauses it.
Reduced-motion preferences start paused and remove crossfades. Without
JavaScript the first photo remains visible and inactive controls stay hidden.

The calendar download saves January 24 as an all-day reminder because bell time
is not yet confirmed. The reusable logo files are unchanged.

## Verification

```sh
node tests/verify-site.mjs
./scripts/build-pages.sh . _site
```

## Deployment

Pushing `main` runs `.github/workflows/deploy-pages.yml`. The workflow prepares
a public artifact that excludes repository-only documentation, scripts, tests,
and source material, including Affinity project/lock files and local browser
screenshots in `output/`.
