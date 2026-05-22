# Task: 公司详情封面与 5 卡片展示收敛

## Goal

将 `D:\ProjectPackage\Website` 的公司详情展示统一收敛到 `IntRuoyi` 公司信息封面与固定 5 张详情卡片，覆盖 `/showroom` 与根 `/` kiosk 两个页面。

## Scope

- `D:\ProjectPackage\Website\src\showroom-app.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\showroom-api.js`（仅在必要时保持现有 contract，不做 wire shape 变更）
- `D:\ProjectPackage\Website\src\*.test.js`
- `D:\ProjectPackage\Website\tests\*.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260522-company-detail-five-cards\**`

## Non-Scope

- 不修改 `IntRuoyi` 代码或数据库
- 不修改产品详情字段规则
- 不增加 fallback、兼容双写或默认占位文案

## Milestones

1. 建立任务文档并锁定固定 5 卡片规则。
2. 先补 RED 测试，覆盖固定 5 卡片、空值保留、缺字段 fail-fast、封面保持一致。
3. 实现 `/showroom` 与根 `/` kiosk 的固定 5 卡片渲染。
4. 运行回归验证并更新任务记录。

## Expected Verification

- `npm test -- --run src/showroom-app.test.js src/medical-kiosk.test.js`
- `npx playwright test tests/showroom-app.spec.js tests/kiosk-detail.spec.js --reporter=line`

## Current Status

- Status: Completed
- Completed work:
  - 已确认公司首页与公司详情页当前都使用 `company.homeImage`
  - 已将 `/showroom` 与根 `/` kiosk 的公司详情收敛为固定 5 张卡片
  - 已实现固定字段缺项 fail-fast，错误消息精确到缺失 `fieldCode`
  - 已保留字段值为空时的空卡片正文行为
  - 已验证公司首页封面与公司详情封面都继续来自 `company.homeImage`
- Remaining blockers:
  - 当前真实运行态公司英文详情正文多数仍为空字符串；前端现仅负责保留空卡片，不做 fallback

## Final Verification Result

- PASS: `npm test -- --run src/showroom-app.test.js src/medical-kiosk.test.js`
- PASS: `npx playwright test tests/showroom-app.spec.js tests/kiosk-gallery.spec.js tests/kiosk-detail.spec.js --reporter=line`
- PASS: 真实运行态 `/showroom` 与根 `/` 均使用同一公司封面，且中英文模式下公司详情字段数均为 `5`
