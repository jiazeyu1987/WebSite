# Frontend Feature Evidence

## Feature Goal And Non-Goals

- Goal: Keep back and play actions reachable on mobile `/showroom` detail pages while the user scrolls through long public fields.
- Non-goals:
  - Do not change `/`.
  - Do not change the backend contract or playback state machine.
  - Do not undo the previous hero reflow.

## Acceptance Criteria

- `AC-STICKY-1`: Mobile detail exposes a dedicated action bar that contains back and play actions.
- `AC-STICKY-2`: The action bar remains visible in the viewport after scrolling through the field list on mobile.
- `AC-STICKY-3`: Existing back and play flows remain functional.
- `AC-STICKY-4`: Desktop detail flow remains available.

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/showroom`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Runtime component: `D:\ProjectPackage\Website\src\showroom-app.js`
- Styles: `D:\ProjectPackage\Website\src\showroom-app.css`
- Unit test: `D:\ProjectPackage\Website\src\showroom-app.test.js`
- Browser test: `D:\ProjectPackage\Website\tests\showroom-app.spec.js`

## API Contracts And Data States

- API contract: keep the existing `showroom/display/app-config` contract unchanged.
- Data states:
  - Landing state
  - Detail state with idle / playing / paused playback
  - Long field list scroll state

## BDD Scenarios

- `BDD: mobile detail groups back and play into one action bar -> Given a mobile user opens the showroom detail page / When the detail renders / Then back and play actions are exposed in the same primary action bar before the field list.`
- `BDD: mobile detail keeps the action bar visible while scrolling -> Given a mobile user scrolls the field list / When the page moves past the first screen / Then the action bar remains visible in the viewport.`
- `BDD: desktop detail flow remains intact -> Given a desktop user opens the showroom detail page / When the detail renders / Then the existing back and play path remains available.`

## RED Command And Expected Failure

RED:

- `npm test -- --run src/showroom-app.test.js`
- Expected failure:
  - Current detail markup does not expose a dedicated sticky mobile action bar that can be asserted independently.

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run src/showroom-app.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test tests/showroom-app.spec.js --reporter=line` -> PASS

## Verification Notes

Verification:

- Unit test confirms the detail page now exposes `data-company-detail-action-bar` before the public field list.
- Unit test confirms the action bar groups the back and play actions in one primary area.
- Playwright mobile viewport confirms the action bar remains in the viewport after scrolling to the bottom of the detail page.
- Desktop and bilingual detail playback flows remain green.

## Blockers And Follow-Up Skills

Blockers:

- None.
