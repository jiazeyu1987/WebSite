# Test Plan: Showroom Release Delivery v1

## Scope

验证发布式 delivery v1 的关键用户行为、后端合同、前端安装器、离线边界、GC 行为和迁移期 `website-config` 兼容投影，确保系统不再依赖 live 聚合主路径。

## Environment

- Website workspace:
  - `D:\ProjectPackage\Website`
- Backend workspace:
  - `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro`
- Frontend unit/integration runtime:
  - `vitest`
- Frontend browser runtime:
  - `playwright`
- Backend test runtime:
  - `maven surefire`

## Real Data and Prerequisites

- 必须使用可发布的真实 showroom 数据模型，不允许用口头约定替代 release fixture。
- 必须有至少一个包含：
  - 公司首页图片
  - 至少一个展厅
  - 至少一个产品详情
  - 中英双语文本
  - 中英双语音频
  的可发布数据集。
- 必须有一个“更新失败”可复现条件：
  - 例如缺失资源、哈希不匹配或空间不足。
- 若前提缺失：
  - 直接 fail，并在 `execution-log.md` 记录阻塞与影响。

## Verification Commands

- 后端：
  - `mvn -f D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\pom.xml -pl yudao-module-showroom -am test`
- 前端 focused tests：
  - `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/main-entry.test.js`
- 前端全量回归：
  - `npm test -- --run`
- 构建：
  - `npm run build`
- 真实浏览器：
  - `npx playwright test`

## Test Cases

### T1: Release current contract

- Level:
  - backend unit/integration
- Covers:
  - `GET /showroom/release/current`
  - schema stability
  - no-release failure
- Expected:
  - 成功时返回单个 active release probe。
  - 无已发布 release 时返回 `503 SHOWROOM_RELEASE_UNAVAILABLE`。

### T2: Manifest and document model contract

- Level:
  - backend unit/integration
- Covers:
  - `GET /showroom/release/{releaseId}/manifest`
  - `GET /showroom/release/{releaseId}/documents/{documentId}.json`
- Expected:
  - manifest 固定包含一个 `website-index` 和多个 `product-detail-*`。
  - 不存在“单文档模式”的另一条成功路径。
  - 文档 hash 与 payload 一致。

### T3: Asset contract and retention semantics

- Level:
  - backend unit/integration
- Covers:
  - `GET /showroom/assets/{assetId}/{contentHash}`
  - release purge
  - asset purge
- Expected:
  - 资源成功返回不可变字节流和强缓存头。
  - 被 purge 的 release/document/asset 返回 `410`，不会重定向到新 release。

### T4: Legacy website-config projection

- Level:
  - backend integration
- Covers:
  - `GET /showroom/display/website-config`
- Expected:
  - 返回值可由 active release 文档完全重建。
  - active release 不完整时显式失败，不允许改回 live 聚合。

### T5: First install and blocking behavior

- Level:
  - frontend unit/integration
  - e2e
- Covers:
  - 无 active release 冷启动
  - 首次安装成功
  - 首次安装失败
- Expected:
  - 首次安装必须完整校验后才能进入页面。
  - 任一关键条件失败时显示阻塞错误，不展示半成品页面。

### T6: Update failure, offline boot, and old release retention

- Level:
  - frontend unit/integration
  - e2e
- Covers:
  - 更新失败保留当前 active release
  - 离线启动
  - 旧 release 保留数量
- Expected:
  - 更新失败时当前 active release 继续运行并暴露失败状态。
  - 离线冷启动仅在已有 verified active release 时允许。
  - 本地最多保留两个已验证 release。

### T7: Garbage collection and quota handling

- Level:
  - frontend unit/integration
- Covers:
  - 缓存空间不足
  - 过期 staging/failed 数据清理
  - 无引用资源删除
- Expected:
  - GC 只删除无引用数据。
  - 首次安装空间不足时阻塞。
  - 增量更新空间不足时保持当前 active release，不切换。

### T8: Real user path installation and activation

- Level:
  - e2e
- Covers:
  - 真实浏览器启动
  - 安装 release
  - 切换 active release
  - 渲染真实页面
- Expected:
  - Playwright 必须走真实前端入口。
  - 安装完成前不能进入最终页面。
  - 新 release 只在全量校验成功后切换。

## Coverage Matrix

| Case ID | Scenario | Primary Command | Evidence |
| --- | --- | --- | --- |
| T1 | release current 成功与无 release 失败 | `mvn -f D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\pom.xml -pl yudao-module-showroom -am test` | 后端测试输出、`execution-log.md` |
| T2 | manifest/document schema 固定 | `mvn -f D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\pom.xml -pl yudao-module-showroom -am test` | 后端测试输出、schema assertions |
| T3 | asset 不可变与 purge 语义 | `mvn -f D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\pom.xml -pl yudao-module-showroom -am test` | 后端测试输出、headers assertions |
| T4 | website-config 兼容投影 | `mvn -f D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\pom.xml -pl yudao-module-showroom -am test` | 后端投影测试、`execution-log.md` |
| T5 | 首次安装成功与失败阻塞 | `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/main-entry.test.js` and `npx playwright test` | Vitest 输出、Playwright 截图/trace |
| T6 | 更新失败、离线启动、保留旧 release | `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/main-entry.test.js` and `npx playwright test` | Vitest 输出、Playwright 证据 |
| T7 | GC 与配额处理 | `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js src/main-entry.test.js` | Vitest 输出、`execution-log.md` |
| T8 | 真实用户路径安装与激活 | `npx playwright test` | Playwright 报告、截图、trace |

## RED / GREEN / REGRESSION Template

- RED:
  - 先新增或修改测试，让当前实现因缺少 release publisher、installer、GC、projection 或错误处理而失败。
  - 在 `execution-log.md` 中记录：
    - `RED: <command> -> FAIL, <expected reason>`
- GREEN:
  - 只做最小实现让对应测试通过。
  - 在 `execution-log.md` 中记录：
    - `GREEN: <command> -> PASS`
- REGRESSION:
  - 重跑：
    - `mvn -f D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\pom.xml -pl yudao-module-showroom -am test`
    - `npm test -- --run`
    - `npm run build`
    - `npx playwright test`
  - 在 `execution-log.md` 中补全回归结论。

## Gates

- Gate 1:
  - 后端 contract tests 先红后绿。
- Gate 2:
  - 前端 installer/store/GC tests 先红后绿。
- Gate 3:
  - `npm run build` 通过。
- Gate 4:
  - Playwright 真实路径通过。
- Gate 5:
  - `execution-log.md` 中存在关键场景 `BDD/RED/GREEN/REGRESSION` 证据。

## Evidence Landing

- 执行日志：
  - `D:\ProjectPackage\Website\doc\tasks\20260523-showroom-release-architecture-doc-review\execution-log.md`
- 任务状态：
  - `D:\ProjectPackage\Website\doc\tasks\20260523-showroom-release-architecture-doc-review\task.md`
- 系统设计基线：
  - `D:\ProjectPackage\Website\docs\system\backend-api-design.md`
  - `D:\ProjectPackage\Website\docs\system\data-model.md`
  - `D:\ProjectPackage\Website\docs\system\frontend-design.md`
  - `D:\ProjectPackage\Website\docs\system\config-security-deployment.md`

## Fail Criteria

- 任一关键测试只能靠 mock 成功、默认值、跳过路径或静默降级通过。
- 首次安装失败时仍能进入页面。
- 更新失败后出现半切换状态。
- 旧 `website-config` 仍直接读取 live 聚合。
- 资源 purge 后旧路径被重定向到新内容。
