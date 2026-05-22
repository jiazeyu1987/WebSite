# Task: Website 媒体增量同步与缓存方案评估

## Goal

评估 `D:\ProjectPackage\Website` 当前从 `IntRuoyi` 聚合接口读取展厅数据时，是否适合采用“首次全量获取、后续图片与音频按增量更新、不变资源走缓存”的方案，并给出与当前代码边界一致的落地建议。

## Scope

- `D:\ProjectPackage\Website\src\showroom-api.js`
- `D:\ProjectPackage\Website\doc\tasks\20260520-showroom-backend-integration-plan\technical-plan.md`
- `D:\ProjectPackage\Website\docs\changes\20260523-media-incremental-sync-triage.md`
- `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\yudao-module-showroom\**` 只读分析
- 本地运行时只读探针：
  - `GET http://127.0.0.1:48081/showroom/display/website-config`
  - 对返回的图片、音频 URL 做只读 `HEAD` 检查

## Non-Scope

- 不修改 `Website` 或 `IntRuoyi` 生产代码
- 不新增缓存、Service Worker、IndexedDB、增量接口或代理配置
- 不改变现有 fail-fast 行为，不以本地旧业务数据替代当前真实接口结果

## Dependencies

- 当前仓库最近任务 `20260522-runtime-playback-button-unify` 已为 `Completed`
- 可只读访问 `D:\ProjectPackage\Int\IntRuoyi` 代码与任务文档
- 若本地 `IntRuoyi` 运行时不可达，必须显式记录阻塞并停止对运行时结论的扩展

## Milestones

1. 建立任务文档并确认前一任务状态不阻塞本次只读评估。
2. 审阅 `Website` 当前真实数据获取链路，确认是否已存在前端增量同步或媒体缓存层。
3. 审阅 `IntRuoyi` 聚合契约与运行时响应头，确认是否已具备缓存失效信号与可缓存媒体条件。
4. 输出方案结论：是否可行、最小可落地路径、当前阻塞点与后续实现建议。

## Expected Verification

- 结论可回溯到 `Website` 本地代码与既有技术方案文档
- 运行时探针结果可证明当前媒体响应是否允许浏览器缓存
- 若建议依赖后端版本字段，必须明确当前 contract 是否已经提供

## Current Status

- Status: Completed
- Completed work:
  - 已确认本仓库最近任务 `20260522-runtime-playback-button-unify` 为 `Completed`，不阻塞本次只读评估。
  - 已核对 `src/showroom-api.js`：当前 `Website` 只请求一次匿名聚合接口 `GET /showroom/display/website-config`，然后直接消费返回的图片与音频 URL，本地尚无独立的“增量同步”或“媒体缓存清单”层。
  - 已核对既有集成技术方案：`technical-plan.md` 早已建议在聚合 contract 中补充 `lastPublishedAt / revisionId / versionNo / etag / updatedAt` 以支持前端缓存与排障，但当前 `Website` consumer 尚未消费这类字段。
  - 已只读核验本地运行时 `GET http://127.0.0.1:48081/showroom/display/website-config`，确认当前聚合 payload 会返回公司图、展厅图、产品图与中英音频 URL。
  - 已对返回的真实图片与音频 URL 执行 `HEAD` 检查，确认媒体响应头当前为 `Cache-Control: no-cache, no-store, max-age=0, must-revalidate`，浏览器被明确禁止复用缓存。
  - 已确认当前真实资源 URL 具备较强的“版本化路径”特征，例如日期段与业务文件名，适合配合强缓存或显式版本清单使用，但仅靠现状响应头不会自动命中缓存收益。
- Remaining blockers:
  - 当前 `IntRuoyi` 文件下载响应头禁止缓存，因此即使前端重复使用相同 URL，浏览器也不会自然达到“不变媒体不重复下载”的目标。
  - 当前公开聚合 contract 未显式暴露 `etag`、`updatedAt`、资源级 `revisionId` 或删除清单，前端无法可靠判断“哪些媒体新增、变更、减少”。

## Final Recommendation

- 方案可行，但建议拆成两层：
  - 近一步：继续每次只请求一次聚合 JSON，但让图片和音频走版本化 URL + 强缓存；这样不变媒体天然复用，变更媒体自动换 URL 重新下载。
  - 再一步：若后续真实 payload 规模或预下载量仍偏大，再增加轻量的“manifest / since-version”增量接口，只同步新增、变更、删除的媒体清单。
- 不建议直接把“上一次完整业务 payload”当作离线真相继续渲染；在当前仓库的 no-fallback 基线下，业务数据仍应以最新聚合接口结果为准，缓存更适合用于媒体复用而不是业务数据兜底。

## Final Verification Result

- PASS: `src/showroom-api.js` 代码审计确认当前 consumer 仅调用单一聚合接口。
- PASS: `technical-plan.md` 已存在 `revisionId / versionNo / etag / updatedAt` 的缓存设计建议。
- PASS: 本地匿名运行时 `GET http://127.0.0.1:48081/showroom/display/website-config` 返回 HTTP 200 与真实媒体 URL。
- PASS: 对真实图片与音频 URL 的 `HEAD` 探针确认当前响应头包含 `Cache-Control: no-cache, no-store, max-age=0, must-revalidate`。
