# Task: kiosk 公司详情主图、图标播控与多卡片布局

## Goal

按用户提供的标注图调整 `D:\ProjectPackage\Website` 根路径 kiosk 的公司详情页，确保：

- 红框主区域继续明确显示公司图片；
- 讲解播放/停止入口改为图标化 ICO/SVG 按钮，而不是纯文字主按钮；
- 黄框内容区以若干张公司信息卡片呈现，而不是大段正文占满主体区域；
- 保持现有真实数据来源、公司详情路由与播放主流程不变。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260522-kiosk-company-detail-image-icon-cards\**`

## Non-Scope

- 不修改 `/showroom` 独立公司详情页
- 不修改 `IntRuoyi` 接口 contract、字段结构或数据来源
- 不新增 fallback、占位数据、兼容分支或假播放态

## Milestones

1. 建立任务文档，锁定根路径 kiosk 公司详情页的视觉目标与文件边界。
2. 先补 RED 测试，覆盖主图区、图标化播放/停止按钮、多卡片区域三个可观察行为。
3. 以最小前端改动实现布局与样式调整，并保持真实数据渲染和播控逻辑可用。
4. 运行单测与浏览器验证，更新任务记录、证据与最终状态。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npx playwright test tests/kiosk-gallery.spec.js --grep "kiosk company detail" --reporter=line`

## Current Status

Completed
- Completed work:
  - 已检查前一个相关任务 `20260522-company-detail-layout-unify` 与 `20260522-company-detail-five-cards`，状态均为 Completed，可继续本次独立页面细化。
  - 已读取 `D:\ProjectPackage\Int\IntPP\FRONTEND_STYLE.md`，确认本次继续沿用蓝白灰运营台式视觉基线。
  - 已定位本次根路径 kiosk 公司详情实现位于 `src/medical-kiosk.js` 与 `src/medical-kiosk.css`。
  - 已完成 RED 测试补充，明确当前实现缺少独立主图卡片、图标播控按钮和黄框内容卡片容器。
  - 已将公司详情改造为“左侧主图卡 + 右侧摘要卡 + 讲解稿卡 + 下方字段卡片区”的布局，并保留固定 5 个字段卡片。
  - 已把公司详情播放入口改为独立 SVG 图标按钮，播放中切换为停止图标与停止语义。
  - 已完成 `medical-kiosk` 单测和受影响 Playwright 浏览器回归。
  - 已完成前端证据校验与任务收尾清理，按基线保留 `task.md` / `execution-log.md`。
- Remaining blockers:
  - 无

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npx playwright test tests/kiosk-gallery.spec.js --grep "kiosk company detail" --reporter=line`
- PASS: `npx playwright test tests/kiosk-gallery.spec.js tests/kiosk-detail.spec.js --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-company-detail-image-icon-cards/frontend-feature-evidence.md`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-company-detail-image-icon-cards --mode preview`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-company-detail-image-icon-cards --mode apply`
