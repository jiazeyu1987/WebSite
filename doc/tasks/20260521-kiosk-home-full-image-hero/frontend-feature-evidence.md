# Frontend Feature Evidence

## Feature Goal And Non-Goals

- Goal: 让根首页 `medical-kiosk` 左侧主展示区显示一张铺满区域的园区大图，允许拉伸以填满红框区域。
- Non-goals:
  - 不改 `/showroom`。
  - 不新增远程图片加载接口。
  - 不改非首页展厅的卡片墙和详情页结构。

## Requirements And Acceptance IDs

- `AC-HERO-1`: 首页左侧主区域只显示一张园区图片。
- `AC-HERO-2`: 图片必须铺满左侧主区域，允许拉伸。
- `AC-HERO-3`: 首页不得渲染旧 Logo 卡片或产品卡片。
- `AC-HERO-4`: 首页标题与右侧 `语音讲解` 面板保持可见。
- `AC-HERO-5`: 切到 `心内介入展厅` 后，产品卡片墙和详情页路径继续可用。

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Runtime component: `D:\ProjectPackage\Website\src\medical-kiosk.js`
- Styles: `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Static asset: `D:\ProjectPackage\Website\public\kiosk-home-hero.png`
- Unit test: `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- Browser tests: `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`, `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`

## API Contracts And Data States

- API contracts: None. 继续使用本地 kiosk 数据和本地静态图片资源。
- Data states:
  - Home state: one full-area hero image, no product cards.
  - Hall state: existing product card grid remains available.
  - Detail state: existing product detail remains available from non-home halls.

## BDD Scenarios

- `BDD: home hero shows one full-area image -> Given the user opens the kiosk root homepage / When the active category is \`首页\` / Then the left main region must render exactly one home hero image and stretch it to fill the red-box area.`
- `BDD: home hero keeps voice panel and title visible -> Given the homepage now uses a full-area image / When the user stays on \`首页\` / Then the page title and right-side \`语音讲解\` panel must remain visible.`
- `BDD: non-home detail flow still works -> Given the homepage no longer shows the old logo card / When the user switches to \`心内介入展厅\` and clicks the first product card / Then the existing product detail page must still open and return to that hall gallery.`

## RED Command And Expected Failure

RED:

- `npm test -- --run src/medical-kiosk.test.js`
- Expected failure:
  - 首页当前仍渲染旧的 Logo 卡片，而不是铺满区域的大图。
  - 首页当前没有用户提供图片对应的静态资源与 `img` 渲染节点。

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run src/medical-kiosk.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line` -> PASS

## Responsive, Accessibility, Loading, Empty, Error, And Permission Checks

- Responsive: 首页大图在桌面和移动宽度都完整铺满左侧主区域。
- Accessibility: 首页图片必须带有明确 `alt` 文本。
- Loading: Not applicable for local static asset.
- Empty: 首页主区域不允许出现空白占位卡。
- Error: 不新增隐藏错误分支。
- Permission: Not applicable.

## E2E Or Component Verification Path

- 打开 `/`
- 观察首页左侧主区域只显示一张园区大图
- 切到 `心内介入展厅`
- 点击首个产品卡片进入详情页
- 点击返回按钮回到该展厅卡片墙

## Blockers And Follow-Up Skills

- Blockers: None.
- Follow-up skills: `task-closeout-cleanup`
