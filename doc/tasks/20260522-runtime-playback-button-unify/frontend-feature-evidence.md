# Frontend Feature Evidence

## Task

- Task ID: `20260522-runtime-playback-button-unify`
- Feature: 运行时播放/暂停按钮样式统一
- Status: Completed

## Acceptance

- PASS: 根路径 kiosk 公司详情左下播控区继续作为视觉基线，并改为共享播放按钮表现层。
- PASS: 根路径 kiosk 的展厅/产品语音面板播放按钮改为统一图标卡片样式，按钮内不再显示可见文字。
- PASS: `/showroom` 桌面详情页与移动端底部栏播放按钮改为统一图标卡片样式，按钮内不再显示可见文字。
- PASS: 全部真实播放入口保留既有事件选择器，并补齐 `aria-label` / `title` 语义；播放中统一显示暂停图标。
- PASS: 移动端仍保持首屏可见或底部可见，不出现横向溢出或布局回退。

## BDD

- `BDD: runtime playback buttons reuse the company-detail icon card -> Given 用户位于 kiosk 或 /showroom 的任一真实播放入口 / When 按钮渲染或切换播放状态 / Then 按钮使用统一图标卡片样式、无可见文字、播放态切为暂停图标，并保留原有 aria 语义与事件入口。`
- `BDD: mobile playback keeps the shared style without layout regression -> Given 用户在移动端查看 /showroom 详情页或 kiosk 语音入口 / When 播放按钮渲染 / Then 底部栏与语音面板中的按钮保持同视觉缩放样式，仍在首屏或可见区域内且不溢出。`

## TDD Evidence

- `RED: npm test -- --run src/medical-kiosk.test.js src/showroom-app.test.js -> FAIL, kiosk 与 /showroom 仍使用各自按钮皮肤；测试断言要求共享 runtime-playback-button 类、无可见文字与统一图标状态时失败。`
- `GREEN: npm test -- --run src/medical-kiosk.test.js src/showroom-app.test.js -> PASS, 25 tests.`
- `GREEN: npx playwright test tests/kiosk-detail.spec.js tests/kiosk-gallery.spec.js tests/showroom-app.spec.js --reporter=line -> PASS, 21 tests.`
- `GREEN: npm run build -> PASS.`

## Entry Points And Owned Files

- Routes:
  - `/`
  - `/showroom`
- Owned files:
  - `D:\ProjectPackage\Website\src\main.js`
  - `D:\ProjectPackage\Website\src\runtime-playback-button.js`
  - `D:\ProjectPackage\Website\src\runtime-playback-button.css`
  - `D:\ProjectPackage\Website\src\medical-kiosk.js`
  - `D:\ProjectPackage\Website\src\medical-kiosk.css`
  - `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
  - `D:\ProjectPackage\Website\src\showroom-app.js`
  - `D:\ProjectPackage\Website\src\showroom-app.css`
  - `D:\ProjectPackage\Website\src\showroom-app.test.js`
  - `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
  - `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
  - `D:\ProjectPackage\Website\tests\showroom-app.spec.js`

## API Contracts And Data States

- 继续消费现有 `showroom/display/website-config` 单一聚合接口。
- 不改动公司、展厅、产品的音频字段、公开字段和映射 contract。
- 不新增 fallback、mock 成功路径、兼容分支或静默降级。

## Verification

- PASS: `npm test -- --run src/medical-kiosk.test.js src/showroom-app.test.js`
- PASS: `npx playwright test tests/kiosk-detail.spec.js tests/kiosk-gallery.spec.js tests/showroom-app.spec.js --reporter=line`
- PASS: `npm run build`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-runtime-playback-button-unify/frontend-feature-evidence.md`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-runtime-playback-button-unify --mode preview`
- PASS: Playwright 已覆盖 root `/` 与 `/showroom` 的 desktop / mobile 真实前端路径，确认四处播控均为统一图标卡片样式。

## Blockers

- None.
