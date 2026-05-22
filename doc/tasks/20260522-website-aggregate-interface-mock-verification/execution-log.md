BDD: Website aggregate consumer works with mocked payloads -> Given Website reads a single aggregate showroom payload / When tests inject mocked company, hall, product, detail-body, and bilingual audio data / Then the adapter and both UI entrypoints must render and switch language correctly without real backend dependencies.
INFO: Started mock-data verification for the Website aggregate interface consumer.
GREEN: `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/medical-kiosk.test.js src/medical-kiosk-title-icons.test.js` -> PASS.
GREEN: `npx playwright test tests/showroom-app.spec.js tests/kiosk-detail.spec.js tests/kiosk-gallery.spec.js --reporter=line` -> PASS.
