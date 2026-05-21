BDD: showroom navigation parses all seven halls -> Given the saved `col14` listing HTML / When the extractor parses the showroom navigation block / Then it must return exactly seven halls with hall names, column URLs, and both hall icon URLs.

BDD: html paged halls return product cards with hall mapping -> Given a saved HTML list page for a non-AJAX hall / When the extractor parses the product grid / Then it must return each product detail URL, product title, and list-cover URL mapped to the current hall.

BDD: medical standard parts hall uses ajax paging and subtype mapping -> Given a saved `col22` AJAX payload / When the extractor parses the response / Then it must return products with subtype names and honor pagination metadata.

BDD: detail pages expose a primary description and optional features -> Given a saved product detail HTML page / When the extractor parses the detail content / Then it must return the product title, first description paragraph, first hero image URL, and newline-joined product features when present.

BDD: workbook output embeds preview images while preserving paths -> Given parsed hall and product rows plus downloaded local images / When the workbook is generated / Then the workbook must contain `展厅` and `产品` sheets, embed preview images, and preserve the source/path columns.

BDD: missing product descriptions use the approved default string -> Given a product detail page that has title and image but lacks the title-under-description paragraph / When the extractor parses the detail content after the user explicitly approved fallback / Then it must write the approved default description string instead of fail-fast blocking the export.

RED: `C:\Users\BJB110\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m unittest discover -s doc/tasks/20260521-int-medical-col14-extract -p "test_*.py"` -> FAIL, `extract_showrooms` 模块尚未实现，测试在导入阶段以 `ModuleNotFoundError: No module named 'extract_showrooms'` 失败。

GREEN: `C:\Users\BJB110\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m unittest discover -s doc/tasks/20260521-int-medical-col14-extract -p "test_*.py"` -> PASS

RED: `C:\Users\BJB110\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe doc/tasks/20260521-int-medical-col14-extract/extract_showrooms.py` -> FAIL, 真实站点抓取在 `医疗标准件 -> 旋塞阀 -> https://int-medical.com/col22/2891` 处 fail-fast 中断；该详情页缺少标题下首段简介，即缺少必填 `primary description` 字段，无法在不引入 fallback 的前提下继续生成完整 Excel。

GREEN: `python C:\Users\BJB110\.codex\skills\task-closeout-cleanup\scripts\task_closeout.py --task-id 20260521-int-medical-col14-extract --mode preview` -> PASS

RED: `C:\Users\BJB110\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m unittest discover -s doc/tasks/20260521-int-medical-col14-extract -p "test_*.py"` -> FAIL, 新增“缺少详情描述时使用默认字符串”测试后，解析器仍然对缺少 `primary description` 的详情页报错。

GREEN: `C:\Users\BJB110\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m unittest discover -s doc/tasks/20260521-int-medical-col14-extract -p "test_*.py"` -> PASS

GREEN: `C:\Users\BJB110\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe doc/tasks/20260521-int-medical-col14-extract/extract_showrooms.py` -> PASS, 已生成 `artifacts/int-medical-col14-showrooms.xlsx`，共 7 个展厅、176 条产品记录。

INFO: 本次经用户授权，仅对缺失文本字段中的 `产品描述` 开启最小范围 fallback；当前仅命中 1 条记录：`医疗标准件 / 旋塞阀 / https://int-medical.com/col22/2891`，导出值为 `[FALLBACK] 源站缺少产品描述`。
