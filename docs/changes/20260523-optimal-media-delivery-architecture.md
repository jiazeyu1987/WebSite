# Change Request: Showroom 最优媒体发布架构设计

## Request Summary And Source

- Source: 当前线程用户请求
- Request summary: 用户明确要求不要受当前临时拉取方案约束，希望直接给出图片、音频与展示数据分发的长期最优方案。

## Current Baseline Reviewed

- `D:\ProjectPackage\Website\doc\tasks\20260520-showroom-backend-integration-plan\technical-plan.md`
- `D:\ProjectPackage\Website\src\showroom-api.js`
- `D:\ProjectPackage\Int\IntRuoyi\doc\tasks\20260522-showroom-display-bilingual-detail-contract\task.md`
- `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\yudao-module-showroom\src\main\java\**`
- 既有实体/版本线索：
  - `showroom_company_revision`
  - `showroom_product_revision`
  - `showroom_preview_asset_version`
  - `showroom_narration_version`

## Classification

- Requirement change assessment
- System architecture decision
- Performance and delivery model redesign

## Impact

- Product impact: 决定前台是否继续依赖运行时 live 请求，还是切为发布包驱动的稳定展示模式。
- Design impact: 影响页面数据到达时序、首屏策略、资源预热策略与版本切换体验。
- Data impact: 需要把“当前 live 内容”提升为“已发布 release snapshot”，让数据、图片和音频在同一版本边界内被消费。
- API impact: 需要从单一 `website-config` 运行时聚合，升级为 `release current + manifest + immutable assets` 的发布合同。
- Test impact: 后续实现必须补充 release 生成、manifest 校验、媒体差量安装、原子切换和删除回收测试。
- Release impact: 会把前台展示从“实时读 live”变成“显式发布到 release”；发布链路更清晰，但发布流程会更正式。
- Operations impact: 需要明确设备更新策略、缓存上限、旧版本保留数量和失败告警方式。

## Decision

- Decision: Accept
- Accepted architecture direction:
  - 采用“发布时生成不可变 release snapshot，客户端按 release 安装和切换”的长期目标架构。
  - 不把“运行时请求聚合接口后在前端临时比对媒体增删改”作为长期主架构。
- Deferred:
  - 是否允许设备在更新失败时继续运行上一已验证 release，需要明确的产品/运维批准。
  - 是否需要专门的 `delta manifest` 接口，建议先用完整 manifest + `assetId/hash` 比对；仅当 manifest 体量本身变大时再升级。

## Required Approvals

- 用户确认以 release-based delivery 作为目标架构
- 产品/运维确认设备更新失败时的运行策略
- 若后续要实现缓存持久化和本地安装，需要确认终端可接受的磁盘占用与保留版本数

## Downstream Skill Reruns

- `system-design-docs`
- 后续若进入实现：
  - `backend-api-delivery`
  - `frontend-feature-delivery`
  - `quality-assurance-test-suite`

## Blockers And Next Action

- Blocker: 当前尚未有显式 release manifest、immutable asset contract 和客户端 active release 安装模型。
- Impact: 若直接开始实现，只能继续在运行时聚合接口上叠加复杂逻辑，难以达到长期最优边界。
- Next action:
  - 先按本次系统设计文档锁定 release contract
  - 再拆后端发布装配、前端安装器、测试验证三个实现任务
