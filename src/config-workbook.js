import * as XLSX from "xlsx"
import { WORKBOOK_SHEETS, workbookSchema, validateRuntimeConfig } from "./config-schema.js"

const MIME_XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

const toUint8Array = (input) => {
  if (input instanceof Uint8Array) {
    return input
  }

  if (input instanceof ArrayBuffer) {
    return new Uint8Array(input)
  }

  if (ArrayBuffer.isView(input)) {
    return new Uint8Array(input.buffer.slice(input.byteOffset, input.byteOffset + input.byteLength))
  }

  throw new Error("Workbook input must be an ArrayBuffer or Uint8Array.")
}

const readSheetRows = (workbook, sheetName) => {
  const sheet = workbook.Sheets[sheetName]

  if (!sheet) {
    throw new Error(`Missing required workbook sheet \`${sheetName}\`.`)
  }

  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" })

  if (rows.length === 0) {
    throw new Error(`Workbook sheet \`${sheetName}\` must contain at least one row.`)
  }

  return rows
}

const readRequiredCell = (row, field, context) => {
  const value = row?.[field]

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${context}.${field} is required.`)
  }

  return value.trim()
}

export const createWorkbookBinary = (config) => {
  const normalized = validateRuntimeConfig(config)
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet([
      {
        company_name: normalized.company.name,
        home_image: normalized.company.homeImage,
        audio_zh: normalized.company.audioZh,
        audio_en: normalized.company.audioEn,
        subtitle_zh: normalized.company.subtitleZh,
        subtitle_en: normalized.company.subtitleEn
      }
    ]),
    WORKBOOK_SHEETS.company
  )

  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(
      normalized.showrooms.map((showroom) => ({
        showroom_id: showroom.id,
        showroom_name: showroom.name,
        showroom_image: showroom.image
      }))
    ),
    WORKBOOK_SHEETS.showrooms
  )

  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(
      normalized.showrooms.flatMap((showroom) =>
        showroom.products.map((product) => ({
          showroom_id: showroom.id,
          product_id: product.id,
          product_name: product.name,
          product_image: product.image,
          audio_zh: product.audioZh,
          audio_en: product.audioEn,
          subtitle_zh: product.subtitleZh,
          subtitle_en: product.subtitleEn
        }))
      )
    ),
    WORKBOOK_SHEETS.products
  )

  return XLSX.write(workbook, { bookType: "xlsx", type: "array" })
}

export const parseWorkbookBinary = (input) => {
  const workbook = XLSX.read(toUint8Array(input), { type: "array" })

  const companyRows = readSheetRows(workbook, WORKBOOK_SHEETS.company)
  if (companyRows.length !== 1) {
    throw new Error(`Workbook sheet \`${WORKBOOK_SHEETS.company}\` must contain exactly one row.`)
  }

  const companyRow = companyRows[0]
  const company = {
    name: readRequiredCell(companyRow, "company_name", WORKBOOK_SHEETS.company),
    homeImage: readRequiredCell(companyRow, "home_image", WORKBOOK_SHEETS.company),
    audioZh: readRequiredCell(companyRow, "audio_zh", WORKBOOK_SHEETS.company),
    audioEn: readRequiredCell(companyRow, "audio_en", WORKBOOK_SHEETS.company),
    subtitleZh: readRequiredCell(companyRow, "subtitle_zh", WORKBOOK_SHEETS.company),
    subtitleEn: readRequiredCell(companyRow, "subtitle_en", WORKBOOK_SHEETS.company)
  }

  const showroomRows = readSheetRows(workbook, WORKBOOK_SHEETS.showrooms)
  const productRows = readSheetRows(workbook, WORKBOOK_SHEETS.products)

  const showrooms = showroomRows.map((row, showroomIndex) => {
    const context = `${WORKBOOK_SHEETS.showrooms} row ${showroomIndex + 1}`
    return {
      id: readRequiredCell(row, "showroom_id", context),
      name: readRequiredCell(row, "showroom_name", context),
      image: readRequiredCell(row, "showroom_image", context),
      products: []
    }
  })

  const showroomMap = new Map(showrooms.map((showroom) => [showroom.id, showroom]))
  const productIds = new Set()

  productRows.forEach((row, productIndex) => {
    const context = `${WORKBOOK_SHEETS.products} row ${productIndex + 1}`
    const showroomId = readRequiredCell(row, "showroom_id", context)
    const productId = readRequiredCell(row, "product_id", context)

    if (productIds.has(productId)) {
      throw new Error(`Duplicate product id \`${productId}\` found.`)
    }

    const showroom = showroomMap.get(showroomId)

    if (!showroom) {
      throw new Error(`Products sheet row ${productIndex + 1} references unknown showroom_id \`${showroomId}\`.`)
    }

    showroom.products.push({
      id: productId,
      name: readRequiredCell(row, "product_name", context),
      image: readRequiredCell(row, "product_image", context),
      audioZh: readRequiredCell(row, "audio_zh", context),
      audioEn: readRequiredCell(row, "audio_en", context),
      subtitleZh: readRequiredCell(row, "subtitle_zh", context),
      subtitleEn: readRequiredCell(row, "subtitle_en", context)
    })

    productIds.add(productId)
  })

  showrooms.forEach((showroom) => {
    if (showroom.products.length === 0) {
      throw new Error(`Showroom \`${showroom.id}\` must include at least one product.`)
    }
  })

  return validateRuntimeConfig({ company, showrooms })
}

export const workbookMimeType = MIME_XLSX
export { WORKBOOK_SHEETS, workbookSchema }
