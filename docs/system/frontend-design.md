# Frontend Design

## Purpose and Scope

定义 `Website` / kiosk 作为“发布包消费端”的前端设计，不再以实时拼装 live 业务数据为主，而是安装、校验、激活 `IntRuoyi` 发布出的不可变 release。

## Evidence Reviewed

- `D:\ProjectPackage\Website\src\showroom-api.js`
- `D:\ProjectPackage\Website\doc\tasks\20260520-showroom-backend-integration-plan\technical-plan.md`
- `D:\ProjectPackage\Int\IntRuoyi\doc\tasks\20260522-showroom-display-bilingual-detail-contract\task.md`

## Pages and Routes

- `/`
  - kiosk 首页与详情流
- `/showroom`
  - showroom 展示入口

以上路由继续存在，但其数据源改为“已安装的 active release”，而不是每次进入时重新拼 live 运行时数据。

## Components

- `ReleaseBootstrapLoader`
  - 启动时请求极小的当前 release 描述，仅用于判断是否有新版本。
- `ReleaseManifestStore`
  - 保存本地已安装 release 的 manifest、文档索引和 active release 指针。
- `AssetInstaller`
  - 根据 `assetId + hash` 下载新增或变更的图片、音频资源。
- `ReleaseVerifier`
  - 对 manifest、文档和媒体校验哈希完整性。
- `ReleaseActivator`
  - 只有在 release 全量校验完成后，才原子切换 active release。
- `AssetGarbageCollector`
  - 在新 release 激活后，回收不再被任何保留 release 引用的旧资源。

## State and Data Flow

1. 应用启动，请求 `release current` 轻量接口。
2. 若本地 `activeReleaseId` 与服务端 `releaseId` 相同，则直接从本地 active release 渲染。
3. 若服务端存在新 release，则下载该 release 的 manifest。
4. 客户端比较本地 `assetId/hash` 与新 manifest，计算新增、变更、删除集合。
5. 并行下载新增或变更的文档与媒体资源。
6. 所有资源通过哈希校验后，写入本地 release 存储。
7. 仅当整个 release 可验证可读时，切换 `activeReleaseId`。
8. 激活成功后，再执行旧资源回收。

## Error States

- 首次安装前无 active release，且 `release current` 或 manifest 获取失败：
  - fail fast，明确报错，不能渲染不完整页面。
- 新 release 下载过程中资源缺失、哈希不匹配或文档不完整：
  - 不激活新 release，保持当前 active release 不变。
- 媒体资源已下载但未通过校验：
  - 删除临时资源，记录同步失败。
- active release 存在但更新检查失败：
  - 是否允许继续使用当前 active release，属于显式运行策略，需要产品批准。

## Accessibility and Responsive Behavior

- 现有 `/` 与 `/showroom` 的响应式与交互外观不因本方案改变。
- 更新过程应提供明确的同步状态文本，避免仅用颜色表达状态。
- 若首次安装未完成，不应展示部分图片已出、部分音频缺失的半成品页面。

## Open Questions

- 终端是否必须支持离线继续运行已验证 release。
- 每台终端最多保留几个历史 release。
- 图片与音频是否都需要首次安装完成后再允许进入页面，还是允许按页面分区分批安装。

## Design Blockers

- 若产品要求“每次打开都必须看到绝对最新 live 数据”，则 release-based 方案需要与发布频率、前台刷新 SLA 一起重新约束。
