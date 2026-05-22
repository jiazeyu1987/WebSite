# Task: 统一运行时播放/暂停按钮样式

## Goal

统一 `D:\ProjectPackage\Website` 当前真实运行入口内所有播放/暂停按钮样式，覆盖根路径 kiosk 与 `/showroom`，全部复用公司详情页红框中的图标卡片播控视觉，并保持现有真实数据来源、事件语义、播放逻辑与路由边界不变。

## Scope

- `D:\ProjectPackage\Website\doc\tasks\20260522-runtime-playback-button-unify\**`
- `D:\ProjectPackage\Website\src\main.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\src\showroom-app.js`
- `D:\ProjectPackage\Website\src\showroom-app.css`
- `D:\ProjectPackage\Website\src\showroom-app.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\tests\showroom-app.spec.js`

## Non-Scope

- 不修改 `src/main.js` 的路由分发边界
- 不修改 API contract、真实数据来源、字段映射或播放业务逻辑
- 不修改 `V0\**`、`PAD`、`横板`、`竖版` 原型目录
- 不新增 fallback、兼容分支、mock 成功路径或测试专用控件

## Dependencies

- `D:\ProjectPackage\Int\IntPP\FRONTEND_STYLE.md` 已作为当前前端基线读取
- 本地 `vitest`、`playwright`、`vite` 开发服务与 UTF-8 读写环境可用
- 最近相关任务 `20260522-kiosk-company-detail-icon-only-playback`、`20260522-kiosk-desktop-dual-column-bottom-gap`、`20260522-public-voice-card-local-update` 已核对为 `Completed`
- 当前工作区已存在未提交 kiosk 相关改动，本次实现必须在现状上叠加，不得回退

## Milestones

1. 建立任务文档并补 BDD 场景，确认前序任务状态不阻塞本次统一。
2. 先补 RED 测试，锁定 kiosk 与 `/showroom` 全部真实播控入口的统一图标卡片行为。
3. 以最小实现提取共享播放控件表现层，并接入 kiosk 与 `/showroom`。
4. 运行单测、Playwright、证据校验与 closeout 预览，更新任务状态与验证结果。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js src/showroom-app.test.js`
- `npx playwright test tests/kiosk-detail.spec.js tests/kiosk-gallery.spec.js tests/showroom-app.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-runtime-playback-button-unify/frontend-feature-evidence.md`
- `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-runtime-playback-button-unify --mode preview`

## Cleanup Candidates

- `doc/tasks/20260522-runtime-playback-button-unify/frontend-feature-evidence.md`

## Current Status

- Status: Completed
- Completed work:
  - 已确认当前真实运行入口仅包含 `/` 的 kiosk 与 `/showroom`，本次统一范围不含 `V0\**` 原型目录。
  - 已核对最近相关任务状态为 `Completed`，不阻塞本次统一实现。
  - 已确认当前工作区存在未提交 kiosk 相关改动，本次将基于现状增量叠加。
  - 已新增共享播放控件表现层 `src\runtime-playback-button.js` / `src\runtime-playback-button.css`，统一播放/暂停图标、按钮壳层与尺寸变体。
  - 已将根路径 kiosk 公司详情播控、展厅/产品语音面板播控以及 `/showroom` 桌面与移动端播控全部接入共享按钮表现层，并保留既有事件选择器。
  - 已删除 kiosk 与 `/showroom` 中原先仅服务于文本播控的局部按钮皮肤，改为各自 CSS 只保留布局职责。
  - 已完成 RED 单测、GREEN 单测、Playwright 真实路径验证、生产构建校验、前端证据校验与 closeout 预览。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js src/showroom-app.test.js`
- PASS: `npx playwright test tests/kiosk-detail.spec.js tests/kiosk-gallery.spec.js tests/showroom-app.spec.js --reporter=line`
- PASS: `npm run build`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-runtime-playback-button-unify/frontend-feature-evidence.md`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-runtime-playback-button-unify --mode preview`
