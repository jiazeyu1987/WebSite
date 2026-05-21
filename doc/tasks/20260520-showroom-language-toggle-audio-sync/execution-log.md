BDD: language toggle switches company content and audio -> Given the app-config contains Chinese and English company subtitles and audio URLs / When the user switches the showroom page from Chinese to English / Then the company subtitle and company audio source must both switch to English.

BDD: language toggle switches product content and audio -> Given the selected product contains Chinese and English names, subtitles, and audio URLs / When the user switches the showroom page language / Then the product text and the active product audio source must switch together.

BDD: language toggle does not affect kiosk root entry -> Given the kiosk root entry is still the public homepage / When the user opens `/` / Then the new language toggle logic remains isolated to `/showroom`.

RED: `npm test -- --run` -> FAIL, showroom consumer had no language state, no toggle UI, and audio elements did not switch with content language.

GREEN: `npm test -- --run` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test --reporter=line` -> PASS

INFO: `/showroom` now renders a single active language at a time and keeps text/audio synchronized for company and product views.

## Outstanding Blockers

- None.
