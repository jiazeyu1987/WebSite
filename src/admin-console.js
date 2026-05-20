import { workbookSchema } from "./config-schema.js"

export const createAdminConsoleMarkup = ({ statusMessage, errorMessage, selectedFileName, config }) => {
  const sheetCards = [
    {
      title: "Company",
      description: "公司主页图片、中文/英文语音、中文/英文字幕",
      fields: workbookSchema.company
    },
    {
      title: "Showrooms",
      description: "展厅编号、展厅名称、展厅图片",
      fields: workbookSchema.showrooms
    },
    {
      title: "Products",
      description: "展厅编号、产品编号、产品名称、产品图片、中文/英文语音、中文/英文字幕",
      fields: workbookSchema.products
    }
  ]

  return `
    <section class="admin-console" data-screen="admin">
      <header class="section-header">
        <div>
          <p class="eyebrow">配置控制台</p>
          <h2>一键导入 / 导出配置表</h2>
          <p class="section-copy">按照工作簿驱动当前前端。导入失败会直接显示验证错误，不会静默降级。</p>
        </div>
        <div class="admin-console__meta">
          <span>${config.showrooms.length} 个展厅</span>
          <span>${config.showrooms.reduce((count, showroom) => count + showroom.products.length, 0)} 个产品</span>
        </div>
      </header>

      <div class="admin-console__toolbar">
        <label class="file-picker">
          <span>选择 .xlsx 配置表</span>
          <input type="file" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" data-config-file-input />
        </label>
        <button class="primary-button" type="button" data-action="import-workbook">一键导入</button>
        <button class="ghost-button" type="button" data-action="export-workbook">一键导出</button>
        <div class="admin-console__file">${selectedFileName ?? "未选择文件"}</div>
      </div>

      <div class="admin-console__status${errorMessage ? " is-error" : statusMessage ? " is-success" : ""}" data-admin-status>
        ${errorMessage || statusMessage || "等待导入或导出操作。"}
      </div>

      <div class="schema-grid" aria-label="workbook-schema">
        ${sheetCards
          .map(
            (sheet) => `
              <article class="schema-card">
                <h3>${sheet.title}</h3>
                <p>${sheet.description}</p>
                <ul>
                  ${sheet.fields.map((field) => `<li>${field}</li>`).join("")}
                </ul>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `
}
