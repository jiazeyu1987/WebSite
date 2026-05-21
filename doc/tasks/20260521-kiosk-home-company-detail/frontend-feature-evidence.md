# Frontend Feature Evidence

## Feature Goal And Non-Goals

- Goal: 让首页大图卡片可点击进入公司详情，并从 `IntRuoyi app-config` 读取公司详情内容。
- Non-goals:
  - 不改单独的 `/showroom` 页面。
  - 不新增本地公司详情 fallback。
  - 不改非首页展厅的产品详情结构。

## Requirements And Acceptance IDs

- `AC-COMPANY-1`: 首页大图卡片必须支持点击进入公司详情。
- `AC-COMPANY-2`: 公司详情内容必须来自匿名 `GET /showroom/display/app-config` 的 `company` 节点。
- `AC-COMPANY-3`: 请求中必须显示显式 loading 状态，请求失败必须显示显式 error 状态。
- `AC-COMPANY-4`: 公司详情页必须提供返回首页动作。
- `AC-COMPANY-5`: 切到 `心内介入展厅` 后，原有产品卡片墙和详情页路径继续可用。

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Runtime component: `D:\ProjectPackage\Website\src\medical-kiosk.js`
- Styles: `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Unit test: `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- Browser tests: `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`, `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`

## API Contracts And Data States

- Data source: anonymous `GET /showroom/display/app-config`
- Required company contract:
  - `companyId`
  - `name`
  - `homeImageUrl`
  - `subtitleZh`
  - `audioZhUrl`
  - `publicFields`
- Data states:
  - Home hero state
  - Company detail loading state
  - Company detail ready state
  - Company detail error state
  - Existing non-home hall gallery and product detail states

## BDD Scenarios

- `BDD: home hero opens company detail from IntRuoyi -> Given the user is on the homepage hero image / When the user clicks the hero card / Then the left main region must switch to a company detail screen populated from anonymous \`GET /showroom/display/app-config\`.`
- `BDD: company detail shows explicit loading and error states -> Given the homepage company detail depends on remote app-config / When the request is in flight or fails / Then the page must show an explicit loading or error state and must not fall back to local fake data.`
- `BDD: non-home hall detail flow still works -> Given the homepage now opens company detail / When the user switches to \`心内介入展厅\` and clicks the first product card / Then the existing product detail page must still open and return to that hall gallery.`

## RED Command And Expected Failure

RED:

- `npm test -- --run src/medical-kiosk.test.js`
- Expected failure:
  - 首页当前大图不可点击进入公司详情。
  - `medical-kiosk` 当前没有远程公司详情 loading / error / ready 状态。

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run src/medical-kiosk.test.js` -> PASS
- `npm run build` -> PASS
- `npx playwright test kiosk-gallery.spec.js kiosk-detail.spec.js --config output\playwright-direct.config.mjs --reporter=line` -> PASS

## Responsive, Accessibility, Loading, Empty, Error, And Permission Checks

- Responsive: 公司详情在桌面与移动宽度都应可滚动阅读。
- Accessibility: 首页大图入口和公司详情返回按钮保持原生按钮语义。
- Loading: 公司详情远程加载中需显示显式状态。
- Empty: `publicFields: []` 时显示明确空状态。
- Error: 远程请求失败时显示显式错误文案和重试动作。
- Permission: 只复用匿名 `app-config`。

## E2E Or Component Verification Path

- 打开 `/`
- 点击首页大图
- 等待公司详情加载并显示
- 返回首页
- 切到 `心内介入展厅`
- 点击首个产品卡片进入详情页

## Blockers And Follow-Up Skills

- Blockers: None.
- Follow-up skills: `task-closeout-cleanup`
