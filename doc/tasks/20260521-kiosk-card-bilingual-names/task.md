# Task: Kiosk Card Bilingual Names

## Goal

Render each kiosk gallery card name in the bottom-left label area and switch that product name between Chinese and English from a compact header toggle, while keeping the current large-screen kiosk layout unchanged.

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\tests\kiosk-detail.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260521-kiosk-card-bilingual-names\**`

## Non-Scope

- No new public Website API.
- No conversion of the kiosk root page into a live `IntRuoyi` runtime consumer.
- No changes to hall titles, right-side narration copy, or other static kiosk chrome.
- No guessed or machine-translated English product names.

## Dependencies

- `IntRuoyi` remains the authority for product `name_cn -> name_en`.
- Every current kiosk base product label must map to exactly one authoritative `IntRuoyi` product English name before frontend implementation can continue.

## Milestones

1. Create the task record and execution log.
2. Audit the current kiosk base product names and match them to authoritative `IntRuoyi` bilingual product names.
3. Add failing tests for card-label rendering, language switching, and language persistence.
4. Implement bilingual kiosk product rendering and styling.
5. Run verification and record final evidence.

## Expected Verification

- `npm test -- --run`
- `npm run build`

## Current Status

- Status: Blocked
- Completed work:
  - Created the task record and execution log.
  - Decoded the 12 current kiosk base product names from `src/medical-kiosk.js`.
  - Audited `IntRuoyi` showroom product revisions and historical seed data for authoritative bilingual product names.
- Blocker:
  - The current kiosk base names do not map uniquely to authoritative `IntRuoyi` product names. Per task assumptions and the global no-fallback policy, implementation must stop before frontend changes.
- Impact:
  - The kiosk cannot safely render English card names without either a confirmed name-mapping table or a source-data adjustment that makes each current kiosk label resolve to one authoritative `name_en`.

## Mapping Audit Result

- Exact or unique authoritative matches were not found for the following current kiosk labels:
  - `导入鞘套组`
  - `亲水导管`
  - `塑形导管`
  - `输送组件`
  - `球囊扩张导管`
  - `微导丝`
  - `支架系统`
  - `血栓回收装置`
  - `封堵器组件`
  - `三通连接件`
  - `压力延长管`
  - `冲洗回路`

## Next Required Input

- Provide a confirmed one-to-one mapping table for the 12 kiosk Chinese labels to authoritative `IntRuoyi` product ids or approved English names, or adjust the kiosk product list to use the real `IntRuoyi` product names directly.
