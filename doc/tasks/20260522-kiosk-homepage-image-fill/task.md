# Task: 首页公司详情主图铺满左侧展示区

## Goal

调整 `Website` 根路径首页进入公司详情后的左侧主图布局，使公司图片在桌面端填满主图区，不再出现主图卡片内部右侧大面积留白；保持现有真实数据链路、详情结构、右侧五张卡片和播放入口不变。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\tests\kiosk-company-detail-image-fill.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260522-kiosk-homepage-image-fill\**`

## Non-Scope

- 不修改 `IntRuoyi` 接口、数据 contract 或真实数据
- 不启用 mock、fallback、兼容分支或占位图片
- 不重做公司详情整体信息架构

## Dependencies

- 既有阻塞任务 `20260522-homepage-detail-runtime-blocker` 已明确归因为上游 live preview 数据缺口，当前作为独立阻塞保留，不影响基于路由拦截的前端布局回归验证
- `Website` 本地 Vite 入口可用于 Playwright 访问
- 现有公司详情真实用户路径：根 `/` 首页 -> 公司详情

## Milestones

1. 建立任务文档并记录“主图应填满左侧主图区”的 BDD 场景与验证目标。
2. 先补会失败的布局断言，证明当前桌面端主图未按预期铺满。
3. 以最小 CSS 修正公司详情主图卡片和图片规则，不影响右侧卡片与播放区域结构。
4. 运行目标回归并更新任务文档、执行日志与前端证据。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npx playwright test tests/kiosk-company-detail-image-fill.spec.js --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-homepage-image-fill/frontend-feature-evidence.md`

## Current Status

- Status: Completed
- Completed work:
  - 已确认前一条未完成任务 `20260522-homepage-detail-runtime-blocker` 实际状态为 `Blocked`，阻塞原因是上游 live preview 数据缺口，不是当前样式问题。
  - 已定位当前首页公司详情主图结构位于 `src/medical-kiosk.js`，主图样式位于 `src/medical-kiosk.css`。
  - 已确认公司详情专用样式声明早于通用 `.kiosk-detail__hero` / `.kiosk-detail__hero-image`，后续通用规则会反向覆盖公司详情主图宽高与网格配置。
  - 已新增桌面端 Playwright 布局回归用例 `company detail media image fills the desktop hero card`，先拿到 RED，证明当前主图包裹层仅占主图卡片宽度约 `43.4%`。
  - 已将公司详情主图卡片、主图容器和主图图片改为更高优先级的专用选择器，覆盖通用 `hero` 样式的网格、内边距和图片尺寸约束。
  - 已完成目标回归验证，确认桌面端公司详情主图可铺满左侧展示区，同时未影响既有 `medical-kiosk` 单测。
- Remaining blockers:
  - 无

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npx playwright test tests/kiosk-company-detail-image-fill.spec.js --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-homepage-image-fill/frontend-feature-evidence.md`
