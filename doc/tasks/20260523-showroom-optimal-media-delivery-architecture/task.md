# Task: Showroom 最优媒体发布架构设计

## Goal

在不受当前 `Website` 临时运行时拉取方式约束的前提下，为 `D:\ProjectPackage\Website` 与 `D:\ProjectPackage\Int\IntRuoyi` 的展厅图片、音频和展示数据定义一套长期最优的发布与分发架构，重点解决首次加载慢、重复加载重复下载、媒体变更同步、删除同步和发布一致性问题。

## Scope

- `D:\ProjectPackage\Website\doc\tasks\20260523-showroom-optimal-media-delivery-architecture\**`
- `D:\ProjectPackage\Website\docs\changes\20260523-optimal-media-delivery-architecture.md`
- `D:\ProjectPackage\Website\docs\system\frontend-design.md`
- `D:\ProjectPackage\Website\docs\system\backend-api-design.md`
- `D:\ProjectPackage\Website\docs\system\data-model.md`
- `D:\ProjectPackage\Website\docs\system\config-security-deployment.md`
- `D:\ProjectPackage\Website\doc\tasks\20260520-showroom-backend-integration-plan\technical-plan.md`
- `D:\ProjectPackage\Int\IntRuoyi\doc\tasks\20260522-showroom-display-bilingual-detail-contract\task.md`
- `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\yudao-module-showroom\**` 只读分析

## Non-Scope

- 不修改 `Website` 或 `IntRuoyi` 生产代码
- 不沿用当前临时实现做局部修补建议
- 不引入未被证据支持的特定厂商服务、第三方 CDN 产品名或新鉴权模型

## Dependencies

- 当前仓库上一任务 `20260523-website-media-incremental-sync-triage` 已完成
- `IntRuoyi` 已具备公司/产品 revision、preview asset version、narration version 等发布基础模型
- `Website` 保持纯前端展示仓边界，不直连数据库

## Milestones

1. 建立设计任务记录，并确认上一任务状态不阻塞本次只读设计。
2. 回看 `Website` 与 `IntRuoyi` 已有长期稳定边界，提炼“源头发布”与“前端消费”职责。
3. 产出最优方案的系统设计文档，覆盖前端、后端、数据模型、配置与部署。
4. 校验变更文档与系统设计结构，形成可直接进入实现规划的设计结论。

## Expected Verification

- `python -X utf8 C:\Users\BJB110\.codex\skills\change-request-triage\scripts\validate_change_request.py --evidence docs/changes/20260523-optimal-media-delivery-architecture.md`
- `python -X utf8 C:\Users\BJB110\.codex\skills\system-design-docs\scripts\validate_system_design.py --root D:\ProjectPackage\Website`
- `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260523-showroom-optimal-media-delivery-architecture --mode preview`

## Current Status

- Status: Completed
- Completed work:
  - 已确认上一任务 `20260523-website-media-incremental-sync-triage` 为 `Completed`，不阻塞本次只读设计。
  - 已回看既有长期边界：
    - `Website` 是纯展示消费端，只适合消费发布后的 HTTP 合同。
    - `IntRuoyi` 已具备公司 revision、产品 revision、preview asset version、narration version、单一匿名聚合接口等发布基础。
  - 已形成结论：长期最优方案不应是“运行时继续请求 live 聚合，再在前端做媒体增量逻辑”，而应改为“发布时生成不可变 release snapshot，客户端按 release 安装与切换”。
  - 已新增系统设计文档，分别定义：
    - 前端：release bootstrap、manifest diff、资产安装、原子切换
    - 后端：发布装配器、release registry、manifest contract、不可变资源路径
    - 数据：release、document、asset、release 引用关系
    - 配置与部署：缓存策略、发布边界、哈希校验、观测指标
  - 已明确最优同步策略：
    - 小而频繁的 `release current` 探针
    - 不可变 manifest 与媒体资源
    - 客户端按 `assetId + hash` 判定新增/变更
    - 只有新 release 完整校验通过后才切换 active release
    - 删除通过新 release 不再引用旧资产并在切换后回收实现
- Remaining blockers:
  - 是否允许设备在“已有已验证 release 且本次更新失败”时继续运行旧 release，需要产品/运维明确批准；这是运行策略选择，不应由实现层静默决定。

## Final Conclusion

- 对于当前这类图片、音频占比较高的展厅/kiosk 场景，长期最优方案是：
  - `IntRuoyi` 作为唯一编辑与发布源
  - 发布时生成一份不可变 `release snapshot`
  - `Website` / kiosk 作为 release consumer，只安装、校验、激活 release
  - 运行时不再把“请求 live 聚合 + 浏览器临时缓存媒体”作为主架构
- 这比“前端自己做增量媒体同步”更优，因为它把一致性、删除、版本切换和回滚边界都收敛到了 release 级别。

## Final Verification Result

- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\change-request-triage\scripts\validate_change_request.py --evidence docs/changes/20260523-optimal-media-delivery-architecture.md`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\system-design-docs\scripts\validate_system_design.py --root D:\ProjectPackage\Website`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260523-showroom-optimal-media-delivery-architecture --mode preview`
