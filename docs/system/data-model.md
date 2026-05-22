# Data Model

## Purpose and Scope

定义长期最优发布架构下，前台消费所需的 release、文档和媒体资源模型，以及它们与现有 showroom revision/version 模型和 `website-config` 双语聚合 contract 的固定映射关系。

## Evidence Reviewed

- `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\yudao-module-showroom\src\main\java\**`
- `D:\ProjectPackage\Website\src\showroom-api.js`
- `D:\ProjectPackage\Website\doc\tasks\20260520-showroom-backend-integration-plan\technical-plan.md`

## Canonical Entities

### `PublishedRelease`

- 作用：
  - 表示一次已发布、可被公共前台安装的不可变 snapshot。
- 字段：
  - `releaseId`
  - `schemaVersion`
  - `publishedAt`
  - `manifestHash`
  - `rootDocumentId`
  - `documentCount`
  - `assetCount`
  - `installBytes`
  - `sourceSnapshot`
    - 记录本次 release 来源的 company revision、product revision、preview asset version、narration version 版本点
  - `status`
    - 仅允许 `published` 或 `purged`

### `ReleaseDocument`

- 作用：
  - 表示 release 内部的单个 JSON 文档。
- 字段：
  - `releaseId`
  - `documentId`
  - `kind`
  - `contentHash`
  - `bytes`
  - `payload`
- v1 `kind` 固定为：
  - `website-index`
  - `product-detail`

### `MediaAsset`

- 作用：
  - 表示图片或音频二进制对象。
- 字段：
  - `assetId`
  - `assetType`
    - `image` 或 `audio`
  - `contentHash`
  - `mimeType`
  - `bytes`
  - `storageKey`
  - `status`
    - `published` 或 `purged`

### `ReleaseAssetRef`

- 作用：
  - 表示文档对资源的引用。
- 字段：
  - `releaseId`
  - `documentId`
  - `assetId`
  - `contentHash`
  - `usage`
    - 例如 `company-home-image`、`product-preview-image`、`product-audio-zh`

### `CurrentReleasePointer`

- 作用：
  - 指向当前公共端应消费的 `PublishedRelease.releaseId`。
- 字段：
  - `releaseId`
  - `updatedAt`

### `ClientInstalledRelease`

- 作用：
  - 记录设备本地安装状态。
- 字段：
  - `releaseId`
  - `manifestHash`
  - `installedAt`
  - `state`
    - `staging`、`verified`、`active`、`retained`、`failed`
  - `bytesOnDisk`
  - `failureCode`
  - `lastVerifiedAt`

## Fixed v1 Document Model

- v1 已定稿为多文档模型，不再保留“单文档还是多文档”的开放问题。
- 文档集合固定为：
  - `website-index`
    - 单个根文档，承载公司信息、展厅信息、产品卡片摘要、产品详情文档引用。
  - `product-detail-{productId}`
    - 每个产品一个详情文档，承载双语讲解文本、双语音频引用和 `bilingualPublicFields`。
- v1 不拆分额外的公司详情文档：
  - 因为当前只有一个公司主体，直接保留在 `website-index` 内可以避免无意义的单实体跳转。

## Mapping from Existing `website-config`

- `company.companyId/name/nameEn/homeImageUrl/subtitleZh/subtitleEn/audioZhUrl/audioEnUrl/bilingualPublicFields`
  - 固定映射到 `website-index.company`
- `showrooms[].hallId/hallCode/name/nameEn/description/descriptionEn/previewImageUrl`
  - 固定映射到 `website-index.showrooms[]`
- `showrooms[].products[].productId/productCode/nameCn/nameEn/incompleteFlag/previewImageUrl`
  - 固定映射到 `website-index.showrooms[].products[]`
- `showrooms[].products[].subtitleZh/subtitleEn/audioZhUrl/audioEnUrl/bilingualPublicFields`
  - 固定映射到 `product-detail-{productId}`
- 因此：
  - release contract 是规范化后的主合同。
  - `website-config` 是从 release 文档反投影得到的兼容合同，而不是另一条同级数据源。

## Relationships

- 一个 `PublishedRelease` 包含一个 `website-index` 和多个 `product-detail-*`。
- 一个 `PublishedRelease` 通过 `ReleaseAssetRef` 引用多个 `MediaAsset`。
- 同一个 `MediaAsset` 可以被多个 release 复用，只要 `assetId + contentHash` 相同。
- 一个客户端在任一时刻只有一个 `ClientInstalledRelease.state=active`。
- 一个客户端最多保留两个 `verified` 及以上状态的 release：
  - 当前 `active`
  - 前一个 `retained`

## State Models

### Source-to-Release State Model

- 后端发布主链路：
  - `showroom_company_revision`
  - `showroom_product_revision`
  - `showroom_preview_asset_version`
  - `showroom_narration_version`
  - `ReleaseAssembler`
  - `PublishedRelease`
  - `CurrentReleasePointer`
- 关键约束：
  - 只有已发布 revision/version 能进入 `ReleaseAssembler`。
  - `PublishedRelease` 一旦生成即只读。

### Client Installation State Model

- 客户端安装链路固定为：
  - `no-release`
  - `staging`
  - `verifying`
  - `verified`
  - `active`
  - `retained`
  - `garbage-collecting`
- 状态规则：
  - `staging` 和 `failed` 数据不得参与页面渲染。
  - 只有 `verified` 才允许切换到 `active`。
  - 新 release 激活后，原 active 自动转为 `retained`。
  - 若本次更新失败且存在旧 `active`，旧 `active` 保持不变，不触发自动回滚分支，因为系统从未切换成功。

## Retention and Deletion Rules

- 后端保留规则：
  - 至少保留当前 release 和前两个历史 release。
  - 被 purge 的 release 状态改为 `purged`，并通过 API 返回 `410`。
- 客户端保留规则：
  - 默认只保留两个已验证 release：`active` 和最近一个 `retained`。
  - 更旧 release 必须在 GC 时删除。
- 资源删除规则：
  - 只有当资源不再被任何保留 release 引用时才允许删除。
  - 删除动作必须基于 `ReleaseAssetRef` 引用计数。
- 文档删除规则：
  - 文档与所属 release 同生命周期；release purge 时同步删除。

## Client Storage Model

- `IndexedDB`
  - 保存 `PublishedRelease` 元数据副本、manifest、`ReleaseDocument`、安装状态和 active 指针。
- `Cache Storage`
  - 以不可变资源 URL 为 key 保存二进制媒体对象。
- `MAX_LOCAL_CACHE_BYTES`
  - v1 默认 `1073741824` 字节，即 `1 GiB`。
- 预检规则：
  - `requiredBytes = newRelease.installBytes + retainedRelease.bytesOnDisk`
  - 若执行 GC 后仍超出上限：
    - 首次安装：停止并报错。
    - 增量更新：保留当前 active release，更新失败落日志并等待下次重试。

## Data Integrity Rules

- 同一 `releaseId` 的 manifest、文档和资产引用必须不可变。
- `manifestHash` 必须能覆盖整份 manifest 内容。
- `ReleaseDocument.contentHash` 必须覆盖文档完整 JSON 内容。
- `MediaAsset.contentHash` 是资源是否变化的唯一判定信号。
- 不允许一个 active release 引用到另一个 release 尚未安装完成的资源。
- 不允许不同 releaseId 共享同一路径但返回不同字节流。

## Migration Notes

- 迁移期允许并存：
  - 新 release contract
  - 旧 `website-config`
- 但并存方式已固定：
  - `website-config` 只允许作为 active release 的投影读取层。
- 不允许并存的方式：
  - 一边对外暴露 release contract，一边继续让 `website-config` 从 live revision 直接聚合。

## Open Questions

- 终端是否需要把 `activeReleaseId` 主动上报到后端观测系统，不影响 v1 本地安装模型。
- 如果后续产品新增“按展厅懒加载产品详情”的展示体验，可在不改 schema 的前提下调整何时请求 `product-detail-*` 文档。

## Design Blockers

- 如果目标运行环境无法稳定提供 `IndexedDB + Cache Storage` 持久化能力，则不得按本模型实现浏览器端安装器，必须先切换到受控桌面壳或其他可持久化运行环境。
- 如果发布链路无法为每个资源生成稳定 `contentHash`，则不得进入媒体复用与删除实现阶段。
