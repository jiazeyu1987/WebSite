# Feature

Website showroom app-config consumer.

## Acceptance

- Preserve the kiosk root entry.
- Add a separate showroom consumer path.
- Consume remote showroom app-config data for company, hall, and product pages.
- Fail fast when the backend contract is unavailable or incomplete.
- Pass unit, build, and browser verification for the Website-side scope.

## BDD:

- Given IntRuoyi exposes a showroom app-config payload
- When Website opens `/showroom`
- Then the company page, hall navigation, and product detail content render from the remote payload

- Given the backend app-config endpoint fails or returns incomplete required fields
- When Website opens `/showroom`
- Then the UI shows an explicit error state and does not fall back to local fake data

- Given the kiosk homepage is still the public root entry
- When a user opens `/`
- Then the kiosk homepage still boots instead of the showroom consumer

## RED:

- `npm test -- --run` -> FAIL, `showroom-api.js` and `showroom-app.js` did not exist, `src/main.js` had no showroom path split, and the current kiosk implementation was missing the product-detail/speech interactions expected by existing tests.

## GREEN:

- `npm test -- --run` -> PASS
- `npm run build` -> PASS
- `npx playwright test --reporter=line` -> PASS
- Real browser probe on `http://127.0.0.1:4173/showroom` -> PASS

## Verification

- Contract mapping and fail-fast validation are covered by `src/showroom-api.test.js`.
- Remote loading, page switching, and explicit error rendering are covered by `src/showroom-app.test.js`.
- Browser verification confirms `/` stays kiosk and `/showroom` consumes the mocked backend contract.
- A local real-runtime browser probe confirmed the Website consumer reaches the IntRuoyi runtime and successfully renders the real app-config payload on `/showroom`.

## Blockers

- None for the Website-side delivery scope.
