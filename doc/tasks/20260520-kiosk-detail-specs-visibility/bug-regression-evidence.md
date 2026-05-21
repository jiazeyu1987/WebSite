# Bug Regression Evidence: Kiosk Detail Specs Panel Visibility

## Bug Summary

The bottom four-card summary panel on the `medical-kiosk` detail page is expected to render visibly, but the user reported that the red-box section is not showing on the detail page.

## Expected Behavior

After opening a product detail page, the bottom summary panel must remain visible and show the four cards for hall, product name, art kind, and interaction entry.

## Reproduction

- Open `http://127.0.0.1:4174/`.
- Click the first kiosk product card to enter the detail page.
- Measure the bottom summary panel at the reference desktop height `1920x911`.
- Before the fix, the panel existed but started at `y=915.53`, so it appeared missing in the initial viewport.

## Root Cause

- The detail page had enough vertical content that the bottom summary panel slipped just below short desktop landscape viewports.
- The largest contributors were the tall title strip, the large hero-stage minimum height, and generous spacing in the description/spec sections.
- This was a layout regression, not a data or conditional-rendering bug: the panel DOM still rendered with four cards.

## Regression Test

- Updated `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js` to set the detail page to `1920x911` and require `data-product-specs-panel` to be in the viewport.

## RED:

- Playwright viewport probe at `1920x911` failed the visibility expectation because `data-product-specs-panel` started at `y=915.53` while the viewport height was `911`.

## GREEN:

- `npm test -- --run src/medical-kiosk.test.js` passed.
- `npm run build` passed.
- `npx playwright test --reporter=line --config temporary output/playwright-reuse-config.mjs` passed.
- A post-fix Playwright viewport probe measured `data-product-specs-panel` at `y=815.77`, bringing it back into the visible viewport.

## Verification

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test --reporter=line --config temporary output/playwright-reuse-config.mjs`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260520-kiosk-detail-specs-visibility --mode preview`

## Risk And Regression Scope

- Primary risk is detail-page layout regression in `medical-kiosk`.
- Regression scope includes detail-page composition, visibility of spec cards, narration action, and return-to-gallery behavior.

## Blockers

- None.

## Follow-up

- If the reference desktop height changes again, keep the Playwright viewport assertion aligned with the approved design target instead of weakening the check.
