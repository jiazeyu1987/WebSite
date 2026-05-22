# Execution Log: 20260522-kiosk-homepage-image-fill

BDD: 首页公司详情主图应填满左侧主图区 -> Given 根路径首页已加载公司信息且用户进入公司详情 / When 页面以桌面端布局渲染左侧主图卡片 / Then 主图应基本贴合主图卡片可用宽高，不应因通用 hero 规则覆盖而在卡片内部留下明显空白

BDD: 主图铺满修正不应打乱现有详情结构 -> Given 公司详情继续采用左侧主图加播放区、右侧五张信息卡片的结构 / When 用户打开公司详情 / Then 右侧卡片数量、播放按钮与左右分栏关系应保持不变

RED: `npx playwright test tests/kiosk-company-detail-image-fill.spec.js --reporter=line` -> FAIL, `wrapWidth / mediaWidth = 0.43437156860119447`, 当前公司详情主图包裹层只占左侧主图卡片宽度约 43.4%，未铺满展示区
GREEN: `npx playwright test tests/kiosk-company-detail-image-fill.spec.js --reporter=line` -> PASS
GREEN: `npm test -- --run src/medical-kiosk.test.js` -> PASS
