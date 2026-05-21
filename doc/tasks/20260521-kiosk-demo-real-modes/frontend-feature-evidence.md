# Frontend Feature Evidence

## Feature Goal And Non-Goals

- Goal: 在根首页 kiosk 中增加 `演示模式 / 真实模式` 两种数据源切换。
- Non-goals:
  - 不改 `/showroom`
  - 不改 IntRuoyi 后端合同
  - 不允许真实模式失败时静默回落到演示模式

## Requirements And Acceptance IDs

- `AC-MODE-1`: 页面内必须提供 `演示模式 / 真实模式` 显式切换控件
- `AC-MODE-2`: 演示模式必须使用本地虚拟数据且不触发远程请求
- `AC-MODE-3`: 真实模式必须使用 IntRuoyi 公开数据
- `AC-MODE-4`: 真实模式失败时必须显示显式错误态
- `AC-MODE-5`: 模式选择必须在刷新后保持

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Runtime component: `D:\ProjectPackage\Website\src\medical-kiosk.js`
- Styles: `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Unit test: `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- Browser tests: `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`, `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`

## API Contracts And Data States

- `真实模式` data source:
  - `GET /showroom/display/app-config`
  - `GET /showroom/display/product/{id}`
- `演示模式` data source:
  - local virtual company / hall / product data in frontend code
- States:
  - mode = `demo`
  - mode = `real`
  - real-mode loading
  - real-mode error

## BDD Scenarios

- `BDD: demo mode renders virtual kiosk data without remote requests -> Given the user switches to \`演示模式\` / When the kiosk re-renders / Then homepage, company detail, hall gallery, and product detail must use local virtual data and must not call IntRuoyi.`
- `BDD: real mode renders IntRuoyi data and fails fast on backend errors -> Given the user switches to \`真实模式\` / When the kiosk requests IntRuoyi public data / Then the kiosk must render the real company/hall/product content or show an explicit error state without falling back to demo mode.`
- `BDD: mode selection persists across reloads -> Given the user selected either \`演示模式\` or \`真实模式\` / When the page reloads / Then the kiosk must restore the last selected mode from local storage.`

## RED Command And Expected Failure

RED:

- `npm test -- --run src/medical-kiosk.test.js`
- Expected failure:
  - 当前页面还没有模式切换控件
  - 演示模式和真实模式没有独立数据源
  - 刷新后不会恢复模式选择

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run src/medical-kiosk.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line` -> PASS

## Responsive, Accessibility, Loading, Empty, Error, And Permission Checks

- Responsive: 模式切换控件在桌面和移动宽度可操作
- Accessibility: 模式切换控件保持原生按钮语义
- Loading: 真实模式切换时显示显式 loading
- Empty: 演示模式与真实模式都不得出现空白主区域
- Error: 真实模式失败必须显示显式错误文案
- Permission: 仅真实模式依赖匿名公开接口

## E2E Or Component Verification Path

- 打开 `/`
- 切到 `演示模式`
- 观察首页和展厅内容来自虚拟数据
- 切到 `真实模式`
- 观察首页和展厅内容来自真实数据
- 刷新页面，确认模式保持

## Blockers And Follow-Up Skills

- Blockers: None.
- Follow-up skills: `task-closeout-cleanup`
