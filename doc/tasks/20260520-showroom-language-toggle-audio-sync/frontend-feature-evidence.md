# Feature

Showroom language toggle syncs text and audio.

## Acceptance

- Add a Chinese/English toggle in the showroom frontstage.
- Company page switches subtitle text and audio source together.
- Product detail switches name, subtitle text, and audio source together.
- The selected language persists across showroom re-entry.
- The kiosk root entry remains unaffected.

## BDD:

- Given the showroom app-config contains Chinese and English company content
- When the user switches the page language
- Then the company subtitle and company audio source switch together

- Given the selected product contains Chinese and English fields
- When the user switches the page language
- Then the product text and product audio source switch together

- Given the kiosk homepage remains the root entry
- When the user opens `/`
- Then the new showroom language state does not replace the kiosk homepage

## RED:

- `npm test -- --run` -> FAIL, showroom consumer had no language state, no toggle controls, and no audio-source synchronization.

## GREEN:

- `npm test -- --run` -> PASS
- `npm run build` -> PASS
- `npx playwright test --reporter=line` -> PASS

## Verification

- `src/showroom-app.test.js` covers company-language switching, product-language switching, and persisted language recovery.
- `tests/showroom-app.spec.js` verifies real browser DOM switching also changes the active `audio src`.
- `src/main-entry.test.js` and `tests/run-website-bat.test.js` keep the kiosk root entry intact.

## Blockers

- None.
