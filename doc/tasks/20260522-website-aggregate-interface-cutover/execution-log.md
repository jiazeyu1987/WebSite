BDD: Website reads one aggregate payload only -> Given IntRuoyi provides a single anonymous aggregate showroom interface / When Website loads showroom data for either `/showroom` or root kiosk / Then it must read exactly that aggregate payload and must not request a second product detail interface.
BDD: Website fails fast when the aggregate interface is unavailable -> Given the aggregate endpoint is missing or returns an error / When Website boots / Then it must surface the explicit backend failure and must not fall back to the old app-config or product detail paths.
INFO: Started Website aggregate interface cutover task.
GREEN: Website showroom adapter now uses the aggregate endpoint entry and no longer consumes the old product detail second-hop path.
GREEN: `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/medical-kiosk.test.js src/medical-kiosk-title-icons.test.js` -> PASS.
GREEN: `npx playwright test tests/showroom-app.spec.js tests/kiosk-detail.spec.js --reporter=line` -> PASS.
GREEN: `npx playwright test tests/kiosk-gallery.spec.js --reporter=line` -> PASS.
