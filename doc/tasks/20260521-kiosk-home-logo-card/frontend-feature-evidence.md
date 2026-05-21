# Frontend Feature Evidence

## Feature Goal And Non-Goals

- Goal: 让根首页 `medical-kiosk` 的红框卡片区只显示一个公司 Logo 卡片，并保留其余展厅和产品详情交互。
- Non-goals:
  - 不改 `/showroom`。
  - 不接入新的远程 Logo API。
  - 不改非首页展厅的产品卡矩阵和详情页结构。

## Requirements And Acceptance IDs

- `AC-HOME-1`: 首页主卡片区只显示一个公司 Logo 卡片。
- `AC-HOME-2`: 首页不得再渲染任何 `data-product-card` 产品卡片。
- `AC-HOME-3`: 右侧 `语音讲解` 面板和首页标题保持可见。
- `AC-HOME-4`: 切换到 `心内介入展厅` 后，产品卡片和详情页路径继续可用。
- `AC-HOME-5`: 根路径 `/` 的整体 kiosk 入口不变。

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Runtime component: `D:\ProjectPackage\Website\src\medical-kiosk.js`
- Styles: `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Unit test: `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- Browser tests: `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`, `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`

## API Contracts And Data States

- API contracts: None. 继续使用本地 kiosk 数据。
- Data states:
  - Home state: one company logo card, no product cards.
  - Hall state: existing product card grid remains available.
  - Detail state: existing product detail remains available from non-home halls.

## BDD Scenarios

- `BDD: home gallery shows only one company logo card -> Given the user opens the kiosk root homepage / When the active category is \`首页\` / Then the main card region must render exactly one company logo card and no product cards.`
- `BDD: gallery detail flow still works from a non-home hall -> Given the homepage no longer shows product cards / When the user switches to \`心内介入展厅\` and clicks the first product card / Then the existing product detail page must still open and return to that hall gallery.`
- `BDD: home swipe and hall navigation remain available -> Given the homepage now shows a single logo card / When the user swipes or clicks the category arrows / Then the app must still switch into the next hall and render that hall's product grid.`

## RED Command And Expected Failure

RED:

- `npm test -- --run src/medical-kiosk.test.js`
- Expected failure:
  - 首页当前仍渲染整组产品卡片，没有单独的公司 Logo 卡片。
  - 详情测试当前仍默认从首页首张产品卡进入，不符合新首页行为。

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run src/medical-kiosk.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line` -> PASS

## Responsive, Accessibility, Loading, Empty, Error, And Permission Checks

- Responsive: 首页单卡片在桌面与移动宽度都应保持完整可见。
- Accessibility: Logo 卡片为可识别内容块；分类切换按钮保持可操作。
- Loading: Not applicable for local kiosk data.
- Empty: 首页卡片区不允许出现空白网格占位卡。
- Error: 不新增隐藏错误分支。
- Permission: Not applicable.

## E2E Or Component Verification Path

- 打开 `/`
- 观察首页只剩一个公司 Logo 卡片
- 切到 `心内介入展厅`
- 点击首个产品卡片进入详情页
- 点击返回按钮回到该展厅卡片墙

## Blockers And Follow-Up Skills

- Blockers: None.
- Follow-up skills: `task-closeout-cleanup`
