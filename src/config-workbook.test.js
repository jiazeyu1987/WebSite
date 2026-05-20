import { describe, expect, it } from "vitest"
import * as XLSX from "xlsx"
import { defaultAppConfig } from "./demoData.js"
import {
  WORKBOOK_SHEETS,
  createWorkbookBinary,
  parseWorkbookBinary,
  workbookSchema
} from "./config-workbook.js"

describe("config workbook contract", () => {
  it("round-trips the workbook schema without losing company, showroom, or product fields", async () => {
    const binary = createWorkbookBinary(defaultAppConfig)
    const importedConfig = await parseWorkbookBinary(binary)

    expect(importedConfig).toEqual(defaultAppConfig)
    expect(workbookSchema.company).toEqual([
      "company_name",
      "home_image",
      "audio_zh",
      "audio_en",
      "subtitle_zh",
      "subtitle_en"
    ])
    expect(workbookSchema.showrooms).toEqual(["showroom_id", "showroom_name", "showroom_image"])
    expect(workbookSchema.products).toEqual([
      "showroom_id",
      "product_id",
      "product_name",
      "product_image",
      "audio_zh",
      "audio_en",
      "subtitle_zh",
      "subtitle_en"
    ])
  })

  it("fails fast when a product row references an unknown showroom", async () => {
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

    const binary = XLSX.write(workbook, { bookType: "xlsx", type: "array" })

    expect(() => parseWorkbookBinary(binary)).toThrow(
      "Products sheet row 1 references unknown showroom_id `missing-showroom`."
    )
  })
})
