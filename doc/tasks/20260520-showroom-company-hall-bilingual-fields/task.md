# Task: Showroom Company Hall Bilingual Fields

## Goal

扩展 `Website` 与 `IntRuoyi` showroom 契约，让公司与展厅也支持中英文切换，并确保切换时与对应语言语音同步。

## Current Status

- Status: Completed
- Completed work:
  - 前端 app-config consumer 已支持 `company.nameEn`、`showroom.nameEn`、`showroom.descriptionEn`。
  - `/showroom` 页面的公司标题、展厅标题、展厅描述会随语言切换。
  - 中英文切换仍同步切换对应音频源。
  - 本地真实联调已验证当前 runtime 能返回 `nameEn/descriptionEn` 并被前端渲染。
- Remaining blockers:
  - 当前 8 个展厅的 `description` / `descriptionEn` 在本地运行库中仍为空字符串，因此描述区域会跟着语言切换但暂无实际文案内容。

## Final Verification Result

- PASS: `npm test -- --run`
- PASS: `npm run build`
- PASS: `npx playwright test --reporter=line`
- PASS: real runtime `GET http://127.0.0.1:48081/showroom/display/app-config` now returns bilingual company/hall fields

