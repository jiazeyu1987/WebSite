# Task: 使用模拟数据验证 Website 聚合接口消费

## Goal

使用模拟数据验证 `D:\ProjectPackage\Website` 当前对单一聚合接口的消费链路，确认在不依赖真实 `IntRuoyi` 运行态的前提下，接口适配层、`/showroom` 和根 `/` kiosk 都能正确处理聚合 payload。

## Scope

- `D:\ProjectPackage\Website\src\showroom-api.test.js`
- `D:\ProjectPackage\Website\src\showroom-app.test.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\showroom-app.spec.js`
- `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260522-website-aggregate-interface-mock-verification\**`

## Non-Scope

- 不修改 `IntRuoyi` 代码或数据库
- 不修改 `Website` 生产代码，除非验证过程发现明确缺陷
- 不依赖真实后端 live 数据

## Milestones

1. 建立任务记录并确认现有 mock 数据入口。
2. 运行基于模拟数据的单测与浏览器回归。
3. 记录验证结果与剩余风险。

## Expected Verification

- `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/medical-kiosk.test.js src/medical-kiosk-title-icons.test.js`
- `npx playwright test tests/showroom-app.spec.js tests/kiosk-detail.spec.js tests/kiosk-gallery.spec.js --reporter=line`

## Current Status

- Status: Completed
- Completed work:
  - 已确认现有测试夹具已改为使用聚合接口 mock 数据。
  - 已完成单测与 Playwright mock 路径回归。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/medical-kiosk.test.js src/medical-kiosk-title-icons.test.js`
- PASS: `npx playwright test tests/showroom-app.spec.js tests/kiosk-detail.spec.js tests/kiosk-gallery.spec.js --reporter=line`
