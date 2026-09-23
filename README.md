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
- `webimages/branding/consequences-on-coffman-st.png` is a 3200 × 1600 transparent RGBA render for tools that do not accept SVG.

## Verification

```sh
node tests/verify-site.mjs
rm -rf _site && ./scripts/build-pages.sh . _site
```

## Deployment

Pushing `main` runs `.github/workflows/deploy-pages.yml`. The workflow prepares
a public artifact that excludes repository-only documentation, scripts, tests,
and source material.
