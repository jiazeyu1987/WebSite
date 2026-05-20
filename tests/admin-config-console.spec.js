import path from "node:path"
import { mkdir } from "node:fs/promises"
import { expect, test } from "@playwright/test"
import * as XLSX from "xlsx"
import { createWorkbookBinary, WORKBOOK_SHEETS } from "../src/config-workbook.js"
import { defaultAppConfig } from "../src/demoData.js"

const outputDir = path.resolve("output/playwright")
const workbookMimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

const createImportedConfig = () => {
  const config = structuredClone(defaultAppConfig)

  config.company.name = "北辰医疗科技（导入版）"
  config.company.subtitleZh = "导入后的主页中文讲解"
  config.company.subtitleEn = "Imported company subtitle from workbook"
  config.showrooms[0].name = "导入后的心血管展厅"
  config.showrooms[0].products[0].name = "导入后的导丝系统"
  config.showrooms[0].products[0].subtitleZh = "导入后的产品中文讲解"
  config.showrooms[0].products[0].subtitleEn = "Imported product subtitle"

  return config
}

const createInvalidWorkbook = () => {
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet([
      {
        company_name: "北辰医疗科技",
        home_image: "https://example.com/company-home.png",
        audio_zh: "https://example.com/company-zh.mp3",
        audio_en: "https://example.com/company-en.mp3",
        subtitle_zh: "中文主页字幕",
        subtitle_en: "English company subtitle"
      }
    ]),
    WORKBOOK_SHEETS.company
  )

  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet([
      {
        showroom_id: "showroom-a",
        showroom_name: "展厅 A",
        showroom_image: "https://example.com/showroom-a.png"
      }
    ]),
    WORKBOOK_SHEETS.showrooms
  )

  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet([
      {
        showroom_id: "missing-showroom",
        product_id: "product-a",
        product_name: "产品 A",
        product_image: "https://example.com/product-a.png",
        audio_zh: "https://example.com/product-a-zh.mp3",
        audio_en: "https://example.com/product-a-en.mp3",
        subtitle_zh: "中文产品字幕",
        subtitle_en: "English product subtitle"
      }
    ]),
    WORKBOOK_SHEETS.products
  )

  return Buffer.from(XLSX.write(workbook, { bookType: "xlsx", type: "array" }))
}

test.beforeAll(async () => {
  await mkdir(outputDir, { recursive: true })
})

test("imports workbook data and renders company and showroom content", async ({ page }) => {
  const importedConfig = createImportedConfig()
  const workbookBuffer = Buffer.from(createWorkbookBinary(importedConfig))

  await page.goto("/")
  await expect(page.locator('[data-screen="company-home"]')).toBeVisible()

  await page.locator('[data-view-id="admin"]').click()
  await page.locator("[data-config-file-input]").setInputFiles({
    name: "showroom-config.xlsx",
    mimeType: workbookMimeType,
    buffer: workbookBuffer
  })
  await page.locator('[data-action="import-workbook"]').click()

  await expect(page.locator('[data-screen="company-home"]')).toBeVisible()
  await expect(page.locator("body")).toContainText(importedConfig.company.name)
  await expect(page.locator("body")).toContainText(importedConfig.company.subtitleZh)

  await page.locator(`[data-view-showroom-id="${importedConfig.showrooms[0].id}"]`).click()
  await expect(page.locator('[data-screen="showroom"]')).toBeVisible()
  await expect(page.locator('[data-product-detail]')).toContainText(importedConfig.showrooms[0].products[0].name)
  await expect(page.locator('[data-product-detail]')).toContainText(importedConfig.showrooms[0].products[0].subtitleZh)

  await page.screenshot({
    path: path.join(outputDir, "config-driven-showroom.png"),
    fullPage: true
  })
})

test("shows validation error for invalid import and exports the current workbook", async ({ page }) => {
  await page.goto("/")
  await page.locator('[data-view-id="admin"]').click()
  await page.locator("[data-config-file-input]").setInputFiles({
    name: "broken-config.xlsx",
    mimeType: workbookMimeType,
    buffer: createInvalidWorkbook()
  })
  await page.locator('[data-action="import-workbook"]').click()

  await expect(page.locator("[data-admin-status]")).toContainText(
    "Products sheet row 1 references unknown showroom_id `missing-showroom`."
  )

  const downloadPromise = page.waitForEvent("download")
  await page.locator('[data-action="export-workbook"]').click()
  const download = await downloadPromise

  expect(download.suggestedFilename()).toBe("showroom-config.xlsx")
  await download.saveAs(path.join(outputDir, "showroom-config.xlsx"))

  await page.screenshot({
    path: path.join(outputDir, "admin-console-error.png"),
    fullPage: true
  })
})
