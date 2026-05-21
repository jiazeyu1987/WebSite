# Frontend Feature Evidence

## Feature Goal And Non-Goals

- Goal: Make the mobile `/showroom` landing controls wider and easier to tap by expanding the company entry card and language toggle closer to full width.
- Non-goals:
  - Do not change `/`.
  - Do not change backend contract or playback logic.
  - Do not alter the showroom detail page structure.

## Acceptance Criteria

- `AC-LANDING-1`: The mobile language toggle spans near the full content width.
- `AC-LANDING-2`: The mobile company entry card spans near the full content width.
- `AC-LANDING-3`: Existing landing -> detail and language switching flows remain functional.
- `AC-LANDING-4`: Desktop showroom landing remains available.

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/showroom`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Styles: `D:\ProjectPackage\Website\src\showroom-app.css`
- Browser test: `D:\ProjectPackage\Website\tests\showroom-app.spec.js`

## API Contracts And Data States

- API contract: keep the existing `showroom/display/app-config` contract unchanged.
- Data states:
  - Mobile landing state
  - Language switch state
  - Landing to detail entry path

## BDD Scenarios

- `BDD: mobile language toggle becomes easier to hit -> Given a mobile user opens the showroom landing page / When the language toggle renders / Then it spans most of the content width with larger touch targets.`
- `BDD: mobile company card becomes a wider tap target -> Given a mobile user opens the showroom landing page / When the company entry card renders / Then it spans most of the content width instead of a narrow card aligned to the left.`
- `BDD: landing to detail flow remains intact -> Given a user taps the wider company entry card / When the detail page opens / Then the existing detail and playback path remains available.`

## RED Command And Expected Failure

RED:

- `npx playwright test tests/showroom-app.spec.js --reporter=line`
- Expected failure:
  - Current mobile landing page renders a narrow language toggle and a narrow company entry card that do not span the content width.

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run src/showroom-app.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test tests/showroom-app.spec.js --reporter=line` -> PASS

## Verification Notes

Verification:

- Playwright mobile viewport confirms the landing language toggle now spans near the content width.
- Playwright mobile viewport confirms the company entry card now spans near the content width.
- Existing landing -> detail and bilingual detail flows remain green.
- Existing showroom unit tests remain green after the landing-only CSS adjustments.

## Blockers And Follow-Up Skills

Blockers:

- None.
