# Backend API Design

## Purpose and Scope

定义 `IntRuoyi` 作为唯一发布源时，如何把内部 revision、preview asset version、narration version 收敛成前台可安装的不可变 release contract，并明确它与当前 `GET /showroom/display/website-config` 的迁移边界。

## Evidence Reviewed

- `D:\ProjectPackage\Website\doc\tasks\20260520-showroom-backend-integration-plan\technical-plan.md`
- `D:\ProjectPackage\Website\src\showroom-api.js`
- `D:\ProjectPackage\Int\IntRuoyi\doc\tasks\20260522-showroom-display-bilingual-detail-contract\task.md`
- `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\yudao-module-showroom\src\main\java\**`

## Modules

- `ReleaseAssembler`
  - 从公司、产品、展厅、讲解和预览资源的已发布版本生成前台 release snapshot。
- `ReleaseRegistry`
  - 管理当前生效 release 指针与历史 release 元数据。
- `ManifestPublisher`
  - 输出 release manifest、文档索引和资源引用关系。
- `LegacyWebsiteConfigProjector`
  - 在迁移期把 active release 文档重新投影为旧 `website-config` 聚合 contract。
- `ImmutableAssetPublisher`
  - 通过不可变路径暴露图片和音频资源。

## Canonical Contract and Migration Boundary

- v1 的公开读合同以 release contract 为准：
  - `GET /showroom/release/current`
  - `GET /showroom/release/{releaseId}/manifest`
  - `GET /showroom/release/{releaseId}/documents/{documentId}.json`
  - `GET /showroom/assets/{assetId}/{contentHash}`
- 当前 `GET /showroom/display/website-config` 仅作为迁移期兼容接口保留。
- 迁移期边界固定如下：
  - `website-config` 必须读取 `ReleaseRegistry` 当前 active release，再由 `LegacyWebsiteConfigProjector` 从 release 文档投影出旧聚合 payload。
  - 一旦 release contract 上线，`website-config` 不得再直接读取 live revision 做即时聚合。
  - 如果 active release 缺失或 release 文档不完整，`website-config` 必须显式失败，不允许静默回退到 live 聚合。
- 下线边界：
  - 当 `Website` 全部消费端切到 release contract 后，才允许删除 `website-config` 兼容接口。

## Common JSON and Error Conventions

- 所有 JSON 成功响应均为裸对象，不再复用旧 `code/msg/data` 包装层。
- 所有 JSON 失败响应统一返回：

```json
{
  "error": {
    "code": "SHOWROOM_RELEASE_NOT_FOUND",
    "message": "Release 20260523T101500Z-a1b2c3d4e5f6 does not exist.",
    "retryable": false,
    "details": {
      "releaseId": "20260523T101500Z-a1b2c3d4e5f6"
    }
  }
}
```

- 字段约定：
  - `releaseId`：不可变、全局唯一、对客户端透明的字符串标识。
  - `manifestHash`、`contentHash`：小写十六进制 `sha256`。
  - `documentId`：稳定字符串；v1 固定存在 `website-index` 和 `product-detail-{productId}`。
  - `assetId`：稳定业务资源标识；同一逻辑资源内容变更时 `assetId` 不变、`contentHash` 变化。

## API Contracts

### `GET /showroom/release/current`

- 作用：
  - 返回当前对外生效 release 的轻量探针信息；客户端用它判断是否需要下载新 release。
- Success `200 application/json`：

```json
{
  "releaseId": "20260523T101500Z-a1b2c3d4e5f6",
  "schemaVersion": 1,
  "manifestHash": "4b6d6a3f2f1b9d2e8a2f4f7305c6153d6f607efc3b52f9e6c564f5c81bcf1a20",
  "publishedAt": "2026-05-23T10:15:00Z",
  "rootDocumentId": "website-index",
  "documentCount": 13,
  "assetCount": 286,
  "installBytes": 438421219
}
```

- Failures：
  - `503 SHOWROOM_RELEASE_UNAVAILABLE`
    - 含义：当前没有任何已发布 release。
    - 客户端行为：首次安装必须 fail fast；已有 active release 时继续使用当前 active release，并把更新状态标记为失败。
- Cache：
  - `Cache-Control: public, max-age=15, must-revalidate`
  - `ETag: "<releaseId>:<manifestHash>"`
- Retention：
  - 只暴露当前 active release，不提供“自动改读最近可用 release”。

### `GET /showroom/release/{releaseId}/manifest`

- 作用：
  - 返回某个 release 的完整安装清单。
- Success `200 application/json`：

```json
{
  "releaseId": "20260523T101500Z-a1b2c3d4e5f6",
  "schemaVersion": 1,
  "manifestHash": "4b6d6a3f2f1b9d2e8a2f4f7305c6153d6f607efc3b52f9e6c564f5c81bcf1a20",
  "publishedAt": "2026-05-23T10:15:00Z",
  "rootDocumentId": "website-index",
  "documents": [
    {
      "documentId": "website-index",
      "kind": "website-index",
      "contentHash": "59f7c7c2aa8a6a31b62a11ad5ee96b4db6f3e45e1506bfe12ed8673f65f3bce3",
      "bytes": 28314
    },
    {
      "documentId": "product-detail-101",
      "kind": "product-detail",
      "productId": "101",
      "contentHash": "5d9c00b1776fc0e20a823509c8573d0db1a96d88c73b19c91bd9065f9ef3a149",
      "bytes": 4216
    }
  ],
  "assets": [
    {
      "assetId": "company-home-image",
      "contentHash": "d0a3c2331883be1f5dc4c768d2f75f718197291de4f6c6fb98f1e4d72cc7a6e1",
      "assetType": "image",
      "mimeType": "image/jpeg",
      "bytes": 381127,
      "referencedBy": [
        "website-index"
      ]
    },
    {
      "assetId": "product-101-audio-zh",
      "contentHash": "93fda972f85289c3d0c70b0f2825162dcbcb0bd8098a2dc4d037c7db49f2f687",
      "assetType": "audio",
      "mimeType": "audio/mpeg",
      "bytes": 5239011,
      "referencedBy": [
        "product-detail-101"
      ]
    }
  ]
}
```

- Failures：
  - `404 SHOWROOM_RELEASE_NOT_FOUND`
  - `410 SHOWROOM_RELEASE_PURGED`
    - 含义：该 release 曾经存在，但已经超出后端保留窗口。
- Cache：
  - `Cache-Control: public, max-age=31536000, immutable`
  - `ETag: "<manifestHash>"`
- Retention：
  - 后端必须至少保留 `current` 和前两个已发布 release 的 manifest。
  - release 被清理后，旧路径必须返回 `410`，不得重定向到当前 release。

### `GET /showroom/release/{releaseId}/documents/{documentId}.json`

- 作用：
  - 返回 manifest 中声明的单个文档。
- v1 文档类型固定为：
  - `website-index`
  - `product-detail-{productId}`
- `website-index` Success `200 application/json`：

```json
{
  "documentId": "website-index",
  "kind": "website-index",
  "releaseId": "20260523T101500Z-a1b2c3d4e5f6",
  "contentHash": "59f7c7c2aa8a6a31b62a11ad5ee96b4db6f3e45e1506bfe12ed8673f65f3bce3",
  "company": {
    "companyId": "1",
    "name": "盈泰医疗",
    "nameEn": "Yingtai Medical",
    "homeImage": {
      "assetId": "company-home-image",
      "contentHash": "d0a3c2331883be1f5dc4c768d2f75f718197291de4f6c6fb98f1e4d72cc7a6e1",
      "mimeType": "image/jpeg",
      "bytes": 381127
    },
    "subtitleZh": "中文讲解稿",
    "subtitleEn": "English narration text",
    "audioZh": {
      "assetId": "company-audio-zh",
      "contentHash": "3ca9a79ef0a92438f24b2fd1de4f8bce97e442c489cb90fd8f41e2b61d2da40d",
      "mimeType": "audio/mpeg",
      "bytes": 4281903
    },
    "audioEn": {
      "assetId": "company-audio-en",
      "contentHash": "d4918960d4c4283c993db12d08991ac872fca87a71a8c9ce51668192d43e7a65",
      "mimeType": "audio/mpeg",
      "bytes": 4018295
    },
    "bilingualPublicFields": [
      {
        "fieldCode": "company_intro",
        "labelZh": "公司简介",
        "labelEn": "Company Overview",
        "valueZh": "中文内容",
        "valueEn": "English content"
      }
    ]
  },
  "showrooms": [
    {
      "hallId": "10",
      "hallCode": "CARDIOLOGY",
      "name": "心内介入展厅",
      "nameEn": "Cardiology Hall",
      "description": "展厅简介",
      "descriptionEn": "Hall summary",
      "previewImage": {
        "assetId": "hall-10-preview",
        "contentHash": "d2f4d720c6aa3e88ab0abf7f2b1aaf7fe3f2cdb9e7264ec1e11a6fe13eb0d538",
        "mimeType": "image/jpeg",
        "bytes": 261334
      },
      "products": [
        {
          "productId": "101",
          "productCode": "P-001",
          "nameCn": "导丝系统",
          "nameEn": "Guidewire System",
          "incompleteFlag": false,
          "previewImage": {
            "assetId": "product-101-preview",
            "contentHash": "27e6f604266be67f22971692702ca68c8eb8cf7cf7ed689da4ffc8fce82f8d6e",
            "mimeType": "image/jpeg",
            "bytes": 198721
          },
          "detailDocumentId": "product-detail-101"
        }
      ]
    }
  ]
}
```

- `product-detail-{productId}` Success `200 application/json`：

```json
{
  "documentId": "product-detail-101",
  "kind": "product-detail",
  "releaseId": "20260523T101500Z-a1b2c3d4e5f6",
  "contentHash": "5d9c00b1776fc0e20a823509c8573d0db1a96d88c73b19c91bd9065f9ef3a149",
  "productId": "101",
  "subtitleZh": "中文讲解稿",
  "subtitleEn": "English narration text",
  "audioZh": {
    "assetId": "product-101-audio-zh",
    "contentHash": "93fda972f85289c3d0c70b0f2825162dcbcb0bd8098a2dc4d037c7db49f2f687",
    "mimeType": "audio/mpeg",
    "bytes": 5239011
  },
  "audioEn": {
    "assetId": "product-101-audio-en",
    "contentHash": "87b8f6ef91d517f8dbe9413a0b76061c998d19d3269fd0d2b1b1778c919fb577",
    "mimeType": "audio/mpeg",
    "bytes": 5087380
  },
  "bilingualPublicFields": [
    {
      "fieldCode": "product_spec",
      "labelZh": "规格",
      "labelEn": "Specification",
      "valueZh": "中文参数",
      "valueEn": "English specification"
    }
  ]
}
```

- Failures：
  - `404 SHOWROOM_RELEASE_NOT_FOUND`
  - `404 SHOWROOM_DOCUMENT_NOT_FOUND`
  - `410 SHOWROOM_RELEASE_PURGED`
- Cache：
  - `Cache-Control: public, max-age=31536000, immutable`
  - `ETag: "<contentHash>"`
- Retention：
  - 文档随 release 生命周期保留；release 被 purge 后文档同步 purge。

### `GET /showroom/assets/{assetId}/{contentHash}`

- 作用：
  - 返回不可变图片或音频资源，媒体 URL 不再直接暴露内部文件表主键。
- Success `200`：
  - Response body：二进制文件流
  - Required headers：
    - `Content-Type: <mimeType>`
    - `Content-Length: <bytes>`
    - `ETag: "<contentHash>"`
    - `Cache-Control: public, max-age=31536000, immutable`
    - `Accept-Ranges: bytes`
- Failures：
  - `404 SHOWROOM_ASSET_NOT_FOUND`
    - 路径中的 `assetId` 或 `contentHash` 无法匹配任何仍保留的资源。
  - `410 SHOWROOM_ASSET_PURGED`
    - 资源曾经存在，但已经不再被任何保留 release 引用并已清理。
  - `500 SHOWROOM_ASSET_BROKEN`
    - 资源元数据存在但底层对象缺失；视为发布错误。
- Retention：
  - 资源至少保留到最后一个引用它的保留 release 被清理之后。
  - 后端清理必须先计算引用计数再删资源，禁止仅按时间盲删。

## v1 Document Model Decision

- v1 不再保留“单文档还是多文档”的开放问题，固定采用“两层多文档”方案：
  - `website-index`：唯一根文档，承载公司信息、展厅信息、产品卡片摘要、产品详情文档引用。
  - `product-detail-{productId}`：每个产品一个详情文档，承载双语讲解、双语音频和 `bilingualPublicFields`。
- 选择该方案的原因：
  - 与当前 `website-config` 双语聚合 contract 可直接一一映射。
  - 首页/展厅列表与产品详情解耦，后续单产品改动只会改变对应详情文档和根文档中的摘要。
  - manifest 可稳定表达“一个根文档 + 多个详情文档 + 多个不可变资源”的安装边界。

## Mapping from `website-config` to Release Documents

- `website-config.company.*`
  - 直接映射到 `website-index.company.*`
- `website-config.showrooms[].*`
  - 直接映射到 `website-index.showrooms[].*`
- `website-config.showrooms[].products[].productId/productCode/nameCn/nameEn/incompleteFlag/previewImageUrl`
  - 映射到 `website-index.showrooms[].products[]`
- `website-config.showrooms[].products[].subtitleZh/subtitleEn/audioZhUrl/audioEnUrl/bilingualPublicFields`
  - 映射到 `product-detail-{productId}`
- 迁移期旧 contract 的生成方式：
  - 先读取 `website-index`
  - 再按 `detailDocumentId` 关联对应 `product-detail-*`
  - 最后投影回当前嵌套 `showrooms[].products[]` 结构

## Error Model and Fail-Fast Rules

- `release/current` 首次安装不可达：
  - 客户端必须 fail fast，禁止渲染部分页面。
- 请求未知 `releaseId` 或 `documentId`：
  - 返回显式 `404` 或 `410`，禁止静默改读最新 release。
- manifest 缺字段、文档缺失或资源缺失：
  - 视为发布错误；客户端不得激活该 release。
- 资源哈希不匹配：
  - 视为传输或存储异常；客户端必须删除临时下载并终止本次安装。

## Transactions and Idempotency

- release 一经发布即不可变。
- “写入 release 内容”和“切换当前 release 指针”是两个阶段：
  - 阶段一：生成完整 release 内容并通过发布侧校验。
  - 阶段二：原子切换 `ReleaseRegistry.currentReleaseId`。
- 同一个 release 的 manifest、文档和资源路径必须稳定、可重复获取。
- 重复安装同一 release 必须幂等，不得生成重复资源副本。

## Open Questions

- 是否为超大 release 增加压缩后的 manifest 传输格式，可以在 v1 合同稳定后再评估。
- 是否增加“后台预生成未激活 release”的内部管理界面，不影响 v1 公共读合同。

## Design Blockers

- 如果后端无法把公共前台数据固化为 release snapshot，而只能继续依赖 live 即时聚合，则本方案不得进入实现。
- 如果部署层不能为 `manifest/documents/assets` 提供上述缓存语义，则必须先修正分发层，再开始客户端安装器开发。
