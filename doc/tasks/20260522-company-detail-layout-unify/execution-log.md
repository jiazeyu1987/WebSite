BDD: 公司详情首屏优先卡片与播音动作 -> Given 用户进入公司详情页, When 页面渲染公司详情, Then 首屏应优先展示封面、标题、播音按钮与 5 张卡片，而不是先铺满长段讲解正文。
BDD: 公司详情布局与产品详情统一 -> Given 产品详情页已经定义了头图、标题区、动作区与内容区的布局节奏, When 用户查看公司详情页, Then 公司详情应复用同类视觉结构与按钮层级，保持一致的阅读与操作体验。
GREEN: `npm test -- --run src/showroom-app.test.js src/medical-kiosk.test.js` -> PASS
GREEN: `npx playwright test tests/showroom-app.spec.js tests/kiosk-gallery.spec.js --reporter=line` -> PASS
GREEN: 真实运行态验证 -> PASS, `/showroom` 与根 `/` 公司详情都能看到可见播音按钮，字段数均为 5，讲解稿区位于卡片区之后。
