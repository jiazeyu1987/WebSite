BDD: detail language switch changes description and narration together -> Given a visitor is viewing company detail or product detail / When the visitor switches between Chinese and English / Then the visible detail description and the narration audio source must switch to the selected language together.
BDD: frontend must fail fast when bilingual detail contract is missing -> Given the anonymous showroom display APIs do not provide bilingual detail fields / When Website attempts to implement detail-language switching / Then the task must stop and report the exact missing contract instead of fabricating translated fields on the client.
INFO: Audited Website current state. `/showroom` already switches company title, narration summary, and narration audio between Chinese and English.
INFO: Audited Website current state. Root kiosk already switches company title, hall description, product title, narration summary, and narration audio between Chinese and English.
INFO: Missing scope is detail-field descriptions only. Current Website adapters map `company.publicFields` and `product.publicFields` as single-language arrays.
INFO: Audited IntRuoyi display contracts. Anonymous `app-config`, `display/company`, and `display/product/{id}` responses expose only one `publicFields/publicProductFields` collection each, with no language discriminator and no bilingual field pair.
INFO: Audited IntRuoyi persistence/runtime. Product revisions store English basic-field columns, but `displayProduct -> productFields(...)` currently emits only one public/basic field list. Company runtime `toCompanyFieldMap(...)` and `companyFields(...)` currently emit Chinese-side company fields only.
INFO: IntRuoyi runtime now exposes additive `bilingualPublicFields` on anonymous `display/company`, `display/app-config`, and `display/product/{id}` payloads.
GREEN: `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/medical-kiosk.test.js` -> PASS.
GREEN: `npx playwright test tests/showroom-app.spec.js tests/kiosk-detail.spec.js --reporter=line` -> PASS.
GREEN: real runtime probe `GET http://127.0.0.1:48081/showroom/display/company` -> PASS, returns `code=0` and `bilingualPublicFields`.
GREEN: real runtime probe `GET http://127.0.0.1:48081/showroom/display/app-config` -> PASS, returns `code=0` and `company.bilingualPublicFields`.
GREEN: real runtime probe `GET http://127.0.0.1:48081/showroom/display/product/164` -> PASS, returns `code=0` and `bilingualPublicFields`.
