# Task: kiosk 公司详情红框改为纯图标播控

## Goal

按用户最新标注图调整 `D:\ProjectPackage\Website` 根路径 kiosk 的公司详情页左下红框区域，确保：

- 红框内不再显示“播放讲解 / 停止讲解”文字；
- 主操作改为更醒目的纯播放 / 暂停图标；
- 图标尺寸与红框视觉重心匹配，更接近用户给出的目标图；
- 不改动现有真实数据来源、公司详情路由和其余右侧卡片内容。

## Scope

- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- `D:\ProjectPackage\Website\tests\kiosk-gallery.spec.js`
- `D:\ProjectPackage\Website\doc\tasks\20260522-kiosk-company-detail-icon-only-playback\**`

## Non-Scope

- 不修改 `/showroom` 独立公司详情页
- 不修改 `IntRuoyi` 接口 contract、字段来源或公司详情数据结构
- 不新增 fallback、占位数据、兼容分支或测试专用控件
- 不改动产品详情页播控样式

## Dependencies

- `D:\ProjectPackage\Int\IntPP\FRONTEND_STYLE.md` 作为当前前端基线
- 本地 `npm test` 与 `Playwright` 运行环境可用
- 根路径 kiosk 公司详情仍由 `src/medical-kiosk.js` / `src/medical-kiosk.css` 驱动

## Milestones

1. 建立本次任务文档，记录上一未完成任务的阻塞与本次独立前端范围。
2. 先补 RED 测试，锁定“红框内无文字、按钮改为纯图标、播放中显示暂停图标”的可观察行为。
3. 以最小前端改动完成结构和样式调整，并保持现有播控链路可用。
4. 运行单测与浏览器验证，更新任务记录、证据与最终状态。

## Expected Verification

- `npm test -- --run src/medical-kiosk.test.js`
- `npx playwright test tests/kiosk-gallery.spec.js --grep "icon-only playback" --reporter=line`
- `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-company-detail-icon-only-playback/frontend-feature-evidence.md`

## Current Status

Completed
- Completed work:
  - 已检查上一份未完成任务 `20260522-homepage-detail-runtime-blocker`，其阻塞为上游 `IntRuoyi` 真实 preview 数据缺失，已记录 blocker，与本次纯前端播控样式调整无直接冲突。
  - 已读取 `D:\ProjectPackage\Int\IntPP\FRONTEND_STYLE.md`，确认本次继续沿用现有蓝白灰视觉基线。
  - 已定位当前根路径 kiosk 公司详情播控实现位于 `src/medical-kiosk.js` / `src/medical-kiosk.css`，并确认现状为“图标 + 文字”按钮。
  - 已先补 RED 用例，锁定“红框播控区无可见文字、按钮改为纯图标、播放中显示暂停图标”的可观察行为。
  - 已把左下红框区域收敛为纯图标主操作：隐藏原标题文案块、移除按钮文字、放大图标按钮，并保留 `aria-label` / `title`。
  - 已将播放中图标从停止方块调整为暂停图标，并让公司详情按钮语义与实际 `paused` 状态保持一致。
  - 已修正一条与本任务同文件的旧单测，使其验证“语音面板未被卸载”而不是脆弱的 DOM 节点对象身份。
  - 已完成单测、目标 Playwright 用例与前端证据校验。
- Remaining blockers:
  - 无

## Follow-Up Notes

- 当前仓库里另有后续桌面双列布局任务会继续修改同一批 kiosk 文件；该后续任务可在本次纯图标播控改动基础上继续叠加，但不再阻塞本次需求关闭。

## Final Verification Result

- PASS: `npm test -- --run src/medical-kiosk.test.js`
- PASS: `npx playwright test tests/kiosk-gallery.spec.js --grep "icon-only playback" --reporter=line`
- PASS: `python C:\Users\BJB110\.codex\skills\frontend-feature-delivery\scripts\validate_frontend_feature.py --evidence doc/tasks/20260522-kiosk-company-detail-icon-only-playback/frontend-feature-evidence.md`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-company-detail-icon-only-playback --mode preview`
- PASS: `python -X utf8 C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260522-kiosk-company-detail-icon-only-playback --mode apply`
