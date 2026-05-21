BDD: Website consumes showroom app-config -> Given IntRuoyi exposes a stable showroom app-config payload / When Website loads the showroom entry / Then company, hall, product, image, subtitle, and audio content must render from the remote payload.

BDD: Website fails fast on missing backend contract -> Given the showroom backend is unavailable or returns incomplete required fields / When Website boots the showroom entry / Then the UI must show an explicit error state and must not silently fall back to local fake data.

BDD: Final integrated browser path -> Given both repos are delivered / When a real browser opens the Website showroom entry against the real IntRuoyi runtime / Then the user can complete company, hall, and product browsing with real backend data.

RED: `npm test -- --run` -> FAIL, `showroom-api.js` and `showroom-app.js` were missing, `src/main.js` still booted kiosk only, and the kiosk module lacked the detail/speech interactions required by the current regression tests.

GREEN: `npm test -- --run` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test --reporter=line` -> PASS

GREEN: local real-runtime proxy probe -> PASS, Website `/showroom` correctly called the real backend through `vite.config.js` proxy and failed fast with an explicit error state instead of falling back to local fake data.

RED: real browser integration after backend data unblocked -> FAIL, the Website mapper rejected the real payload because `showrooms[0].description` was an explicitly present empty string.

GREEN: `src/showroom-api.test.js` updated with blank-description contract case -> PASS

GREEN: real cross-repo success path -> PASS, after allowing blank showroom descriptions and using the live local backend data, `http://127.0.0.1:4173/showroom` rendered the company page, switched into a real showroom view, displayed product detail text, and exposed `2` audio players.

INFO: Website-side scope W1-W5 is complete.

## Outstanding Blockers

- None.
