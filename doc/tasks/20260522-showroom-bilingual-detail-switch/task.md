# Task: 展厅详情中英文描述与语音切换

## Goal

让 `D:\ProjectPackage\Website` 的展厅公司详情与产品详情支持中英文切换，并且切换时同时联动详情描述与讲解语音。

## Scope

- `D:\ProjectPackage\Website\src\**`
- `D:\ProjectPackage\Website\tests\**`
- `D:\ProjectPackage\Website\doc/tasks/20260522-showroom-bilingual-detail-switch\**`
- 必要时只读分析 `D:\ProjectPackage\Int\IntRuoyi\**`

## Non-Scope

- 不新增 fallback、默认翻译或前端伪造英文详情字段
- 不在未确认 backend contract 前硬编码双语详情文案
- 不顺带重做无关布局

## Dependencies

- `Website` 当前匿名 display contract 必须能提供公司与产品详情的双语描述字段
- `IntRuoyi` 本地 live company app-config 链路可用
- `Vitest / Playwright` 可用于 RED -> GREEN 验证

## Milestones

1. 建立任务记录，确认当前中英文切换已覆盖与未覆盖范围。
2. 先写失败验证，锁定“详情描述与语音必须同切换”的期望行为。
3. 若前置 contract 齐备，则做最小实现并完成回归。
4. 若前置 contract 缺失，则显式阻塞并记录影响。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js src/showroom-app.test.js src/showroom-api.test.js`
- `npx playwright test tests/kiosk-detail.spec.js tests/showroom-app.spec.js --reporter=line`
- 如涉及真实运行时：匿名 `GET /showroom/display/app-config`、`GET /showroom/display/company`、`GET /showroom/display/product/{id}` 可返回满足双语详情切换所需字段

## Current Status

- Status: Completed
- Completed work:
  - 已确认上一任务 [task.md](/D:/ProjectPackage/Website/doc/tasks/20260522-showroom-content-fit-analysis/task.md:1) 已完成，可启动新任务。
  - 已确认 `IntRuoyi` 当前已成为双语详情与双语语音供给方：
    - 匿名 `GET /showroom/display/company`、`GET /showroom/display/app-config`、`GET /showroom/display/product/{id}` 已新增 `bilingualPublicFields`
    - 本地 company live narration / preview source revision mismatch 已修复，匿名 company/app-config 真实链路恢复 `code=0`
  - 已完成 `Website` adapter 改造：
    - `src/showroom-api.js` 现在强校验 `company.bilingualPublicFields` / `product.bilingualPublicFields`
    - 详情渲染不再依赖单语 `publicFields/publicProductFields` 做正文切换
  - 已完成 `/showroom` 公司详情改造：
    - 公司详情字段标签和值按当前语言从 `bilingualPublicFields` 读取
    - 英文字段为空时显式不展示，不回退中文
    - 讲解文案与讲解音频继续按语言切换
  - 已完成根 `/` kiosk 公司详情与产品详情改造：
    - 公司详情字段按 `bilingualPublicFields` 切换
    - 产品详情字段按 `bilingualPublicFields` 切换
    - 产品详情继续保留展厅名、产品编码、预览图和双语讲解音频
  - 已完成定向测试与浏览器回归：
    - `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/medical-kiosk.test.js`
    - `npx playwright test tests/showroom-app.spec.js tests/kiosk-detail.spec.js --reporter=line`
- Remaining blockers:
  - 当前 `IntRuoyi` 实际公司 `bilingualPublicFields.valueEn` 仍为空，因此真实英文字段在公司详情页会显示为空态；这是内容数据缺口，不是 `Website` 切换逻辑缺口。

## Final Verification Result

- PASS: `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/medical-kiosk.test.js`
- PASS: `npx playwright test tests/showroom-app.spec.js tests/kiosk-detail.spec.js --reporter=line`
- PASS: `GET http://127.0.0.1:48081/showroom/display/company` 返回 `code=0`，并带有 `bilingualPublicFields`
- PASS: `GET http://127.0.0.1:48081/showroom/display/app-config` 返回 `code=0`，并带有 `company.bilingualPublicFields`
- PASS: `GET http://127.0.0.1:48081/showroom/display/product/164` 返回 `code=0`，并带有 `bilingualPublicFields`
