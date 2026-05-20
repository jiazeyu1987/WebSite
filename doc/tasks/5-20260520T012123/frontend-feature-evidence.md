# Feature

Admin console page with workbook import/export and config-driven company home, showroom, and product rendering.

## Acceptance

- P1-AC1
- P1-AC2
- P1-AC3
- P2-AC1
- P2-AC2
- P2-AC3
- P3-AC1
- P3-AC2
- P3-AC3
- P4-AC1
- P4-AC2
- P4-AC3

## BDD:

- Given a valid workbook with company, showroom, and product rows
- When the user imports the workbook from the admin console
- Then the homepage, showroom page, and product detail view render from workbook data

- Given an invalid workbook with a product pointing to an unknown showroom
- When the user imports the workbook
- Then the console shows the validation error and keeps the previous config intact

- Given a valid runtime config
- When the user exports the workbook
- Then the downloaded `.xlsx` file preserves the agreed schema

## RED:

- `npm test -- --run` -> FAIL, `createShowroomApp` / workbook modules were not implemented yet and `xlsx` was missing.

## GREEN:

- `npm test -- --run` -> PASS
- `npm run build` -> PASS
- `npx playwright test` -> PASS

## Verification

- Unit tests cover workbook round-trip, unknown showroom rejection, homepage rendering, admin import, and admin export.
- Playwright covers valid import, invalid import, and export download.
- Evidence files were written to `output/playwright/admin-console-error.png` and `output/playwright/config-driven-showroom.png`.

## Blockers

- None.
