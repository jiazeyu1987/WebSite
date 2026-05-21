# Frontend Feature Evidence

## Feature Goal And Non-Goals

- Goal: Harden `/showroom` on mobile as a vertical-scroll-only information page with no horizontal overflow.
- Non-goals:
  - Do not change `/`.
  - Do not add horizontal swipe navigation to `/showroom`.
  - Do not change backend contract or playback logic.

## Acceptance Criteria

- `AC-VERTICAL-1`: Mobile `/showroom` has no horizontal overflow.
- `AC-VERTICAL-2`: Mobile `/showroom` uses a vertical scroll interaction model.
- `AC-VERTICAL-3`: Existing landing -> detail and playback flows remain functional.
- `AC-VERTICAL-4`: Desktop showroom flow remains available.

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/showroom`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Styles: `D:\ProjectPackage\Website\src\showroom-app.css`
- Browser test: `D:\ProjectPackage\Website\tests\showroom-app.spec.js`

## API Contracts And Data States

- API contract: keep the existing `showroom/display/app-config` contract unchanged.
- Data states:
  - Mobile landing state
  - Mobile detail state
  - Vertical scroll-only interaction state

## BDD Scenarios

- `BDD: mobile showroom does not overflow horizontally -> Given a mobile user opens the showroom page / When the page renders / Then the document scroll width does not exceed the viewport width.`
- `BDD: mobile showroom exposes vertical-scroll-only intent -> Given a mobile user opens the showroom page / When the root showroom surface renders / Then the style enforces a vertical scroll interaction model rather than encouraging horizontal gestures.`
- `BDD: landing to detail flow remains intact -> Given a mobile user taps into the company detail / When the page renders / Then the existing detail and playback path remains available.`

## RED Command And Expected Failure

RED:

- `npx playwright test tests/showroom-app.spec.js --reporter=line`
- Expected failure:
  - Current mobile showroom page does not explicitly assert or enforce the vertical scroll-only model in tests.

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run src/showroom-app.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test tests/showroom-app.spec.js --reporter=line` -> PASS

## Verification Notes

Verification:

- Playwright mobile viewport confirms the document scroll width matches the client width with no horizontal overflow.
- Playwright mobile viewport confirms the `/showroom` root surface reports `overflow-x: hidden` and `touch-action: pan-y`.
- Existing landing, detail, sticky action bar, and field-card flows remain green.
- Existing showroom unit tests remain green after the scroll-model-only CSS hardening.

## Blockers And Follow-Up Skills

Blockers:

- None.
