# Task: 写入 IntRuoyi 只读数据边界到 AGENTS

## Goal

把当前线程中已明确确认的长期边界写入 `D:\ProjectPackage\Website\AGENTS.md`：
`Website` 及相关协作任务默认只从 `IntRuoyi` 读取数据，不向 `IntRuoyi` 写数据，不污染 `IntRuoyi` 数据库。

## Scope

- `D:\ProjectPackage\Website\AGENTS.md`
- `D:\ProjectPackage\Website\doc\tasks\20260522-agents-intruoyi-readonly-boundary\**`

## Non-Scope

- 不修改 `IntRuoyi` 代码、数据库或配置
- 不改写与该基线无关的其他 AGENTS 规则
- 不顺带整理其他线程基线

## Milestones

1. 检查当前 `AGENTS.md` 是否存在冲突的同主题规则。
2. 追加本次长期边界基线。
3. 复读校验写入结果并记录完成状态。

## Expected Verification

- `D:\ProjectPackage\Website\AGENTS.md` 中存在新的 `Thread baseline` 行
- 新基线与现有规则不冲突

## Current Status

- Status: Completed
- Completed work:
  - 已检查当前 `AGENTS.md`，未发现与本次“IntRuoyi 只读数据边界”冲突的同主题规则。
  - 已追加新的线程基线，约束默认只从 `IntRuoyi` 读取数据，不向其写数据或污染其数据库。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `D:\ProjectPackage\Website\AGENTS.md` 已写入本次长期边界基线
