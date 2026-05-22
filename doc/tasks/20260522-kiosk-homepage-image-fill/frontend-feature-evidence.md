# Frontend Feature Evidence

## Feature Goal And Non-Goals

Feature:

- Goal: 让根路径首页进入公司详情后的左侧主图在桌面端铺满主图卡片，不再出现卡片内部大面积空白。
- Non-goals:
  - 不修改 `IntRuoyi` 接口或真实数据
  - 不改变右侧五张公司详情卡片结构
  - 不调整播放按钮的业务逻辑

## Acceptance Criteria

Acceptance:

- `AC-HERO-1`: 桌面端公司详情主图包裹层应基本占满左侧主图卡片宽度。
- `AC-HERO-2`: 公司详情图片应基本占满主图包裹层宽高。
- `AC-HERO-3`: 左图、左下播放区、右侧五张卡片的整体结构保持不变。

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/`
- Entry: `D:\ProjectPackage\Website\src\main.js`
- Styles: `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Browser test: `D:\ProjectPackage\Website\tests\kiosk-company-detail-image-fill.spec.js`

## API Contracts And Data States

- API contract: 保持现有 `GET /showroom/display/website-config` 前端消费方式不变。
- Data states:
  - 首页公司入口卡片
  - 公司详情页主图卡片
  - 公司详情右侧五张固定卡片

## BDD Scenarios

- `BDD: 首页公司详情主图应填满左侧主图区 -> Given 根路径首页已加载公司信息且用户进入公司详情 / When 页面以桌面端布局渲染左侧主图卡片 / Then 主图应基本贴合主图卡片可用宽高，不应在卡片内部留下明显空白。`
- `BDD: 主图铺满修正不应打乱现有详情结构 -> Given 公司详情继续采用左侧主图加播放区、右侧五张信息卡片的结构 / When 用户打开公司详情 / Then 右侧卡片数量、播放按钮与左右分栏关系应保持不变。`

## RED Command And Expected Failure

RED:

- `npx playwright test tests/kiosk-company-detail-image-fill.spec.js --reporter=line`
- Expected failure:
  - 当前 `wrapWidth / mediaWidth = 0.43437156860119447`，主图包裹层仅占主图卡片宽度约 43.4%，未铺满左侧展示区。

## GREEN Command And Passing Result

GREEN:

- `npx playwright test tests/kiosk-company-detail-image-fill.spec.js --reporter=line` -> PASS
- `npm test -- --run src/medical-kiosk.test.js` -> PASS

## Verification Notes

Verification:

- 已将公司详情主图卡片改为更高优先级的单列布局规则，避免被通用 `.kiosk-detail__hero` 重新切回双列。
- 已移除公司详情主图容器继承自通用 hero 的内边距，让图片可真正贴合卡片可用区域。
- 已移除公司详情图片继承自通用 hero 的 `max-height` 限制，保证图片按卡片尺寸完整铺满。
- Playwright 桌面端真实用户路径回归通过，证明主图已占满主图卡片。
- `medical-kiosk` 单测回归通过，说明当前样式修正未破坏既有结构与交互逻辑。

## Blockers And Follow-Up Skills

Blockers:

- None.
