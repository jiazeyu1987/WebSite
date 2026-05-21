# Execution Log: Showroom Mobile Landing Fullwidth Controls

- BDD: 手机语言切换区接近整行宽度 -> Given 用户在手机宽度打开 `/showroom` 首页 When 语言切换区渲染 Then 语言切换控件应接近内容区整行宽度，两个语言按钮有更大的触控面积。
- BDD: 手机公司入口卡片接近整行宽度 -> Given 用户在手机宽度打开 `/showroom` 首页 When 公司入口卡片渲染 Then 卡片应接近内容区整行宽度，而不是窄列小卡片。
- BDD: desktop 和详情路径保持可用 -> Given 用户继续从 landing 页进入详情页 When 页面渲染 Then 现有语言切换和公司详情入口路径继续可用。
- RED: `npx playwright test tests/showroom-app.spec.js --reporter=line` -> FAIL, 当前手机 landing 页语言切换区宽度只有 `179.84px`，入口卡片也是窄列左对齐，不满足全宽控件目标。
- GREEN: `npm test -- --run src/showroom-app.test.js` -> PASS
- GREEN: `npm run build` -> PASS
- GREEN: `npx playwright test tests/showroom-app.spec.js --reporter=line` -> PASS
- AUDIT: 2026-05-21 -> 已把手机 landing 页语言切换扩成整行 segmented control，并把公司入口卡片扩成全宽布局，同时保留 landing -> detail 和双语切换路径。
