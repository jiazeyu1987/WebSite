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

以上路由继续存在，但其数据源固定改为“已安装的 active release”，而不是每次进入时重新拉取 live 聚合数据。

## Runtime Boundary

- 前端运行责任固定为：
  - 读取 `GET /showroom/release/current`
  - 按 manifest 安装 release
  - 校验文档与媒体哈希
  - 原子切换 active release
  - 按规则回收旧 release 和无引用资源
- 前端不负责：
  - 聚合 live showroom revision
  - 推断缺失字段
  - 对半成品 release 做容错渲染

## Components

- `ReleaseProbeClient`
  - 启动时请求极小的当前 release 描述，仅用于判断是否有新版本。
- `ReleaseManifestStore`
  - 保存本地已安装 release 的 manifest、文档索引和 active release 指针。
- `ReleaseDocumentStore`
  - 保存 `website-index` 与 `product-detail-*` 文档。
- `AssetInstaller`
  - 根据 `assetId + contentHash` 下载新增或变更的图片、音频资源。
- `ReleaseVerifier`
  - 对 manifest、文档和媒体校验哈希完整性。
- `ReleaseActivator`
  - 只有在 release 全量校验完成后，才原子切换 active release。
- `AssetGarbageCollector`
  - 在新 release 激活后，回收不再被任何保留 release 引用的旧资源。

## Local Persistence

- 元数据与文档：
  - 持久化到 `IndexedDB`
  - 存储内容：`release/current` 探针缓存、manifest、`website-index`、`product-detail-*`、active 指针、安装状态、失败原因
- 二进制资源：
  - 持久化到 `Cache Storage`
  - key 固定为 `GET /showroom/assets/{assetId}/{contentHash}`
- staging 规则：
  - 下载中的 release 单独记录为 `staging`
  - `staging` 内容不得参与页面渲染
- 写入顺序：
  - 先写 staging 元数据
  - 再写文档和资源
  - 验证通过后一次性切换 active 指针

## Quota Strategy

- 默认上限：
  - `MAX_LOCAL_CACHE_BYTES = 1073741824`，即 `1 GiB`
- 默认保留：
  - `MAX_LOCAL_RELEASES = 2`
- 安装前预检：
  - 用 manifest 的 `installBytes` 计算本次安装所需空间
  - 先尝试删除 GC 资格数据
  - 若仍超上限：
    - 首次安装：停止安装并显示阻塞错误
    - 增量更新：保持当前 active release，不激活新 release
- 不允许在空间不足时只下载部分文档或部分媒体继续展示。

## State and Data Flow

1. 应用启动，先检查本地是否存在 `activeReleaseId`。
2. 若存在 `activeReleaseId`，先读取本地 active release 元数据并准备渲染。
3. 并行请求 `GET /showroom/release/current`。
4. 若服务端 `releaseId` 与本地 active 相同：
  - 直接从本地 active release 渲染。
5. 若服务端存在新 release：
  - 下载 manifest。
  - 计算文档与资源的新增/变更集合。
  - 下载缺失的 `website-index`、`product-detail-*` 和媒体资源。
  - 校验每个文档 `contentHash` 与每个资源 `contentHash`。
  - 全量成功后原子切换 `activeReleaseId`。
6. 激活成功后，将旧 active 标记为 `retained`，再触发 GC。

## Fixed v1 Document Consumption Model

- 前端必须按以下方式消费 release 文档：
  - 总是先加载 `website-index`
  - 进入产品详情页或预热产品详情时，再按 `detailDocumentId` 读取对应 `product-detail-*`
- 该模型与当前 `website-config` 的关系：
  - `website-index` 覆盖旧 contract 中的 `company` 和 `showrooms` 结构
  - `product-detail-*` 覆盖旧 contract 中 `showrooms[].products[]` 的详情字段
  - 迁移完成后，前端不再直接消费 `website-config`

## First Install Policy

- 首次安装前没有任何 `active release` 时：
  - 必须成功拉取 `release/current`
  - 必须完整拉取 manifest、必需文档和必需资源
  - 必须全部通过哈希校验
- 任一条件失败：
  - 显示阻塞安装错误
  - 不允许进入展厅页面
  - 不允许展示局部成功内容

## Update Failure Policy

- 设备已有已验证 `active release` 时：
  - 若新 release 下载失败、校验失败、空间不足或 release 端点返回 5xx，当前 active release 保持不变。
  - 前端必须记录：
    - `targetReleaseId`
    - `failureCode`
    - `failureAt`
    - `failedStep`
  - 前端必须在管理可见的错误区域显示“更新失败，当前仍运行 release <activeReleaseId>”。
- 这不是 silent fallback：
  - 因为系统从未切换到新 release。
  - 旧 release 继续运行是已定稿的主策略，而不是隐藏降级分支。

## Offline Policy

- 支持离线运行的前提：
  - 本地已存在一个 `verified` 且 `active` 的 release。
- 离线启动时：
  - 直接从本地 active release 渲染。
  - `release/current` 探针失败记录为网络错误，不改变 active 指针。
- 不支持的场景：
  - 首次安装离线
  - 本地没有 active release 的离线冷启动

## Old Release Retention

- 默认本地只保留两个已验证 release：
  - 当前 `active`
  - 最近一个 `retained`
- 保留旧 release 的目的：
  - 便于差量比较和问题排查
  - 避免新 release 激活后立刻删除所有旧对象造成观测困难
- 不允许的行为：
  - 自动切回更旧 release
  - 同时渲染两个 release 的混合内容

## Garbage Collection Triggers

- GC 触发条件固定为：
  - 新 release 激活成功后
  - 应用启动时检测到本地缓存超额
  - 应用启动时发现超过 `MAX_LOCAL_RELEASES`
  - 应用启动时发现停留超过 24 小时的 `staging` 或 `failed` 临时数据
- GC 删除顺序：
  - 先删过期 `staging` / `failed`
  - 再删最老的 `retained release`
  - 最后删不再被任何保留 release 引用的媒体资源

## Error States

- 首次安装前无 active release，且 `release/current` 或 manifest 获取失败：
  - fail fast，明确报错，不能渲染不完整页面。
- 新 release 下载过程中资源缺失、哈希不匹配或文档不完整：
  - 不激活新 release，保持当前 active release 不变。
- 本地存储能力不可用：
  - 直接阻塞启动并提示“当前运行环境不支持离线 release 安装”。
- active release 文档损坏：
  - 终止渲染并提示数据损坏，等待重新联网安装；不允许靠字段默认值继续渲染。

## Accessibility and Responsive Behavior

- 现有 `/` 与 `/showroom` 的响应式与交互外观不因本方案改变。
- 更新过程应提供明确文本：
  - `正在检查新版本`
  - `正在下载资源`
  - `正在校验资源`
  - `更新失败，当前继续运行已安装版本`
- 若首次安装未完成，不应展示部分图片已出、部分音频缺失的半成品页面。

## Open Questions

- 是否在产品详情进入前预热全部 `product-detail-*`，还是只预热首页首屏涉及的详情文档，不影响 v1 contract。
- 是否把同步进度暴露到独立运维页，而不是只在启动层展示状态，不影响运行边界。

## Design Blockers

- 如果目标 kiosk 浏览器无法稳定提供 `IndexedDB + Cache Storage` 持久化，则必须停止该前端方案实现，转为桌面壳或其他受控运行时后再继续。
- 如果产品要求“每次打开页面都必须绕过已安装 release 直接读取最新 live 数据”，则本方案与需求冲突，必须重新立项，不得在当前 contract 上继续叠加分支。
