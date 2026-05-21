# Frontend Feature Evidence

## Feature Goal

Convert the root kiosk route into a pure IntRuoyi display client without local business-data generation or local speech synthesis.

## Acceptance

- The root kiosk reads company, hall, and product display content from IntRuoyi.
- The root kiosk reads product detail fields from IntRuoyi.
- The root kiosk uses backend audio URLs instead of browser speech synthesis.
- `/showroom` remains functional.

## Non-Goals

- No fallback data
- No browser speech synthesis
- No unrelated visual redesign

## UI Entry Points And Owned Files

- Route `/` -> `src/medical-kiosk.js`
- Route `/showroom` -> `src/showroom-app.js`
- Shared API adapters -> `src/showroom-api.js`
- Browser tests -> `tests/kiosk-gallery.spec.js`, `tests/kiosk-detail.spec.js`

## Scope

- `src/medical-kiosk.js`
- `src/showroom-api.js`
- `src/medical-kiosk.test.js`
- `src/medical-kiosk-title-icons.test.js`
- `tests/kiosk-gallery.spec.js`
- `tests/kiosk-detail.spec.js`

## API Contracts And Data States

- Root kiosk boot data: `GET /showroom/display/app-config`
- Root kiosk product detail data: `GET /showroom/display/product/{productId}`
- Audio playback sources:
  - Company audio URLs from app-config
  - Product audio URLs from app-config

## BDD Scenarios

- `BDD: root kiosk reads hall and product display data from IntRuoyi -> Given the public root route is display-only / When the kiosk renders home, hall gallery, company detail, and product detail states / Then the displayed business data must come from IntRuoyi public APIs rather than local hardcoded business content.`
- `BDD: root kiosk plays backend audio instead of browser speech synthesis -> Given the kiosk product and company views expose public narration audio URLs from IntRuoyi / When the user plays narration / Then the page must use backend audio playback and must not synthesize local speech.`

## RED

- `RED: audit before implementation -> FAIL, root kiosk still used local hall arrays, local product detail copy generation, and browser speech synthesis.`

## GREEN

- `GREEN: npm test -- --run -> PASS`
- `GREEN: npm run build -> PASS`
- `GREEN: npx playwright test --reporter=line -> PASS`

## Loading / Empty / Error / Permission Checks

- Initial app-config load has explicit loading and error states.
- Product detail load has explicit loading and error states.
- Empty company and product field states render explicit empty copy.

## E2E Path

- `/` -> home hero from app-config -> switch hall -> open product detail -> play backend product audio
- `/` -> home hero -> open company detail -> play backend company audio

## Verification

- `npm test -- --run`
- `npm run build`
- `npx playwright test --reporter=line`

## Blockers

- None.
