# Task: Showroom Language Toggle Audio Sync

## Goal

在 `Website` 的 showroom 前台中增加中英文切换能力，并确保切换时不仅更换前端文字描述，也同步切换对应语言的音频源。

## Milestones

1. 为 showroom 页面定义语言状态和切换入口。
2. 让公司页与产品详情页按当前语言渲染对应文案。
3. 让公司页与产品详情页按当前语言切换对应音频源。
4. 补齐单测与浏览器验证，覆盖文案和音频同步切换。

## Expected Verification

- `npm test -- --run`
- `npm run build`
- `npx playwright test --reporter=line`

## Current Status

- Status: Completed
- Completed work:
  - 已新增 showroom 语言状态与切换按钮。
  - 公司页与产品详情页现在按当前语言只显示对应文案，并同步切换对应 `audio src`。
  - 已支持记住上次选择的语言，并在下次进入 showroom 时恢复。
  - 已补齐 kiosk 详情页结构，恢复现有回归链路通过。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `npm test -- --run`
- PASS: `npm run build`
- PASS: `npx playwright test --reporter=line`
