# Task: Kiosk Title Showroom Icons

## Goal

在 `D:\ProjectPackage\Website` 的 `medical-kiosk` 顶部标题条中，为来自 `官网数据.xlsx` 的 7 个展厅文字签名补上对应的 SVG icon；首页分类继续保持原有仅文字表现，不引入 fallback、占位图或兼容分支。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk-title-icons.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\public\kiosk-hall-icons\**`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-title-showroom-icons\**`

## Non-Scope

- 不改动 `/showroom` 路径下的公司详情应用。
- 不改动产品卡片、详情页文案、语音行为或数据契约。
- 不主动把第 7 个分类文案从“医疗预制件展厅”改成“医疗标准件展厅”。

## Dependencies

- `D:\ProjectPackage\Int\IntRuoyi\resource\官网数据.xlsx` 必须可读取，并能提供 7 个展厅的 SVG 本地路径。
- `doc/tasks/20260521-int-medical-col14-extract/artifacts/images/halls/**` 中的展厅 SVG 必须存在。
- `Vitest`、`Vite build`、`Playwright` 与 closeout preview 脚本必须可运行。

## Milestones

1. 创建任务文档、执行日志与前端证据骨架，确认 Excel 到 7 个展厅 SVG 的映射。
2. 先补 RED 测试，锁定标题条在展厅分类下显示对应 icon、首页不显示展厅 icon 的行为。
3. 实现 icon 资源接入、标题条标记渲染与响应式样式。
4. 跑通单测、构建、浏览器验证、证据校验与 closeout preview，并更新任务文档。

## Expected Verification

- `npm test -- --run src/medical-kiosk-title-icons.test.js`
- `npm run build`
- `npx playwright test tests/kiosk-gallery.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-title-showroom-icons/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-title-showroom-icons --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已定位 `medical-kiosk` 顶部标题条是本次唯一需要接入展厅 icon 的前端入口。
  - 已确认 `官网数据.xlsx` 的 `展厅` sheet 提供 7 条 `ICON默认本地路径`，并指向仓库中的 SVG。
- Verification evidence:
  - `D:\ProjectPackage\Int\IntRuoyi\resource\官网数据.xlsx`
  - `D:\ProjectPackage\Website\doc\tasks\20260521-int-medical-col14-extract\artifacts\images\halls\`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - 已先在现有测试中补 RED 断言，锁定“7 个展厅标题显示 Excel 对应 SVG icon、首页保持无 icon”的行为。
  - 已把该回归覆盖隔离到独立的 `src/medical-kiosk-title-icons.test.js`，避免改动 `src/medical-kiosk.test.js` 中与本任务无关的遗留首页公司详情用例。
  - 已在 `tests/kiosk-gallery.spec.js` 补充首页无 icon、心内展厅标题出现 `cardiology.svg` 的真实浏览器断言。
  - 已执行一轮 RED，确认当前失败点就是标题条尚未渲染 `[data-active-category-icon]`。
- Verification evidence:
  - `D:\ProjectPackage\Website\src\medical-kiosk-title-icons.test.js`
  - `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
  - `npm test -- --run src/medical-kiosk.test.js` (RED)
- Remaining blockers:
  - 前端 icon 资源与标题条渲染尚未实现。

### Milestone 3

- Status: Completed
- Completed work:
  - 已将 Excel `展厅` sheet 对应的 7 个 `icon-default.svg` 复制到 `public/kiosk-hall-icons/` 作为前端静态资源。
  - 已在 `src/medical-kiosk.js` 中为 7 个非首页分类建立 icon 映射，并只在活动展厅标题下渲染装饰性 SVG icon。
  - 已在 `src/medical-kiosk.css` 中补充标题条 icon 的布局、尺寸与响应式间距样式。
- Verification evidence:
  - `D:\ProjectPackage\Website\public\kiosk-hall-icons\`
  - `D:\ProjectPackage\Website\src\medical-kiosk.js`
  - `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - 已跑通独立标题 icon 单测、生产构建与 Playwright 浏览器路径验证。
  - 已完成前端证据文档更新，并准备执行 closeout preview。
- Verification evidence:
  - `npm test -- --run src/medical-kiosk-title-icons.test.js`
  - `npm run build`
  - `npx playwright test tests/kiosk-gallery.spec.js --reporter=line`
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-title-showroom-icons/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-title-showroom-icons --mode preview`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 已完成代码入口定位与 Excel/SVG 资源映射确认。
  - 已完成 RED 测试并锁定失败点。
  - 已完成 7 个展厅标题 icon 资源接入、标题条渲染、样式适配与真实浏览器验证。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk-title-icons.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test tests/kiosk-gallery.spec.js --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-title-showroom-icons/frontend-feature-evidence.md`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-title-showroom-icons --mode preview`

## Cleanup Candidates

- `doc/tasks/20260521-kiosk-title-showroom-icons/frontend-feature-evidence.md`

## Cleanup Keep

- `doc/tasks/20260521-kiosk-title-showroom-icons/task.md`
- `doc/tasks/20260521-kiosk-title-showroom-icons/execution-log.md`
- `public/kiosk-hall-icons/`
- `src/medical-kiosk.js`
- `src/medical-kiosk.css`
- `src/medical-kiosk-title-icons.test.js`
- `tests/kiosk-gallery.spec.js`
