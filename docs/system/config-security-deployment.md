# Config Security Deployment

## Purpose and Scope

定义最优发布架构在配置、安全、部署与观测层面的要求，确保前台安装 release 时既可复用缓存，又不会误读未发布内容。

## Evidence Reviewed

- `D:\ProjectPackage\Website\doc\tasks\20260520-showroom-backend-integration-plan\technical-plan.md`
- `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\yudao-module-showroom\src\main\java\**`

## Configuration

- 前端配置项建议：
  - `RELEASE_CURRENT_ENDPOINT`
  - `RELEASE_MANIFEST_BASE`
  - `ASSET_BASE_URL`
  - `SYNC_CONCURRENCY`
  - `MAX_LOCAL_RELEASES`
  - `MAX_LOCAL_CACHE_BYTES`
- 后端配置项建议：
  - release 发布目录
  - 旧 release 保留策略
  - 资源路径生成规则

## Secrets

- 公共前台 release 读取不应依赖终端私密凭证。
- 后台 release 发布与切换操作继续沿用 `IntRuoyi` 内部权限控制。

## Permissions

- `Website` / kiosk：
  - 只读公共 release 合同
- `IntRuoyi` 管理端：
  - 只有具备发布权限的内部用户可生成并切换 release

## Security Controls

- manifest、文档与资源都应带可验证哈希。
- 公共端只能读取已发布 release，不可读取 draft revision 或内部预览数据。
- 资源路径应不可变，避免同一路径下内容被覆盖造成缓存污染。
- 若部署链路存在网关或边缘缓存，应确保 manifest 与 asset 拥有不同缓存策略。

## Deployment

- `release current`
  - 应小且可频繁请求，缓存策略偏短。
- `manifest` 与 `documents`
  - 可按 release 或 hash 缓存。
- `assets`
  - 应为强缓存、不可变资源。
- 若存在反向代理或网关，推荐由其统一暴露 release 和 asset 路径；不要求 `Website` 自己拼文件存储地址。

## Observability

- 需要记录：
  - release 检查耗时
  - manifest 下载耗时
  - 资产命中数 / 下载数 / 删除数
  - 激活时长
  - 激活失败原因
  - 哈希校验失败次数
- 关键告警：
  - 发布后 manifest 不可读
  - 资源缺失
  - 终端反复同步失败

## Open Questions

- 是否需要主动上报设备当前 `activeReleaseId`
- 终端网络环境是否允许较大的首次安装包

## Design Blockers

- 若文件分发层仍返回禁止缓存的响应头，则即便 release 设计正确，也无法释放媒体复用的主要性能收益。
