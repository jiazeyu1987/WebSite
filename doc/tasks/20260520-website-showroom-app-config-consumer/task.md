# Task: Website Showroom App Config Consumer

## Goal

让 `D:\ProjectPackage\Website` 的展厅前端从 `IntRuoyi` showroom 后端聚合接口读取真实运行数据，并基于该接口渲染公司主页、展厅页和产品页。

## Scope

- `D:\ProjectPackage\Website\src\**`
- `D:\ProjectPackage\Website\tests\**`
- `D:\ProjectPackage\Website\doc\tasks\20260520-website-showroom-app-config-consumer\**`

## Non-Scope

- 不修改 `IntRuoyi` 数据表、Java Controller、Service 或 SQL。
- 不把 `.xlsx` 工作簿继续作为生产运行主数据源。
- 不引入前端运行时 fallback 到本地假数据。

## Dependencies

- `IntRuoyi` 必须提供稳定的前台聚合接口，建议为 `GET /showroom/display/app-config`。
- 若后端接口尚未实现，前端只能基于已确认的 JSON contract 做单测和适配开发；生产运行时仍必须 fail fast。

## Milestones

1. 确认 Website 最终展厅入口策略，避免再次误改当前 kiosk 根入口。
2. 新增 showroom API adapter、DTO/mapper 与远程加载状态管理。
3. 让公司、展厅、产品、双语字幕、双语音频、预览图全部从远程 app-config 渲染。
4. 加入前端单测、契约测试与浏览器路径验证，保证后端不可用时明确报错而不是静默降级。
5. 与 `IntRuoyi` 任务完成联调后，执行最终真实集成测试。

## Expected Verification

- `npm test -- --run`
- `npm run build`
- `npx playwright test`
- 联调后真实请求 `IntRuoyi` runtime 的集成浏览器验证

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 保留 `src/main.js` 的 kiosk 根入口。
  - 新增 `/showroom` 路径分流，避免再次误替换根首页。
- Verification evidence:
  - `src/main.js`
  - `src/main-entry.test.js`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - 新增 `src/showroom-api.js`，定义 app-config endpoint、payload 校验与 contract mapping。
  - 所有关键字段缺失都会 fail fast。
- Verification evidence:
  - `src/showroom-api.js`
  - `src/showroom-api.test.js`
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - 新增 `src/showroom-app.js` 与 `src/showroom-app.css`。
  - `/showroom` 页面现在支持远程 loading、success、error 三种状态，并渲染公司、展厅、产品、双语字幕和双语音频。
- Verification evidence:
  - `src/showroom-app.js`
  - `src/showroom-app.css`
  - `src/showroom-app.test.js`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - 增加浏览器验证，覆盖根入口 kiosk 保持不变、`/showroom` 成功消费 app-config、后端异常时 fail fast。
  - 同时补齐 kiosk 产品详情与语音交互，使现有回归测试链路恢复通过。
- Verification evidence:
  - `npm test -- --run`
  - `npm run build`
  - `npx playwright test --reporter=line`
- Remaining blockers:
  - None.

### Milestone 5

- Status: Completed
- Completed work:
  - 已准备好前端 consumer 与 mocked browser verification。
  - 已新增 `vite.config.js`，支持本地联调时将 `/showroom/display` 与 `/admin-api/infra/file` 代理到 `IntRuoyi` runtime。
  - 已执行真实运行时联调检查，确认匿名访问已打通。
  - 已修正前端 contract mapper 对空 `showroom.description` 的误判。
  - 已在真实 `http://127.0.0.1:4173/showroom` 路径完成联调，页面成功渲染公司主页、展厅切换、产品详情与音频元素。
- Verification evidence:
  - `tests/showroom-app.spec.js`
  - `vite.config.js`
  - real browser probe on `http://127.0.0.1:4173/showroom`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 已完成 Website 侧 W1-W5 开发与验证。
  - 当前页面在 `/showroom` 路径下消费远程 app-config contract，并已完成本地真实联调渲染。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run`
- PASS: `npm run build`
- PASS: `npx playwright test --reporter=line`
- PASS: local real-browser integration on `http://127.0.0.1:4173/showroom`
