# Bug Regression Evidence: Kiosk Detail Spec Card Contrast

## Bug Summary

The four bottom info cards on the `medical-kiosk` detail page visually blend into the surrounding panel, making them appear not to display clearly.

## Expected Behavior

The bottom detail info cards must look like distinct cards with clear separation from the parent panel.

## Reproduction

- Open `http://127.0.0.1:4174/`.
- Click the first kiosk product card to enter the detail page.
- Inspect the bottom `data-product-spec-item` cards.
- Before the fix, each card has no shadow and only a very faint border, so the cards blend into the background panel.

## Root Cause

- The bottom cards were still rendered, but the final effective `.kiosk-detail__spec` style removed any shadow and left only a faint low-alpha border.
- On the existing light detail panel, that styling made the cards visually blend into the background and look like they were not displaying.

## Regression Test

- Updated `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js` to require the first bottom info card on the detail page to compute a non-`none` `boxShadow`.

## RED:

- `npx playwright test --reporter=line --config temporary output/playwright-kiosk-detail-contrast-red.mjs` failed because the first detail spec card still computed `boxShadow` as `none`.

## GREEN:

- `npm test -- --run src/medical-kiosk.test.js` passed.
- `npm run build` passed.
- `npx playwright test --reporter=line --config temporary output/playwright-kiosk-detail-contrast.mjs` passed.
- After the CSS fix, the first detail spec card computed `boxShadow` as `rgba(91, 126, 193, 0.14) 0px 10px 24px 0px, rgba(255, 255, 255, 0.72) 0px 1px 0px 0px inset`.

## Verification

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test --reporter=line --config temporary output/playwright-kiosk-detail-contrast.mjs`
- PASS: `python C:\Users\BJB110\.codex\skills\bug-regression-fix-loop\scripts\validate_bug_regression.py --evidence doc/tasks/20260521-kiosk-detail-spec-card-contrast/bug-regression-evidence.md`

## Risk And Regression Scope

- Primary risk is over-styling the detail cards and breaking the existing light medical visual system.
- Regression scope includes the detail spec-card panel only; copy, structure, and navigation should remain unchanged.

## Blockers

- None.
