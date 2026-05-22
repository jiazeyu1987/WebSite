# Frontend Feature Evidence

## Feature

- Goal: 将 kiosk 桌面双列页统一调整为底部保留约 45px 空白，并让右栏长文通过卡片内部滚动查看。
- Non-goals:
  - 不改移动端双列/底部面板逻辑
  - 不改后端 contract、数据来源或音频行为
  - 不改左图“拉伸铺满”策略

## Acceptance

- `AC-DUAL-1`: 桌面首页双列布局中，左侧主图和右侧讲解栏底部相对视口底边保留约 45px 可见空白。
- `AC-DUAL-2`: 右侧讲解栏长文时不再把整列继续向下撑满，正文区域改为卡片内部竖向滚动。
- `AC-DUAL-3`: 公司详情等同类桌面双列页沿用同一套底部留白规则。
- `AC-DUAL-4`: 左侧图片继续允许按容器拉伸铺满显示。

## Entry Points And Owned Files

- Route: 根路径 `/`
- Views:
  - 首页 `home` 双列布局
  - 公司详情双列布局
- Files:
  - `D:\ProjectPackage\Website\src\medical-kiosk.css`
  - `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
  - `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`

## API Contracts And Data States

- 继续消费现有 `website-config` 聚合数据。
- 不改 loading / error / empty 数据态。
- 不新增 fallback 或 mock 成功分支。

## BDD Scenarios

- `BDD: desktop dual-column pages keep a bottom gap and scroll inside the right panel -> Given 用户在桌面横屏查看 kiosk 首页或公司详情双列页 / When 页面渲染且右侧文案超过可见高度 / Then 左右两列底部都应保留约 45px 可见空白，右栏只在卡片内部竖向滚动查看全文，左侧图片继续按容器拉伸铺满。`

## RED

RED:

- `npx vitest run src/medical-kiosk.test.js -t "applies the desktop bottom gap and keeps the narration copy inside an internal scroll container"` -> FAIL, 当前样式中还没有 `--kiosk-desktop-bottom-gap` 规则。
- `npx playwright test tests/kiosk-gallery.spec.js --grep "desktop dual-column bottom gap|company detail dual-column bottom gap" --reporter=line` -> FAIL, 首页主图与公司详情内容区底边超出视口底边，目标底部空白未形成。

## GREEN

GREEN:

- `npx vitest run src/medical-kiosk.test.js` -> PASS
- `npx playwright test tests/kiosk-gallery.spec.js --grep "desktop dual-column bottom gap|company detail dual-column bottom gap" --reporter=line` -> PASS
- `npx playwright test tests/kiosk-gallery.spec.js --reporter=line` -> PASS
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-desktop-dual-column-bottom-gap/frontend-feature-evidence.md` -> PASS
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-desktop-dual-column-bottom-gap --mode preview` -> PASS

## Verification

- Desktop: 首页与公司详情双列页都验证底部空白与内部滚动。
- Mobile: 仅回归确认移动端紧凑语音面板不受影响。
- Accessibility: 保留现有语音控制按钮的 `aria-label` 与交互语义。
- Home desktop: 左侧主图与右侧语音卡片底边都保持约 45px 留白，右侧长文在 `[data-voice-copy]` 内部滚动。
- Company desktop: 公司详情内容区与右侧语音卡片底边都保持约 45px 留白，左侧图片继续铺满其容器。

## Blockers

- 无
