# Task: Int-medical `col14` 七展厅抓取与 Excel 交付

## Goal

抓取 `https://int-medical.com/col14` 产品中心下 7 个展厅的展厅名称、展厅 ICON、产品名称、产品主图、产品描述与展厅对应关系，并生成一个带嵌入缩略图且保留本地路径的 Excel 交付物。

## Scope

- `doc/tasks/20260521-int-medical-col14-extract/**`

## Non-Scope

- 不改动现有站点业务代码或仓库业务前端代码。
- 不额外抓取产品详情页中的非主图附图。
- 不引入 fallback、占位数据或缺字段继续导出。

## Dependencies

- 目标站点 `https://int-medical.com` 必须可访问。
- Bundled Python 依赖必须可用：`lxml`、`openpyxl`、`Pillow`。
- 任务必须遵守 strict TDD，先有测试再实现抓取与导出。

## Milestones

1. 创建任务文档、执行日志、脚本与测试目录骨架。
2. 先补 RED 测试，锁定 7 展厅解析、普通分页解析、`col22` AJAX 解析、详情页解析与 Excel smoke 行为。
3. 实现抓取脚本、图片下载、Excel 生成与 fail-fast 校验。
4. 跑通单测、执行真实站点全量抓取、更新任务记录并完成 closeout preview。

## Expected Verification

- `C:\Users\BJB110\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m unittest discover -s doc/tasks/20260521-int-medical-col14-extract -p "test_*.py"`
- `C:\Users\BJB110\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe doc/tasks/20260521-int-medical-col14-extract/extract_showrooms.py`
- `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-int-medical-col14-extract --mode preview`

## Milestone Status

### Milestone 1

- Status: Completed
- Completed work:
  - 已确定抓取范围、Excel 结构、`col22` 的 AJAX 规则与二级分类规则。
  - 已创建任务文档、执行日志、fixture 目录与单测骨架。
- Verification evidence:
  - `doc/tasks/20260521-int-medical-col14-extract/task.md`
  - `doc/tasks/20260521-int-medical-col14-extract/execution-log.md`
  - `doc/tasks/20260521-int-medical-col14-extract/test_extract_showrooms.py`
- Remaining blockers:
  - None.

### Milestone 2

- Status: Completed
- Completed work:
  - 已补齐本地 fixtures，覆盖 7 展厅、普通分页、`col22` AJAX、详情页与 workbook smoke。
  - 已执行一轮 RED，确认当前失败点为抓取模块未实现。
- Verification evidence:
  - `doc/tasks/20260521-int-medical-col14-extract/fixtures/`
  - `doc/tasks/20260521-int-medical-col14-extract/test_extract_showrooms.py`
  - `C:\Users\BJB110\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m unittest discover -s doc/tasks/20260521-int-medical-col14-extract -p "test_*.py"` (RED)
- Remaining blockers:
  - Scraper implementation still pending.

### Milestone 3

- Status: Completed
- Completed work:
  - 已实现任务内 Python 抓取脚本 `extract_showrooms.py`，覆盖 7 展厅导航解析、普通 HTML 分页、`col22` AJAX 分页、详情页解析、图片下载与 Excel 生成。
  - 已实现展厅 SVG 预览转换 helper `render_svg_preview.cjs`，用于将默认态展厅 SVG 生成 Excel 可嵌入 PNG 预览。
  - 已加入同源请求的有上限重试，用于处理目标站点偶发 SSL EOF。
  - 经用户明确授权后，已为缺失 `产品描述` 的详情页增加最小范围 fallback，导出值显式标记为 `[FALLBACK] 源站缺少产品描述`。
- Verification evidence:
  - `doc/tasks/20260521-int-medical-col14-extract/extract_showrooms.py`
  - `doc/tasks/20260521-int-medical-col14-extract/render_svg_preview.cjs`
  - `C:\Users\BJB110\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m unittest discover -s doc/tasks/20260521-int-medical-col14-extract -p "test_*.py"` (GREEN)
- Remaining blockers:
  - None.

### Milestone 4

- Status: Completed
- Completed work:
  - 已执行真实站点全量抓取并成功生成最终 Excel。
  - 已核对 workbook 中 `展厅` / `产品` 两个 sheet 的嵌入图片数量分别为 `7` / `176`。
  - 已确认 fallback 仅命中 1 条记录：`医疗标准件 / 旋塞阀 / https://int-medical.com/col22/2891`。
  - 已执行 closeout preview，并核对 cleanup keep/delete 结果。
- Verification evidence:
  - `C:\Users\BJB110\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe doc/tasks/20260521-int-medical-col14-extract/extract_showrooms.py` (GREEN)
  - `D:\ProjectPackage\Website\doc\tasks\20260521-int-medical-col14-extract\artifacts\int-medical-col14-showrooms.xlsx`
  - `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-int-medical-col14-extract --mode preview` (GREEN)
- Remaining blockers:
  - None.

## Current Status

- Status: Completed
- Completed work:
  - 已完成目标站点结构摸底，确认 7 个展厅入口、普通分页规则、`col22` AJAX 接口与详情页字段结构。
  - 已完成 strict TDD 的 BDD 场景、fixtures 与 RED 测试基线。
  - 已完成解析器、下载器、SVG 预览转换与 workbook 生成代码，并通过 7 条单测。
  - 已在用户授权下对缺失 `产品描述` 启用最小范围 fallback，并完成真实全量导出。
- Remaining blockers:
  - None.

## Final Verification Result

- PASS: `C:\Users\BJB110\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m unittest discover -s doc/tasks/20260521-int-medical-col14-extract -p "test_*.py"`
- PASS: `C:\Users\BJB110\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe doc/tasks/20260521-int-medical-col14-extract/extract_showrooms.py`
- PASS: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-int-medical-col14-extract --mode preview`

## Fallback Record

- Trigger condition:
  - 产品详情页存在标题与主图，但缺少标题下首段简介文本。
- Applied fallback:
  - `产品描述` 写入 `[FALLBACK] 源站缺少产品描述`
- Current hit count:
  - 1 条：`医疗标准件 / 旋塞阀 / https://int-medical.com/col22/2891`
- Risk:
  - 该条记录的描述为替代值，不代表真实产品说明，后续若用于对外发布或二次导入，需要先补齐源站内容。
- Rollback/remove strategy:
  - 当源站补齐真实简介后，删除 `DEFAULT_TEXT_FALLBACKS["product_description"]` 的使用或保留逻辑但重新导出，以真实描述覆盖该替代值。

## Cleanup Candidates

- `doc/tasks/20260521-int-medical-col14-extract/fixtures/`
- `doc/tasks/20260521-int-medical-col14-extract/__pycache__/`
- `doc/tasks/20260521-int-medical-col14-extract/artifacts/tmp/`

## Cleanup Keep

- `doc/tasks/20260521-int-medical-col14-extract/task.md`
- `doc/tasks/20260521-int-medical-col14-extract/execution-log.md`
- `doc/tasks/20260521-int-medical-col14-extract/extract_showrooms.py`
- `doc/tasks/20260521-int-medical-col14-extract/render_svg_preview.cjs`
- `doc/tasks/20260521-int-medical-col14-extract/test_extract_showrooms.py`
- `doc/tasks/20260521-int-medical-col14-extract/fixtures/`
- `doc/tasks/20260521-int-medical-col14-extract/artifacts/int-medical-col14-showrooms.xlsx`
- `doc/tasks/20260521-int-medical-col14-extract/artifacts/images/`
