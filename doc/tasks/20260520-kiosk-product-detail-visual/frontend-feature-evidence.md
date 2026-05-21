# Frontend Feature Evidence

## Feature Goal And Non-Goals

- Goal: 在现有医疗展厅首页视觉语言内交付更完整的产品详情页展示态，并产出浏览器截图。
- Non-goals:
  - 不改动 `showroom` 页面。
  - 不接入新的后端接口或图片素材。
  - 不新增 fallback 或隐藏错误分支。

## Requirements And Acceptance IDs

- `ACC-DETAIL-1`: 详情页必须有可点击返回按钮。
- `ACC-DETAIL-2`: 详情页必须有主视觉产品图片区。
- `ACC-DETAIL-3`: 详情页必须有明确的产品描述内容。
- `ACC-DETAIL-4`: 详情页风格必须延续当前蓝白医疗展厅视觉。
- `ACC-DETAIL-5`: 必须通过真实浏览器点击路径完成截图验证。
- `ACC-DETAIL-6`: 详情页不保留额外的四个按钮式控件，界面以阅读为主。
- `ACC-DETAIL-7`: 详情页底部不显示信息卡分组，红框区域整体移除。

## UI Entry Points, Routes, Components, And Owned Files

- Route: `/`
- Entry behavior: 医疗展厅首页点击任一产品卡片进入详情页
- Components / modules:
  - `src/medical-kiosk.js`
  - `src/medical-kiosk.css`
  - `src/medical-kiosk.test.js`

## API Contracts And Data States

- API contracts: None. 使用现有本地产品数据与 SVG 器械示意图。
- Data states:
  - Gallery state
  - Detail state
  - Voice toggle state

## BDD Scenarios

BDD:

- Product detail visual matches kiosk style
- Detail page keeps a real user path
- Product detail favors reading over extra actions
- Product detail hides the bottom card group

## RED Command And Expected Failure

RED:

- `npm test -- --run src/medical-kiosk.test.js`
- Expected failure:
  - 新验收测试会因页面仍保留底部信息卡分组与 `data-product-spec-item` 节点而失败。

## GREEN Command And Passing Result

GREEN:

- `npm test -- --run` -> PASS
- `npm run build` -> PASS
- `npx playwright test tests/kiosk-detail.spec.js --reporter=line` -> PASS

## Responsive, Accessibility, Loading, Empty, Error, And Permission Checks

- Responsive: 桌面横屏详情页截图已验证，详情主图、描述区和信息卡均可读。
- Accessibility: 返回按钮与语音按钮保持原生按钮语义。
- Loading: Not applicable for local kiosk data.
- Empty: Not applicable because kiosk categories already ship with products.
- Error: 不新增隐藏错误分支。
- Permission: Not applicable.

## E2E Or Component Verification Path

Verification:

- 打开 `/`
- 点击首个产品卡片
- 观察详情页中的返回按钮、主图与扩充后的描述区
- 确认右侧原有 4 个按钮式元素已移除
- 确认底部红框区域对应的信息卡分组已完全移除
- 保存截图作为交付产物：`output/playwright/kiosk-detail-page.png`

## Blockers And Follow-Up Skills

- Blockers: None.
- Follow-up skills: `frontend-feature-delivery`
