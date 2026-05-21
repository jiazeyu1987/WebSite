# Frontend Feature Evidence

## Feature Goal And Non-Goals

- Goal: Move the mobile `/showroom` sticky action bar into the lower thumb zone with safe-area-friendly spacing.
- Non-goals:
  - Do not change `/`.
  - Do not change backend contract or playback logic.
  - Do not alter the overall detail content structure.

## Acceptance Criteria

- `AC-BOTTOM-1`: Mobile detail action bar remains visible near the bottom of the viewport while scrolling.
- `AC-BOTTOM-2`: Mobile detail action bar uses bottom spacing that respects device safe-area insets.
- `AC-BOTTOM-3`: Existing back and play flows remain functional.
- `AC-BOTTOM-4`: Desktop detail flow remains available.

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/showroom`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Styles: `D:\ProjectPackage\Website\src\showroom-app.css`
- Unit test: `D:\ProjectPackage\Website\src\showroom-app.test.js`
- Browser test: `D:\ProjectPackage\Website\tests\showroom-app.spec.js`

## API Contracts And Data States

- API contract: keep the existing `showroom/display/app-config` contract unchanged.
- Data states:
  - Mobile detail sticky action bar
  - Detail scroll state
  - Desktop detail state

## BDD Scenarios

- `BDD: mobile action bar stays in the bottom thumb zone -> Given a mobile user scrolls the showroom detail page / When the sticky action bar is rendered / Then the bar stays visible near the bottom edge of the viewport.`
- `BDD: mobile action bar respects safe-area spacing -> Given a mobile device with a bottom safe area / When the sticky action bar renders / Then it leaves bottom spacing rather than flush against the device edge.`
- `BDD: desktop detail flow remains intact -> Given a desktop user opens the showroom detail page / When the page renders / Then the existing back and play path remains available.`

## RED Command And Expected Failure

RED:

- `npx playwright test tests/showroom-app.spec.js --reporter=line`
- Expected failure:
  - Current mobile sticky action bar is pinned near the top of the viewport instead of the bottom thumb zone.

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run src/showroom-app.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test tests/showroom-app.spec.js --reporter=line` -> PASS

## Verification Notes

Verification:

- Playwright mobile viewport confirms the action bar remains visible near the bottom of the viewport after scrolling.
- Playwright mobile viewport confirms the bottom offset stays within the target thumb-zone range.
- Existing showroom unit tests remain green after introducing the mobile floating action bar.
- Desktop detail flow and bilingual playback path remain green.

## Blockers And Follow-Up Skills

Blockers:

- None.
