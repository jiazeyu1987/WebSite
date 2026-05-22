# Change Request: Website 媒体增量同步与缓存方案评估

## Request Summary And Source

- Source: 当前线程用户请求
- Request summary: 用户提出一个性能优化想法，希望 `Website` 第一次从 `IntRuoyi` 获取数据后，下一次仅针对图片、音频做增量获取；新增、变更、删除的媒体再同步，不变媒体直接复用缓存，并询问该方案是否可行。

## Current Baseline Reviewed

- `D:\ProjectPackage\Website\src\showroom-api.js`
- `D:\ProjectPackage\Website\doc\tasks\20260520-showroom-backend-integration-plan\technical-plan.md`
- `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\yudao-module-showroom\**`
- 本地运行时匿名接口与真实媒体 URL 响应头：
  - `GET http://127.0.0.1:48081/showroom/display/website-config`
  - `HEAD` company image URL
  - `HEAD` company ZH audio URL

## Classification

- Technical constraint and performance optimization assessment
- Runtime cache / incremental sync change evaluation

## Impact

- Product impact: 首屏进入速度、重复进入速度、媒体加载稳定性会受影响。
- Design impact: 无直接视觉改动，但可能影响图片和音频的加载时序与过渡体验。
- Data impact: 需要可判定“新增 / 变更 / 删除 / 未变”的版本标识，且删除语义必须明确。
- API impact: 若只做浏览器强缓存，可能只需调整媒体资源缓存头或版本化 URL 规则；若要真正的“只拉增量”，则需要新增 manifest 或 `since-version` 类接口。
- Test impact: 后续若实施，需要新增接口层、浏览器层和真实运行时缓存命中验证；尤其要覆盖媒体变更后能刷新、媒体未变时不重复下载、媒体被删除时不再引用。
- Release impact: 若仅做前端缓存而不改后端响应头，收益有限；若调整文件服务缓存策略，需要评估网关/CDN/文件服务一致性。
- Operations impact: 当前真实媒体响应头为 `Cache-Control: no-cache, no-store, max-age=0, must-revalidate`，会直接阻止浏览器复用缓存，是当前最大落地阻塞。

## Decision

- Decision: Split
- Accepted now:
  - 接受“图片、音频应优先复用缓存，避免每次重复下载”的方向。
  - 接受“业务元数据仍继续通过单一聚合接口获取”的现阶段边界。
- Deferred:
  - 是否立即建设完整的“增量清单 / since-version”接口，建议等第一阶段缓存收益验证后再决定。
  - 是否把旧业务 payload 作为离线兜底继续渲染，当前不建议这样做。

## Required Approvals

- 若要实施第一阶段，需要用户批准修改 `IntRuoyi` 文件服务或代理层缓存策略，或批准新增显式媒体缓存层。
- 若要实施第二阶段，需要用户批准增加 `IntRuoyi` 聚合 contract 的版本字段或新增增量接口。

## Downstream Skill Reruns

- 第一阶段实施：
  - `backend-api-delivery` 或 `ci-cd-environment-delivery`
  - `frontend-feature-delivery`
- 第二阶段实施：
  - `backend-api-delivery`
  - `frontend-feature-delivery`
  - `quality-assurance-test-suite`

## Blockers And Next Action

- Blocker: 当前本地真实图片与音频响应头均为 `Cache-Control: no-cache, no-store, max-age=0, must-revalidate`。
- Impact: 即使前端重复使用完全相同的媒体 URL，浏览器也不会自然实现“不变资源复用缓存”。
- Next action:
  - 第一优先级：保留当前单一聚合 JSON 拉取方式，只为媒体资源建立可验证的强缓存条件。
  - 建议方式：版本化媒体 URL 或显式资源版本号，加上可缓存响应头。
  - 第二优先级：若仍需要进一步减少媒体预取量，再补一个 `since-version` 增量清单接口，返回新增、变更、删除的媒体键集合。
