# Data Model

## Purpose and Scope

定义长期最优发布架构下，前台消费所需的 release、文档和媒体资源模型，以及它们与现有 showroom revision/version 模型的映射关系。

## Evidence Reviewed

- `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\yudao-module-showroom\src\main\java\**`
- `D:\ProjectPackage\Website\doc\tasks\20260520-showroom-backend-integration-plan\technical-plan.md`

## Entities

- `PublishedRelease`
  - 字段建议：`releaseId`、`publishedAt`、`manifestHash`、`documentHash`、`status`
- `ReleaseDocument`
  - 前台渲染所需 JSON 文档
  - 例如公司页、展厅列表、产品详情索引
- `MediaAsset`
  - 字段建议：`assetId`、`assetType`、`contentHash`、`mimeType`、`size`
- `ReleaseAssetRef`
  - 表示某个 release 的某个文档引用了哪些资源
- `ActiveReleasePointer`
  - 客户端本地当前激活的 release 指针

## Relationships

- 一个 `PublishedRelease` 包含多个 `ReleaseDocument`
- 一个 `PublishedRelease` 通过 `ReleaseAssetRef` 引用多个 `MediaAsset`
- 同一个 `MediaAsset` 可以被多个 release 复用，只要 `contentHash` 不变
- 一个客户端在任一时刻只有一个 `ActiveReleasePointer`

## State Models

- 后端内容主链路：
  - company/product draft revision
  - published revision
  - preview asset version
  - narration version
  - release assembly
  - published release
- 客户端安装链路：
  - no release
  - downloading
  - verifying
  - installed
  - active
  - garbage collecting old assets

## Migration Notes

- 现有 `website-config` 聚合 payload 可作为 release 装配器的输入之一，但不应继续作为长期唯一前台运行合同。
- 需要新增 release 级实体，而不是仅在现有 product/company revision 上继续叠加运行时判断。

## Data Integrity Rules

- 同一 `releaseId` 的 manifest、文档和资产引用必须不可变。
- `MediaAsset.contentHash` 是资源是否变化的唯一判定信号。
- 资源删除必须通过“新 release 不再引用旧资源 + 激活后回收”实现，而不是运行时边拉边删。
- 不允许一个 active release 引用到另一个 release 尚未安装完成的资源。

## Open Questions

- `ReleaseDocument` 是按整站一份大 JSON，还是按公司/展厅/产品拆分多个文档。
- 是否需要区分桌面、PAD、竖屏三端各自的资源文件集合。

## Design Blockers

- 若媒体资源路径不能稳定映射到内容哈希或显式版本号，则无法可靠实现去重复用和正确删除。
