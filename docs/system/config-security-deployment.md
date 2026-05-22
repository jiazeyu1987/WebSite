# Config Security Deployment

## Purpose and Scope

定义最优发布架构在配置、安全、部署与观测层面的要求，确保前台安装 release 时既可复用缓存，又不会误读未发布内容。

## Evidence Reviewed

- `D:\ProjectPackage\Website\package.json`
- `D:\ProjectPackage\Website\playwright.config.js`
- `D:\ProjectPackage\Website\doc\tasks\20260520-showroom-backend-integration-plan\technical-plan.md`
- `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\yudao-module-showroom\src\main\java\**`

## Configuration

### Frontend Runtime Config

- `RELEASE_CURRENT_ENDPOINT`
  - 默认 `/showroom/release/current`
- `RELEASE_MANIFEST_BASE`
  - 默认 `/showroom/release`
- `ASSET_BASE_URL`
  - 默认 `/showroom/assets`
- `SYNC_CONCURRENCY`
  - 默认 `4`
- `MAX_LOCAL_RELEASES`
  - 默认 `2`
- `MAX_LOCAL_CACHE_BYTES`
  - 默认 `1073741824`
- `STAGING_TTL_HOURS`
  - 默认 `24`

### Backend Publish Config

- `SHOWROOM_RELEASE_STORAGE_ROOT`
  - release manifest、文档和资源的发布根目录
- `SHOWROOM_RELEASE_RETAIN_COUNT`
  - 默认 `3`
  - 含当前 release 在内共保留 3 个 release
- `SHOWROOM_ASSET_HASH_ALGORITHM`
  - 固定 `sha256`
- `SHOWROOM_PUBLIC_SCHEMA_VERSION`
  - 当前固定 `1`

## Secrets

- 公共前台 release 读取不应依赖终端私密凭证。
- 后台 release 发布与切换操作继续沿用 `IntRuoyi` 内部权限控制。
- 客户端不得存储任何后台发布凭证或草稿预览凭证。

## Permissions

- `Website` / kiosk：
  - 只读公共 release 合同
- `IntRuoyi` 管理端：
  - 只有具备发布权限的内部用户可生成并切换 release
- `LegacyWebsiteConfigProjector`：
  - 只允许读取 active release，不允许读取草稿 release

## Security Controls

- manifest、文档与资源都必须带可验证哈希。
- 公共端只能读取已发布 release，不可读取 draft revision 或内部预览数据。
- 资源路径应不可变，避免同一路径下内容被覆盖造成缓存污染。
- 兼容接口 `GET /showroom/display/website-config` 在迁移期也必须只读取 active release，不得绕过 release 边界。
- 任一 JSON 或资源校验失败都应计入错误日志与告警，不得静默忽略。

## Cache Semantics

- `GET /showroom/release/current`
  - `Cache-Control: public, max-age=15, must-revalidate`
  - 允许频繁请求，用于低成本探针
- `GET /showroom/release/{releaseId}/manifest`
  - `Cache-Control: public, max-age=31536000, immutable`
- `GET /showroom/release/{releaseId}/documents/{documentId}.json`
  - `Cache-Control: public, max-age=31536000, immutable`
- `GET /showroom/assets/{assetId}/{contentHash}`
  - `Cache-Control: public, max-age=31536000, immutable`
  - `Accept-Ranges: bytes`

## Deployment Model

- 发布流程固定为：
  1. 从已发布 showroom revision/version 装配 release 内容。
  2. 计算 manifest hash、document hash、asset hash。
  3. 先写 release 目录或对象集合。
  4. 发布侧自检 manifest、文档、资产可读。
  5. 最后原子切换 `CurrentReleasePointer`。
- 不允许的部署顺序：
  - 先改 current 指针，再异步补 manifest 或资源
  - 复用同一路径覆盖旧资源字节流

## Retention and Purge Policy

- 后端默认保留 3 个 release：
  - 当前 active release
  - 最近两个历史 release
- purge 规则：
  - release 被清理后，对应 `manifest` 和 `documents` 返回 `410`
  - 资产仅在不再被任何保留 release 引用后才允许 purge
- 客户端默认保留 2 个已验证 release：
  - 当前 `active`
  - 最近一个 `retained`
- 若客户端容量不足：
  - 优先 purge 本地 `staging` / `failed`
  - 再 purge 最老 `retained`
  - 若仍不足，停止更新并保留当前 active release

## First Install and Update Constraints

- 首次安装必须具备：
  - 可用网络
  - 可用持久化介质
  - 足够缓存空间
  - 完整 release hash 校验通过
- 任一前提不满足：
  - 直接阻塞安装
- 更新失败时：
  - 当前 active release 保持不变
  - 必须记录失败步骤和错误码
  - 不允许把未完成 release 标记为 active

## Offline and Recovery Rules

- 支持离线运行的唯一前提：
  - 已有本地 active release
- 不支持：
  - 离线首次安装
  - 用未验证 release 离线启动
- 恢复策略：
  - 网络恢复后重新执行 `release/current` 探针
  - 不做自动“跳过校验的快速恢复”

## Observability

- 需要记录：
  - release 检查耗时
  - manifest 下载耗时
  - 文档下载数
  - 资产命中数 / 下载数 / 删除数
  - 激活时长
  - 激活失败原因
  - 哈希校验失败次数
  - GC 释放字节数
  - 当前 `activeReleaseId`
- 关键告警：
  - `release/current` 连续失败
  - 发布后 manifest 不可读
  - 资源缺失
  - 终端反复同步失败
  - 客户端缓存空间持续不足

## Verification Commands

- 文档设计校验：
  - `python -X utf8 C:\Users\BJB110\.codex\skills\system-design-docs\scripts\validate_system_design.py --root D:\ProjectPackage\Website`
- 前端单测与构建：
  - `npm test -- --run`
  - `npm run build`
- 前端真实路径验证：
  - `npx playwright test`
- 后端发布链路验证：
  - `mvn -f D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\pom.xml -pl yudao-module-showroom -am test`

## Open Questions

- 是否把 `activeReleaseId` 与安装错误主动上报到集中式运维平台，不影响当前 release 合同与安装边界。
- 是否为大音频资源增加专门的边缘压缩策略，不影响 URL、hash 与缓存语义。

## Design Blockers

- 如果部署层不能提供 `immutable` 资源缓存头和稳定的二进制字节流，本方案不得进入实现。
- 如果终端运行环境无法保证 `IndexedDB + Cache Storage` 持久化，必须先停在运行环境整改，不得用内存态或 session 级缓存替代。
