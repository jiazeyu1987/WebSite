export const WORKBOOK_SHEETS = Object.freeze({
  company: "Company",
  showrooms: "Showrooms",
  products: "Products"
})

export const workbookSchema = Object.freeze({
  company: Object.freeze([
    "company_name",
    "home_image",
    "audio_zh",
    "audio_en",
    "subtitle_zh",
    "subtitle_en"
  ]),
  showrooms: Object.freeze(["showroom_id", "showroom_name", "showroom_image"]),
  products: Object.freeze([
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

const runtimeCompanyFields = Object.freeze([
  "name",
  "homeImage",
  "audioZh",
  "audioEn",
  "subtitleZh",
  "subtitleEn"
])

const requiredString = (value, label) => {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${label} is required.`)
  }

  return value.trim()
}

const cloneTextFields = (source, fields, context) =>
  fields.reduce((result, field) => {
    result[field] = requiredString(source?.[field], `${context}.${field}`)
    return result
  }, {})

export const validateRuntimeConfig = (config) => {
  if (!config || typeof config !== "object") {
    throw new Error("Runtime config is required.")
  }

  const company = cloneTextFields(config.company, runtimeCompanyFields, "company")

  const showrooms = Array.isArray(config.showrooms) ? config.showrooms : []

  if (showrooms.length === 0) {
    throw new Error("At least one showroom is required.")
  }

  const showroomIds = new Set()
  const productIds = new Set()

  const normalizedShowrooms = showrooms.map((showroom, showroomIndex) => {
    const context = `showrooms[${showroomIndex}]`
    const id = requiredString(showroom?.id, `${context}.id`)
    const name = requiredString(showroom?.name, `${context}.name`)
    const image = requiredString(showroom?.image, `${context}.image`)

    if (showroomIds.has(id)) {
      throw new Error(`Duplicate showroom id \`${id}\` found.`)
    }

    showroomIds.add(id)

    const products = Array.isArray(showroom?.products) ? showroom.products : []
    if (products.length === 0) {
      throw new Error(`Showroom \`${id}\` must include at least one product.`)
    }

    const normalizedProducts = products.map((product, productIndex) => {
      const productContext = `${context}.products[${productIndex}]`
      const productId = requiredString(product?.id, `${productContext}.id`)

      if (productIds.has(productId)) {
        throw new Error(`Duplicate product id \`${productId}\` found.`)
      }

      productIds.add(productId)

      return {
        id: productId,
        name: requiredString(product?.name, `${productContext}.name`),
        image: requiredString(product?.image, `${productContext}.image`),
        audioZh: requiredString(product?.audioZh, `${productContext}.audioZh`),
        audioEn: requiredString(product?.audioEn, `${productContext}.audioEn`),
        subtitleZh: requiredString(product?.subtitleZh, `${productContext}.subtitleZh`),
        subtitleEn: requiredString(product?.subtitleEn, `${productContext}.subtitleEn`)
      }
    })

    return {
      id,
      name,
      image,
      products: normalizedProducts
    }
  })

  return {
    company,
    showrooms: normalizedShowrooms
  }
}
