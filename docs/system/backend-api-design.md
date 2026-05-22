# Backend API Design

## Purpose and Scope

定义 `IntRuoyi` 作为唯一发布源时，如何把内部 revision、preview asset version、narration version 收敛成前台可安装的不可变 release contract。

## Evidence Reviewed

- `D:\ProjectPackage\Website\doc\tasks\20260520-showroom-backend-integration-plan\technical-plan.md`
- `D:\ProjectPackage\Int\IntRuoyi\doc\tasks\20260522-showroom-display-bilingual-detail-contract\task.md`
- `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\yudao-module-showroom\src\main\java\**`

## Modules

- `ReleaseAssembler`
  - 从公司、产品、展厅、讲解和预览资源的已发布版本生成前台 release snapshot。
- `ReleaseRegistry`
  - 管理当前生效 release 指针与历史 release 元数据。
- `ManifestPublisher`
  - 输出 release manifest、文档索引和资源引用关系。
- `ImmutableAssetPublisher`
  - 通过不可变路径暴露图片和音频资源。

## API Contracts

- `GET /showroom/release/current`
  - 返回当前生效 release 的轻量元数据。
  - 建议字段：`releaseId`、`manifestHash`、`publishedAt`、`documentHash`
- `GET /showroom/release/{releaseId}/manifest`
  - 返回该 release 的完整 manifest。
  - manifest 至少应包含：
    - 页面/文档索引
    - `assetId`
    - `assetType`
    - `contentHash`
    - `size`
    - `mimeType`
    - `logicalRefs`
- `GET /showroom/release/{releaseId}/documents/{documentId}.json`
  - 返回可直接渲染的页面数据文档。
- `GET /showroom/assets/{assetId}/{contentHash}`
  - 返回不可变图片或音频资源。

不建议把“媒体增量”定义成单独的复杂业务接口。只要 manifest 很小，客户端比较 `assetId/hash` 即可完成差量计算。

## Error Model

- `release current` 不可达：
  - 首次安装失败即 fail fast。
- 请求未知 `releaseId`：
  - 返回显式 404/业务错误，不静默改读最新 release。
- manifest 缺字段或资源缺失：
  - 视为发布错误，不应激活该 release。
- 资源哈希不匹配：
  - 视为传输或存储异常，客户端不得激活。

## Transactions and Idempotency

- release 一经发布即不可变。
- “切换当前 release 指针”是单独且原子的操作。
- 同一个 release 的 manifest、文档和资源路径必须稳定、可重复获取。
- 重复安装同一 release 必须幂等，不得产生重复资源副本。

## Open Questions

- 是否需要后台显式“预生成 release”与“发布 release”分离。
- 是否需要保留一个只读 `latest draft preview release` 供内部验证，但该能力不应泄露给 Website 公共端。

## Design Blockers

- 若后端仍把公共前台数据直接建立在 live 聚合即时计算上，而不固化为 release，则前端无法获得稳定的删除、回滚和原子切换边界。
