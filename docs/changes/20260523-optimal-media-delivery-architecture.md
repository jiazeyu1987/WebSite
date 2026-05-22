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

- Product impact: 前台展示从“实时读 live 聚合”切为“消费显式发布的 release snapshot”。
- Design impact: 页面数据时序、首屏策略、资源预热策略与版本切换体验统一收敛到 release 安装边界。
- Data impact: 公司、展厅、产品详情、图片和音频都进入同一个 release 版本边界。
- API impact: 从单一 `website-config` 运行时聚合，升级为 `release current + manifest + immutable assets` 的固定公开合同。
- Test impact: 必须补齐 release 生成、manifest 校验、媒体安装、原子切换、离线运行和 GC 回收测试。
- Release impact: 发布流程正式化，需要“装配 release -> 校验 -> 切 current 指针”。
- Operations impact: 设备更新策略、缓存上限、旧版本保留数量和失败告警方式已成为显式运维配置。

## Decision

- Decision: Accept
- Accepted architecture direction:
  - 采用“发布时生成不可变 release snapshot，客户端按 release 安装和切换”的长期目标架构。
  - 不把“运行时请求聚合接口后在前端临时比对媒体增删改”作为长期主架构。
- Accepted v1 contract decisions:
  - 公开读接口固定为：
    - `GET /showroom/release/current`
    - `GET /showroom/release/{releaseId}/manifest`
    - `GET /showroom/release/{releaseId}/documents/{documentId}.json`
    - `GET /showroom/assets/{assetId}/{contentHash}`
  - `GET /showroom/display/website-config` 迁移期仅作为 active release 的兼容投影保留，不再允许直接 live 聚合。
  - v1 文档模型固定为：
    - 一个 `website-index`
    - 多个 `product-detail-{productId}`
  - 客户端运行边界固定为：
    - 持久化介质 `IndexedDB + Cache Storage`
    - 默认缓存上限 `1 GiB`
    - 默认本地保留两个已验证 release
    - 首次安装必须完整校验后才能进入页面
    - 更新失败时保留当前 active release
    - 离线运行仅允许在已有 active release 时发生
    - GC 由激活成功、缓存超额、过期 staging/failed 数据触发
- Deferred non-blocking items:
  - 是否为超大 release 增加压缩后的 manifest 传输格式。
  - 是否把 `activeReleaseId` 主动上报到集中运维系统。

## Required Approvals

- 用户确认以 release-based delivery 作为目标架构
- 后续实现阶段确认目标 kiosk 运行环境稳定支持 `IndexedDB + Cache Storage`
- 后续实现阶段确认默认缓存上限和保留 release 数量符合实际终端硬件容量

## Downstream Skill Reruns

- `system-design-docs`
- 后续若进入实现：
  - `backend-api-delivery`
  - `frontend-feature-delivery`
  - `quality-assurance-test-suite`

## Blockers And Next Action

- Blocker:
  - 当前仓库仅完成文档定稿，尚未进入后端 release publisher 与前端 installer 实现。
- Impact:
  - 若直接宣称能力已交付，将与当前系统实际状态不符。
- Next action:
  - 按 `D:\ProjectPackage\Website\doc\tasks\20260523-showroom-release-architecture-doc-review\development-plan.md` 拆分后端、前端、验证三个子任务
  - 在实现期严格执行 `BDD + RED -> GREEN -> REGRESSION`
