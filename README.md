# Consequences on Coffman Street

Public event site for LoCo Pro Wrestling's next show, **Consequences on Coffman
Street**.

- Canonical domain: `https://consequences.locopro.pw/`
- Hosting: GitHub Pages through the included Actions workflow
- Publish source: a generated `_site` artifact from `scripts/build-pages.sh`
- Frozen files: none

## Current content boundary

Only the event title is confirmed in this first version. The date, venue, bell
time, card, and ticket URL remain explicitly unannounced. Update the site only
from confirmed event information. Do not infer details from earlier Coffman
Street events.

## Local preview

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Verification

```sh
node tests/verify-site.mjs
rm -rf _site && ./scripts/build-pages.sh . _site
```

## Deployment

Pushing `main` runs `.github/workflows/deploy-pages.yml`. The workflow prepares
a public artifact that excludes repository-only documentation, scripts, tests,
and source material.
