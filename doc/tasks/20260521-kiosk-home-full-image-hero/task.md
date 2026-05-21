# Task: Kiosk Home Full Image Hero

## Goal

将根路径 `D:\ProjectPackage\Website` 的 `medical-kiosk` 首页红框主区域改成显示用户提供的第一张园区图片，并铺满左侧主展示区域；允许按区域尺寸拉伸显示。其他展厅分类、右侧讲解面板和产品详情路径继续保持可用。

## Scope

- `D:\ProjectPackage\Website\public\**`
- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-home-full-image-hero\**`

## Non-Scope

- 不修改 `/showroom`。
- 不引入新的后端图片接口。
- 不修改非首页展厅的产品详情结构。
- 不要求保持首页图片原始宽高比；本次按“铺满区域，可拉伸”执行。

## Previous Task Check

- Previous same-repo task record: `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-home-logo-card\task.md`
- Status before this task: `Completed`
- Impact: 上一任务已把首页收敛为单内容块，当前可以继续把该内容块从 Logo 卡片替换成用户提供的园区图片。

## Dependencies

- 用户提供图片路径：`C:\Users\BJB110\AppData\Roaming\DingTalk\de78dc71902ffa4b3495_v3\ImageFiles\3c\lQLPJwsG62zGnonNBmrNCSewln_XDRxpYr4J49u4uScUAA_2343_1642.png`
- 根路径 `/` 必须继续渲染 `medical-kiosk`。
- `Vitest`、`Playwright`、`Vite build` 与前端证据校验脚本必须可运行。

## Milestones

1. 创建任务文档、执行日志与前端证据骨架。
2. 先补 RED 测试，锁定“首页显示单张铺满大图，非首页详情路径仍可用”的行为。
3. 将用户图片纳入前端静态资源，并实现首页大图铺满样式与首页讲解文案修正。
4. 跑通单测、构建、浏览器验证、证据校验与 closeout preview。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npm run build`
- `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-home-full-image-hero/frontend-feature-evidence.md`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-home-full-image-hero --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已创建任务目录、执行日志和前端证据骨架。
  - 已确认用户图片文件存在。
- Verification evidence:
  - `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-home-full-image-hero\task.md`
  - `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-home-full-image-hero\execution-log.md`
  - `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-home-full-image-hero\frontend-feature-evidence.md`
- Remaining blockers:
  - Waiting for RED tests and homepage full-image implementation.

### Milestone 2

- Status: Completed
- Completed work:
  - 已先改写 `medical-kiosk` 单测，锁定首页只显示一张铺满区域的大图，且产品详情改从 `心内介入展厅` 进入。
  - 已同步改写 `Playwright` 浏览器用例，锁定首页大图与非首页详情路径。
- Verification evidence:
  - `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
  - `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
  - `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
  - `npm test -- --run src/medical-kiosk.test.js` (RED)
- Remaining blockers:
  - None.

### Milestone 3

- Status: Completed
- Completed work:
  - 已将用户提供图片复制到 `D:\ProjectPackage\Website\public\kiosk-home-hero.png`。
  - 已将首页 `home` 分类改为显示单张铺满主区域的大图，并允许按区域拉伸。
  - 已同步修正首页右侧讲解文案，避免继续描述旧的首页卡片点击行为。
- Verification evidence:
  - `D:\ProjectPackage\Website\public\kiosk-home-hero.png`
  - `D:\ProjectPackage\Website\src\medical-kiosk.js`
  - `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - 已跑通定向单测、构建和浏览器验证。
  - 已更新前端证据文档并完成 closeout preview。
- Verification evidence:
  - `npm test -- --run src/medical-kiosk.test.js`
  - `npm run build`
  - `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line`
  - `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-home-full-image-hero/frontend-feature-evidence.md`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-home-full-image-hero --mode preview`
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 首页左侧主区域已改为显示用户提供的园区大图，并铺满显示区域。
  - 根路径 `/` 继续保持 `medical-kiosk` 入口不变。
  - 切换到其他展厅后，产品卡片墙和详情页路径保持可用。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npm run build`
- PASS: `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260521-kiosk-home-full-image-hero/frontend-feature-evidence.md`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-kiosk-home-full-image-hero --mode preview`
