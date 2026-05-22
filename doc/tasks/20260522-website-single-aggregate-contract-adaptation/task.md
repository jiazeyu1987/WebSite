# Task: Website 适配 IntRuoyi 单一聚合接口方案

## Goal

基于当前 `IntRuoyi` 任务文档，输出一份 `Website` 侧改造说明，明确在 `IntRuoyi` 切换为“单一聚合接口、产品详情正文一起返回、旧接口删除”后，`Website` 需要如何修改。

## Scope

- `D:\ProjectPackage\Website\doc\tasks\20260522-website-single-aggregate-contract-adaptation\**`
- `D:\ProjectPackage\Website\src\**` 只读分析

## Non-Scope

- 不修改 `Website` 生产代码
- 不修改 `IntRuoyi` 代码或数据库
- 不新增 fallback 或临时兼容分支

## Milestones

1. 建立任务记录并核对当前 `Website` 现状。
2. 梳理 `Website` 当前对 `IntRuoyi` 接口的依赖点。
3. 写出单一聚合接口落地后的 `Website` 改造说明。

## Expected Verification

- 文档中的改造点可回溯到当前 `Website` 文件
- 文档中的接口边界与 `IntRuoyi` 最新任务包一致

## Current Status

- Status: Completed
- Completed work:
  - 已建立本次说明任务记录。
  - 已基于当前 `Website` 代码和 `IntRuoyi` 最新任务包整理改造说明。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: 已输出 `Website` 适配单一聚合接口的修改说明
