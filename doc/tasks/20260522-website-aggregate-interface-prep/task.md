# Task: Website 预适配 IntRuoyi 单一聚合接口

## Goal

在 `D:\ProjectPackage\Website` 中预先改造展厅接口适配层与测试结构，使其对齐 `IntRuoyi` 的“单一聚合接口，产品详情正文一起返回，旧接口删除避免歧义”方案；本轮优先完成 Website 侧接口层准备与可评审改动，为后续真实对接留出最小接入面。

## Scope

- `D:\ProjectPackage\Website\src\showroom-api.js`
- `D:\ProjectPackage\Website\src\showroom-api.test.js`
- 必要时与接口适配直接相关的 `Website` 测试文件
- `D:\ProjectPackage\Website\doc\tasks\20260522-website-aggregate-interface-prep\**`

## Non-Scope

- 不修改 `IntRuoyi` 代码或数据库
- 不在本轮切断当前 Website 真实运行时对既有接口的依赖，除非有可验证的新聚合接口可对接
- 不新增 fallback、双写兼容或客户端翻译逻辑
- 不做无关 UI 改版

## Dependencies

- `D:\ProjectPackage\Int\IntRuoyi\doc\tasks\20260522-showroom-display-bilingual-detail-contract\**`
- `D:\ProjectPackage\Website\doc\tasks\20260522-website-single-aggregate-contract-adaptation\website-adaptation-plan.md`
- `Vitest` 可运行用于 RED/GREEN 验证

## Milestones

1. 建立任务记录并锁定本轮只做 Website 接口预适配。
2. 以单一聚合接口文档为准，调整 Website 的接口适配层设计与测试入口。
3. 以严格 TDD 完成 `showroom-api` 聚合入口与 mapper 预适配，并保留当前运行时旧入口。
4. 完成主 agent 审查与最小验证，确认不破坏当前主链测试基线。

## Expected Verification

- `npm test -- --run src/showroom-api.test.js`
- 如有新增测试，列出对应命令

## Current Status

- Status: Completed
- Completed work:
  - 已建立本次任务记录，锁定本轮边界为“接口适配层预准备 + 严格 review 放行”。
  - 已复核 `D:\ProjectPackage\Int\IntRuoyi\doc\tasks\20260522-showroom-display-bilingual-detail-contract\prd.md` 与 `website-adaptation-plan.md`，确认本轮目标是为未来单一聚合接口建立清晰入口与 mapper，而不是提前切断当前运行时旧依赖。
  - 已确认 `src/showroom-app.js` 与 `src\medical-kiosk.js` 当前仍真实依赖 `fetchShowroomAppConfig*` 与 `fetchShowroomProductDetail`；因此本轮需保留旧入口的可运行性，只在接口层新增聚合入口与测试形态。
  - 已在 `src/showroom-api.js` 新增 `SHOWROOM_WEBSITE_CONFIG_ENDPOINT`、`fetchShowroomWebsiteConfigPayload`、`fetchShowroomWebsiteConfig`、`mapShowroomWebsiteConfig`，并抽出公司/展厅/产品共享 mapper。
  - 已在 `src/showroom-api.test.js` 用聚合 contract 重写核心测试，覆盖“单接口一次拿到公司、展厅、产品卡片、产品详情正文与双语音频”的映射语义，同时保留当前 `mapShowroomAppConfig` 的最小回归断言。
  - 已完成最小相关回归：`showroom-api`、`showroom-app`、`medical-kiosk` 三组单测均通过，确认新增聚合入口没有破坏当前运行时旧链路。
- Remaining blockers:
  - 真实 `IntRuoyi` 单一聚合接口尚未交付，因此本轮不能直接切换 Website 运行时主链。

## Final Verification Result

- PASS: `npm test -- --run src/showroom-api.test.js`
- PASS: `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/medical-kiosk.test.js`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-website-aggregate-interface-prep --mode preview`
