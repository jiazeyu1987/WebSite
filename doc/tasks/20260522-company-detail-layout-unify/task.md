# Task: 公司详情布局与产品详情风格统一

## Goal

将 `Website` 的公司详情页收敛为与产品详情页一致的展示风格，确保：

- 公司详情优先展示 5 张卡片内容，而不是长段正文先铺满页面；
- 公司详情有清晰可见的播音按钮；
- 公司详情整体布局风格与产品详情页统一；
- 继续使用 `IntRuoyi` 返回的公司封面、双语文案与双语音频。

## Scope

- `D:\ProjectPackage\Website\src\showroom-app.js`
- `D:\ProjectPackage\Website\src\showroom-app.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\showroom-app.test.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\showroom-app.spec.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260522-company-detail-layout-unify\**`

## Non-Scope

- 不修改 `IntRuoyi` 接口 contract
- 不修改产品详情字段逻辑
- 不新增 fallback、占位数据或本地假接口

## Milestones

1. 建立任务文档并锁定公司详情布局目标。
2. 先补 RED，覆盖 5 卡片可见、播音按钮可见、公司详情布局与产品详情风格一致。
3. 实现 `/showroom` 与根 `/` 的公司详情结构和样式调整。
4. 运行回归验证并更新任务记录。

## Expected Verification

- `npm test -- --run src/showroom-app.test.js src/medical-kiosk.test.js`
- `npx playwright test tests/showroom-app.spec.js tests/kiosk-gallery.spec.js --reporter=line`

## Current Status

- Status: Completed
- Completed work:
  - 已确认当前公司详情页仍把整段 `subtitleZh/subtitleEn` 作为主正文优先展示
  - 已确认当前结构与产品详情页信息架构不一致
  - 已将 `/showroom` 公司详情改成“头图 + 标题区 + 播音按钮 + 5 卡片 + 讲解稿区”的产品详情式结构
  - 已将根 `/` kiosk 公司详情同步成同样的结构节奏，并把主播音按钮放进详情主区
  - 已保留 `IntRuoyi` 返回的封面、5 张卡片内容、双语讲解稿与双语音频
- Remaining blockers:
  - 无

## Final Verification Result

- PASS: `npm test -- --run src/showroom-app.test.js src/medical-kiosk.test.js`
- PASS: `npx playwright test tests/showroom-app.spec.js tests/kiosk-gallery.spec.js --reporter=line`
- PASS: 真实运行态 `/showroom` 与根 `/` 公司详情均存在可见播音按钮、5 张卡片与讲解稿区
