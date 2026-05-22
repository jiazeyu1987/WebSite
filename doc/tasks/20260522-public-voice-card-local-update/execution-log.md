# Execution Log

- Task: `20260522-public-voice-card-local-update`
- Scope: `D:\ProjectPackage\Website\src\medical-kiosk.js`, `D:\ProjectPackage\Website\src\medical-kiosk.test.js`
- Mode: BDD + Strict TDD

BDD: public narration card local controls update in place -> Given 公开讲解卡片已经渲染且其本地控制按钮可见 / When 用户点击这些本地控制按钮 / Then 公开讲解卡片应原位更新而不是触发整个应用根节点重建，同时语言、展开收起和静音状态仍正确变化

RED: npx vitest run src/medical-kiosk.test.js -t "keeps the public narration card mounted while toggling its local controls" -> FAIL, 点击语言切换后 `[data-reference-layout="medical-kiosk"]` 被整棵替换，证明当前实现仍在做 ready 态整树重渲染

GREEN: npx vitest run src/medical-kiosk.test.js -t "keeps the public narration card mounted while toggling its local controls" -> PASS
GREEN: npx vitest run src/medical-kiosk.test.js -> PASS
