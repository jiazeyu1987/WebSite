# Task: Website 切换到单一聚合接口并删除旧消费路径

## Goal

让 `D:\ProjectPackage\Website` 的 `/showroom` 与根 `/` kiosk 都只读取 `IntRuoyi` 的单一聚合接口，不再消费旧的 `app-config`、`display/company`、`display/product/{id}` 路径。

## Scope

- `D:\ProjectPackage\Website\src\showroom-api.js`
- `D:\ProjectPackage\Website\src\showroom-app.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\showroom-api.test.js`
- `D:\ProjectPackage\Website\src\showroom-app.test.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\showroom-app.spec.js`
- `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260522-website-aggregate-interface-cutover\**`

## Non-Scope

- 不修改 `IntRuoyi` 代码或数据库
- 不新增 fallback、双写兼容或客户端翻译逻辑
- 不为适配测试保留旧消费路径

## Dependencies

- `D:\ProjectPackage\Int\IntRuoyi\doc\tasks\20260522-showroom-display-bilingual-detail-contract\**`
- `D:\ProjectPackage\Website\doc\tasks\20260522-website-single-aggregate-contract-adaptation\website-adaptation-plan.md`
- `Vitest / Playwright` 可运行

## Milestones

1. 建立任务记录并锁定“只读单一聚合接口”的 cutover 目标。
2. 调整 Website 接口适配层，删除旧消费路径依赖。
3. 调整 `/showroom` 和根 `/` kiosk 的运行时消费逻辑。
4. 完成单测与 Playwright 回归，更新任务证据。

## Expected Verification

- `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/medical-kiosk.test.js`
- `npx playwright test tests/showroom-app.spec.js tests/kiosk-detail.spec.js --reporter=line`

## Current Status

- Status: Completed
- Completed work:
  - 已建立本次 cutover 任务记录。
  - 已将 `src/showroom-api.js` 切到以 `SHOWROOM_WEBSITE_CONFIG_ENDPOINT` 为唯一展示数据入口，并删除旧消费路径对应的 fetch 依赖。
  - 已将 `/showroom` 切到只读聚合接口。
  - 已将根 `/` kiosk 切到只读聚合接口，并删除产品详情二次请求链路。
  - 已同步更新 `showroom-api`、`showroom-app`、`medical-kiosk` 的单测和 `showroom-app`、`kiosk-detail`、`kiosk-gallery` 的 Playwright 用例。
- Remaining blockers:
  - 当前真实 `IntRuoyi` 运行态是否已经稳定提供最终聚合路径，需要在后续联调时继续确认；Website 不再回退旧接口。

## Final Verification Result

- PASS: `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/medical-kiosk.test.js src/medical-kiosk-title-icons.test.js`
- PASS: `npx playwright test tests/showroom-app.spec.js tests/kiosk-detail.spec.js --reporter=line`
- PASS: `npx playwright test tests/kiosk-gallery.spec.js --reporter=line`
