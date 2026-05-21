BDD: bilingual toggle switches company and hall text -> Given app-config contains bilingual company and hall fields / When the user switches the showroom page language / Then the company title, hall title, and hall description switch to the selected language.

BDD: bilingual toggle still switches audio with text -> Given the app-config also contains bilingual audio URLs / When the user switches language on company or product views / Then the active text and active audio source switch together.

RED: `npm test -- --run` -> FAIL, frontend contract and showroom consumer had no company/hall English fields.

GREEN: `npm test -- --run` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test --reporter=line` -> PASS

GREEN: real runtime probe -> PASS, `GET /showroom/display/app-config` returned `company.nameEn` and `showrooms[].nameEn/descriptionEn`.
