# Change Request: 展厅详情中英文描述与语音切换

## Request Summary And Source

- Source: 当前线程用户请求
- Request summary: 展厅这里需要英文版，且公司详情与产品详情要支持中英文切换，切换时要联动描述和语音。

## Current Baseline Reviewed

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\showroom-app.js`
- `D:\ProjectPackage\Website\src\showroom-api.js`
- `D:\ProjectPackage\Int\IntRuoyi\ruoyi-vue-pro\yudao-module-showroom\src\main\java\**`
- `D:\ProjectPackage\Int\IntRuoyi\yudao-ui-admin-vue3\src\views\showroom-admin\**`

## Classification

- Requirement change
- Cross-repository frontend/backend contract change

## Impact

- Product impact: detail-page bilingual behavior expands from narration/title switching to full detail-description switching.
- Design impact: current detail UI needs stable language switch semantics without duplicating titles in the field list.
- Data impact: company and product public detail fields must expose bilingual values; client-side fake translation is not allowed.
- API impact: current anonymous display contracts are insufficient and must be expanded before Website can implement the behavior faithfully.
- Test impact: Website and IntRuoyi both need new RED/GREEN coverage for bilingual detail-field switching.
- Release impact: change cannot ship from Website alone.
- Operations impact: current local company live runtime is already blocked by narration source revision drift.

## Decision

- Decision: Block
- Reason: required public contract and part of the company data model are missing for a real bilingual detail-field switch.

## Required Approvals

- Approval to open a new `IntRuoyi` backend/data-contract task after its current unfinished task is resolved or explicitly blocked.

## Downstream Skill Reruns

- `backend-api-delivery` in `IntRuoyi`
- `frontend-feature-delivery` in `Website` after backend contract is available

## Blockers And Next Action

- Blocker 1: current `Website` public adapters only receive single-language `publicFields/publicProductFields`.
- Blocker 2: current local `showroom_company_revision` schema does not expose company detail English columns in runtime storage.
- Blocker 3: current anonymous company runtime still fails with `SHOWROOM_TARGET_NOT_FOUND: live company ZH narration source revision mismatch`.
- Next action: if you want me to continue, the next step is to switch into `D:\ProjectPackage\Int\IntRuoyi`, resolve or explicitly block its current in-progress task per repo policy, then create a backend bilingual-display task for company/product public detail contracts.
