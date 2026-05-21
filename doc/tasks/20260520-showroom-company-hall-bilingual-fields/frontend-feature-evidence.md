# Feature

Showroom company/hall bilingual fields.

## Acceptance

- Company title supports Chinese and English.
- Hall title supports Chinese and English.
- Hall description supports Chinese and English.
- Language switch still synchronizes the active audio source.

## BDD:

- Given app-config returns bilingual company and hall fields
- When the user toggles language
- Then the rendered company/hall text switches with the current language

## RED:

- `npm test -- --run` -> FAIL, company/hall English fields were missing from the frontend contract.

## GREEN:

- `npm test -- --run` -> PASS
- `npm run build` -> PASS
- `npx playwright test --reporter=line` -> PASS

## Verification

- `src/showroom-api.test.js` covers the expanded contract mapping.
- `src/showroom-app.test.js` covers bilingual company/hall rendering and synchronized audio switching.
- Real runtime `app-config` payload now includes `nameEn` / `descriptionEn`.

## Blockers

- Hall descriptions in the current local runtime are present as empty strings, so the UI is structurally bilingual but not yet content-rich.
