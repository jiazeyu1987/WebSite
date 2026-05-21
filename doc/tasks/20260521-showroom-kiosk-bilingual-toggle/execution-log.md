BDD: showroom language toggle switches company text and audio -> Given the showroom payload contains Chinese and English company subtitle and audio fields / When the user switches the showroom language from Chinese to English / Then the company subtitle, action labels, and active audio source must switch to English together.

BDD: showroom language toggle persists across reload -> Given the user selected English in `/showroom` / When the showroom app is created again / Then the persisted language state must be restored and English content must render first.

BDD: kiosk language toggle switches product and company copy -> Given the kiosk runtime has Chinese and English company and product fields / When the user switches the kiosk language from Chinese to English / Then the gallery labels, company detail copy, product detail title, and narration copy must switch to English together.

BDD: kiosk language toggle persists across reload -> Given the user selected English in the kiosk / When the kiosk app is created again / Then the persisted language state must be restored and English content must render first.

RED: `npm test -- --run` -> FAIL, showroom and kiosk runtime tests expected language toggle controls, persisted English state, and synchronized English audio/text behavior that the current frontend did not render.

GREEN: `npm test -- --run` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test --reporter=line` -> PASS

INFO: `/showroom` now restores the chosen language, switches company text with the matching narration source, and keeps the public company flow isolated to `/showroom`.

INFO: `/` now restores the chosen language, switches home/company/hall/product copy to the matching language, and keeps kiosk audio playback aligned with the active company or product source.
