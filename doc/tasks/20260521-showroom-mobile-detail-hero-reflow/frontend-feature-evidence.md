# Frontend Feature Evidence

## Feature Goal And Non-Goals

- Goal: Reflow the mobile `/showroom` detail hero so the image is followed immediately by the title and play action, with fields pushed lower in the reading flow.
- Non-goals:
  - Do not change `/`.
  - Do not change the backend contract or audio behavior.
  - Do not redesign the desktop showroom experience beyond the scoped detail layout adjustments.

## Acceptance Criteria

- `AC-SHOWROOM-1`: Mobile detail renders the company image first, then the title/summary/play area, then the public field list.
- `AC-SHOWROOM-2`: The company play button is visually promoted in the mobile detail hero area and remains directly reachable after the title.
- `AC-SHOWROOM-3`: The existing back, language, and playback paths remain functional.
- `AC-SHOWROOM-4`: Desktop detail flow remains available.

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
  - Company detail state
  - Playing / paused / idle playback state
  - Empty public fields state

## BDD Scenarios

- `BDD: mobile detail hero places play near the title -> Given a mobile user opens the showroom detail page / When the detail hero renders / Then the primary play action appears in the main summary area before the public field list.`
- `BDD: mobile detail hero keeps image title and play within the first screen -> Given a mobile user opens the showroom detail page / When the page finishes rendering / Then the image, title, and play action are visible without scrolling.`
- `BDD: desktop showroom detail flow remains intact -> Given a desktop user opens the showroom detail page / When the page renders / Then the existing back and playback path remains available.`

## RED Command And Expected Failure

RED:

- `npm test -- --run src/showroom-app.test.js`
- Expected failure:
  - Current detail markup does not expose a dedicated summary/action hero block that guarantees play action promotion in the mobile first screen.

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run src/showroom-app.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test tests/showroom-app.spec.js --reporter=line` -> PASS

## Verification Notes

Verification:

- Unit test confirms the detail page now exposes `data-company-detail-summary` and `data-company-detail-actions` before `data-company-fields`.
- Unit test confirms the company play action stays available in the promoted summary area.
- Playwright mobile viewport confirms the detail image, title, and play button are visible in the first screen without scrolling.
- Desktop bilingual detail flow and playback path remain green.

## Blockers And Follow-Up Skills

Blockers:

- None.
