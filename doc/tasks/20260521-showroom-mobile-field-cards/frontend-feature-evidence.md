# Frontend Feature Evidence

## Feature Goal And Non-Goals

- Goal: Improve mobile `/showroom` detail readability by presenting public fields as clearer card-like reading blocks.
- Non-goals:
  - Do not change `/`.
  - Do not change the backend contract or playback logic.
  - Do not undo the sticky actions and hero reflow completed earlier.

## Acceptance Criteria

- `AC-FIELDS-1`: Each public field exposes stable label and value markers for testable presentation.
- `AC-FIELDS-2`: Mobile detail presents each field as a separate card-like block with clearer spacing and hierarchy.
- `AC-FIELDS-3`: Existing detail, back, and playback flows remain functional.
- `AC-FIELDS-4`: Desktop detail flow remains available.

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
  - Detail state with multiple public fields
  - Empty public fields state
  - Mobile card-like field presentation

## BDD Scenarios

- `BDD: field label and value expose stable markers -> Given the showroom detail fields render / When tests query the field nodes / Then the label and value use stable markers that map directly to each public field.`
- `BDD: mobile detail fields become easier to scan -> Given a mobile user opens the showroom detail page / When the field list renders / Then each field is separated as an independent card-like block instead of reading as one continuous table strip.`
- `BDD: desktop detail flow remains intact -> Given a desktop user opens the showroom detail page / When the page renders / Then the existing detail, back, and playback path remains available.`

## RED Command And Expected Failure

RED:

- `npm test -- --run src/showroom-app.test.js`
- Expected failure:
  - Current field markup does not expose dedicated label/value markers for each field card.

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run src/showroom-app.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test tests/showroom-app.spec.js --reporter=line` -> PASS

## Verification Notes

Verification:

- Unit test confirms each public field now exposes `data-company-field-label` and `data-company-field-value`.
- Playwright mobile viewport confirms consecutive fields are visually separated into independent cards with non-zero border radius and visible background.
- Existing detail, sticky action bar, and playback paths remain green.

## Blockers And Follow-Up Skills

Blockers:

- None.
