BDD: showroom landing renders only one company card -> Given IntRuoyi app-config returns company image and company public fields / When the user opens `/showroom` / Then the page must show exactly one clickable company entry card and must not render hall navigation or product walls.

BDD: showroom landing enters company detail -> Given the user is on the `/showroom` landing card / When the user clicks the company card / Then the page must switch to a company detail screen with a back action, company title, company narration copy, and company public fields.

BDD: company detail play button controls narration audio -> Given the user is viewing the company detail screen with a valid `audioZhUrl` / When the user clicks the play button / Then the app must programmatically play the company audio and update visible playback state text without navigating away.

BDD: company detail fails fast on missing required app-config fields -> Given the backend app-config payload omits `company.publicFields` or any required company media field / When `/showroom` boots / Then the UI must enter an explicit error state and must not fall back to local data or synthetic defaults.

RED: `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js` -> FAIL, `showroom-api.js` 仍强制要求 `showrooms` 非空，`showroom-app.js` 仍停留在旧的公司/展厅/产品状态机，无法满足单卡片公司入口、公司详情与播放状态行为。

GREEN: `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js` -> PASS

GREEN: `npm run build` -> PASS

GREEN: `npx playwright test tests/showroom-app.spec.js --reporter=line` -> PASS

INFO: `/showroom` 已移除旧的展厅导航、产品墙与语言切换，改为单公司卡片入口与程序化中文讲解播放。
