BDD: showroom app-config loads against the active runtime target -> Given the frontend is opened on `/showroom` with the current production-intended runtime settings / When it requests the anonymous `GET /showroom/display/app-config` contract / Then it must hit the correct active target revision and render the company entry instead of failing with `SHOWROOM_TARGET_NOT_FOUND`.

BDD: showroom fails fast on real backend contract errors -> Given the backend returns a non-zero code for `GET /showroom/display/app-config` / When `/showroom` boots / Then the page must show the explicit backend error and must not fall back to local mock data.

RED: `Invoke-WebRequest http://127.0.0.1:4173/showroom/display/app-config` -> FAIL, returns `{"success":false,"message":"SHOWROOM_TARGET_NOT_FOUND: live company ZH narration source revision mismatch","code":500,...}`.

INFO: direct backend probe `Invoke-WebRequest http://127.0.0.1:48081/showroom/display/app-config` reproduces the same `SHOWROOM_TARGET_NOT_FOUND: live company ZH narration source revision mismatch`, so the failure occurs before Website mapping/rendering logic.

INFO: read-only SQL inspection shows `showroom_company.id=1.current_revision_id = 7`, but public company narration `source_revision_id` remains on `5/6` and company preview `source_revision_id` remains on `5`.

INFO: read-only SQL inspection shows hall-mapped products already align preview + ZH/EN narration with their current revisions, so the current blocker is isolated to company live data.

GREEN: `npm test -- --run src/showroom-api.test.js src/showroom-app.test.js` -> PASS

INFO: Conclusion: this Website task is blocked by IntRuoyi local live data drift, not by a Website code regression.
