# Development Plan: Showroom Release Delivery v1

## Objective

按已定稿的 release-based delivery 架构实现 `IntRuoyi -> Website/kiosk` 的发布、安装、校验、激活与回收能力，禁止继续扩展基于 live `website-config` 的运行时增量同步主路径。

## Architecture Decisions Frozen by This Plan

- v1 公开读合同固定为：
  - `GET /showroom/release/current`
  - `GET /showroom/release/{releaseId}/manifest`
  - `GET /showroom/release/{releaseId}/documents/{documentId}.json`
  - `GET /showroom/assets/{assetId}/{contentHash}`
- 迁移期 `GET /showroom/display/website-config` 只允许作为 active release 的兼容投影。
- v1 文档模型固定为：
  - `website-index`
  - `product-detail-{productId}`
- 客户端默认：
  - `IndexedDB + Cache Storage`
  - `MAX_LOCAL_CACHE_BYTES = 1 GiB`
  - `MAX_LOCAL_RELEASES = 2`

## Dependency Prerequisites

- `IntRuoyi` 具备可测试的 showroom 发布数据。
- 目标 kiosk/浏览器环境支持 `IndexedDB + Cache Storage`。
- `Website` 和 `IntRuoyi` 均可在本地测试运行。
- 若任一前提缺失：
  - 立即阻塞，不得用 mock 成功或跳过关键链路代替。

## Subagent Worksplit

- `Subagent-A BackendPublisher`
  - 负责 `IntRuoyi` release assembler、registry、manifest、document、asset 只读接口、legacy projector。
- `Subagent-B FrontendInstaller`
  - 负责 `Website` release probe、manifest/document store、asset installer、verifier、activator、GC。
- `Subagent-C VerificationAndObservability`
  - 负责 Vitest、Playwright、后端测试、日志与告警点、证据汇总。

## Milestones

### M1: Freeze contract and test fixtures

- Owner:
  - `Subagent-A`
  - `Subagent-C`
- Deliverables:
  - 固化 release JSON schema 与错误码
  - 固化 `website-config` 投影映射
  - 建立最小真实 fixture 数据集
- BDD:
  - `BDD: Release current exposes immutable metadata -> Given published release / When request current / Then return one active immutable release probe`
  - `BDD: Legacy website-config is projected from release docs -> Given migration period / When request website-config / Then payload is reconstructed from active release docs`
- RED:
  - `mvn -f D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\pom.xml -pl yudao-module-showroom -am test`
  - 预期失败原因：release 端点、schema 校验、legacy projector 测试尚不存在。
- GREEN:
  - 同上命令通过，且新增后端 contract tests 通过。
- REGRESSION:
  - 再跑同一命令，并确认旧 `website-config` contract tests 与新 release contract tests 同时通过。
- Gate:
  - 所有 schema、错误模型、缓存头、保留规则在测试中有断言。
  - `execution-log.md` 记录 `BDD/RED/GREEN` 证据。

### M2: Build backend release publisher and immutable read APIs

- Owner:
  - `Subagent-A`
- Deliverables:
  - release assembler
  - current pointer read API
  - manifest/document/asset read API
  - server-side retention and purge rules
- BDD:
  - `BDD: Manifest lists website-index and product-detail documents -> Given published release / When request manifest / Then document list matches fixed v1 model`
  - `BDD: Purged release does not redirect to current -> Given old release is beyond retention / When request old manifest / Then return 410`
  - `BDD: Asset path is immutable by assetId and contentHash -> Given referenced asset / When request asset URL / Then body and ETag match contentHash`
- RED:
  - `mvn -f D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\pom.xml -pl yudao-module-showroom -am test`
  - 预期失败原因：接口、purge 行为、asset hashing、projection 行为未实现。
- GREEN:
  - 同上命令通过。
- REGRESSION:
  - 同上命令再次通过，并附带 release fixture 自检输出。
- Gate:
  - `GET /showroom/release/current`、manifest、documents、assets 的 happy path 和失败 path 全部有自动化测试。

### M3: Build frontend installer, verifier, activator, and GC

- Owner:
  - `Subagent-B`
- Deliverables:
  - `release/current` probe client
  - manifest/document storage
  - asset installer and verifier
  - active release switch
  - offline boot and GC logic
- BDD:
  - `BDD: First install blocks until a full verified release exists -> Given no active release / When initial sync fails / Then app does not enter showroom route`
  - `BDD: Existing active release survives update failure -> Given active release exists / When new release verify fails / Then current active remains visible and failure is surfaced`
  - `BDD: Offline boot uses only verified active release -> Given network is offline and active release exists / When app boots / Then app renders from local release without changing active pointer`
  - `BDD: GC only removes unreferenced assets -> Given active and retained releases exist / When new release activates / Then GC keeps assets still referenced by active or retained releases`
- RED:
  - `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/main-entry.test.js`
  - 预期失败原因：release store、installer、verifier、activator、GC 测试尚不存在或现有逻辑仍依赖 `website-config`。
- GREEN:
  - 同上命令通过。
  - `npm run build` 通过。
- REGRESSION:
  - `npm test -- --run`
  - `npm run build`
- Gate:
  - 不允许继续从 live `website-config` 作为主运行数据源。
  - 首次安装、更新失败、离线启动、空间不足、GC 均有单测覆盖。

### M4: Real browser and cross-repo verification

- Owner:
  - `Subagent-C`
- Deliverables:
  - Playwright 真实前端路径验证
  - 后端与前端联调证据
  - 最终回归报告
- BDD:
  - `BDD: Device installs a release and renders real showroom pages -> Given backend exposes a published release / When frontend boots on a clean profile / Then it installs the release before entering real user routes`
  - `BDD: Update installs new release atomically -> Given device already runs one release / When backend publishes a new release / Then the UI stays on old release until all new resources verify and only then switches`
- RED:
  - `npx playwright test`
  - 预期失败原因：真实浏览器路径尚未具备 release 安装流、错误提示或 GC 证据。
- GREEN:
  - `npx playwright test`
  - `npm test -- --run`
  - `npm run build`
  - `mvn -f D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\pom.xml -pl yudao-module-showroom -am test`
- REGRESSION:
  - 重跑上述全部命令，确保跨仓回归通过。
- Gate:
  - Playwright 必须走真实用户路径。
  - 接口只能用于最终校验，不替代浏览器主路径。

## Blocker Handling

- 如果缺少发布 fixture、测试租户、浏览器持久化能力、磁盘空间策略、后端 hash 支持：
  - 立即记录到 `execution-log.md`
  - 中止当前 milestone
  - 不允许用 mock、默认值或跳过测试继续推进
- 如果某个 milestone RED 无法稳定复现：
  - 先补失败测试或最小可复现，再进入实现

## Evidence Landing Zones

- BDD/TDD 证据：
  - `D:\ProjectPackage\Website\doc\tasks\20260523-showroom-release-architecture-doc-review\execution-log.md`
- 任务状态：
  - `D:\ProjectPackage\Website\doc\tasks\20260523-showroom-release-architecture-doc-review\task.md`
- 覆盖矩阵与验证命令：
  - `D:\ProjectPackage\Website\doc\tasks\20260523-showroom-release-architecture-doc-review\test-plan.md`
- 系统设计基线：
  - `D:\ProjectPackage\Website\docs\system\*.md`

## Exit Criteria

- 四个 release 读接口完成并有自动化验证。
- `website-config` 兼容投影完成且不再直接 live 聚合。
- 前端安装器、激活器、GC、离线启动逻辑通过 Vitest 和 Playwright。
- `execution-log.md` 具备每个关键场景的 `BDD/RED/GREEN/REGRESSION` 证据。
