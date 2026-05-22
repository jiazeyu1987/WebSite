# Bug Summary

`/showroom` 真实运行时显示“展厅数据加载失败”，错误消息为 `SHOWROOM_APP_CONFIG_UNAVAILABLE: backend returned code 500 (SHOWROOM_TARGET_NOT_FOUND: live company ZH narration source revision mismatch) from /showroom/display/app-config.`。

# Expected Behavior

前端应命中当前可用的匿名展厅配置目标，并成功渲染公司入口卡片；如果后端真实缺少前置数据，也必须保留显式报错，不得 fallback。

# Reproduction Command Or Path

- Path: `http://127.0.0.1:4173/showroom`

# Root Cause

- Website frontend requests the expected anonymous endpoint `/showroom/display/app-config` through the existing Vite proxy and correctly surfaces backend errors.
- The local IntRuoyi runtime currently has live company data drift:
  - `showroom_company.id=1.current_revision_id = 7`
  - public `PUBLISHED` company narration rows still point to `source_revision_id = 5/6`
  - public `PUBLISHED` company preview asset row still points to `source_revision_id = 5`
- Because `ShowroomApiRuntime` enforces source-revision consistency, the backend fails fast with `SHOWROOM_TARGET_NOT_FOUND: live company ZH narration source revision mismatch` before Website can map or render the payload.

# Regression Test Added Or Updated

- No Website production-code change was made, because the reproduced failure is upstream of Website logic.
- Existing Website regression coverage still passes:
  - `src/showroom-api.test.js`
  - `src/showroom-app.test.js`

# RED Command And Result

- `Invoke-WebRequest http://127.0.0.1:4173/showroom/display/app-config` -> FAIL, returns `{"success":false,"message":"SHOWROOM_TARGET_NOT_FOUND: live company ZH narration source revision mismatch","code":500,...}`.
- `Invoke-WebRequest http://127.0.0.1:48081/showroom/display/app-config` -> FAIL, returns the same backend payload.

# GREEN Command And Result

- `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js` -> PASS
- No full GREEN runtime command is available in this repository until IntRuoyi live company data is repaired.

# Risk And Regression Scope

- Risk is limited to the Website public showroom bootstrap path and any other consumer of anonymous `GET /showroom/display/app-config`.
- Changing Website code here would risk masking a real backend live-data inconsistency and violate the no-fallback policy.

# Blockers And Follow-up

- Blocker: local IntRuoyi company preview / narration live data must be realigned to the current company revision before `/showroom` can recover.
- Follow-up: if you want me to continue the fix across repositories, the next step is to switch into `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro`, explicitly block its current in-progress task per repo policy, create a new backend data-repair task record, and then repair the local live company preview/narration rows.
