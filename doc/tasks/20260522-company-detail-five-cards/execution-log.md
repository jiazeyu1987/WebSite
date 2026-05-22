BDD: 公司详情固定 5 卡片 -> Given Website 只读取 IntRuoyi 聚合接口公司信息, When 用户进入 `/showroom` 或根 `/` 的公司详情并切换语言, Then 页面只展示固定 5 个公司字段卡片、标题与正文按当前语言切换、封面统一使用公司封面。
BDD: 公司详情空值与缺项处理 -> Given 固定 5 个字段中某项存在但当前语言值为空, When 页面渲染该语言公司详情, Then 保留该卡片并显示空正文；Given 固定字段整项缺失, When 页面渲染公司详情, Then 进入错误态并报出缺失字段码。
RED: `npm test -- --run src/showroom-app.test.js src/medical-kiosk.test.js` -> FAIL, `/showroom` 与根 `/` 公司详情仍展示 6 个以上字段，且缺失 `stock_info` 时不会进入错误态。
RED: `npx playwright test tests/showroom-app.spec.js tests/kiosk-gallery.spec.js --reporter=line` -> FAIL, 浏览器断言观察到 `/showroom` 渲染 6 张公司卡片、根 `/` 公司详情渲染 7 张公司卡片，且缺固定字段未报错。
GREEN: `npm test -- --run src/showroom-app.test.js src/medical-kiosk.test.js` -> PASS
GREEN: `npx playwright test tests/showroom-app.spec.js tests/kiosk-gallery.spec.js tests/kiosk-detail.spec.js --reporter=line` -> PASS
GREEN: 真实运行态验证 -> PASS, `http://127.0.0.1:4173/showroom` 与 `http://127.0.0.1:4173/` 的公司首页封面与公司详情封面一致，中文与英文模式下公司详情字段数均为 `5`。
