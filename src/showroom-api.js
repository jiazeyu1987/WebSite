export const SHOWROOM_APP_CONFIG_ENDPOINT = "/showroom/display/app-config"
export const SHOWROOM_COMPANY_DETAIL_ENDPOINT = "/showroom/display/company"
export const SHOWROOM_PRODUCT_DETAIL_ENDPOINT_PREFIX = "/showroom/display/product/"

const requireObject = (value, label) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} is required.`)
  }

  return value
}

const requireArray = (value, label) => {
  if (!Array.isArray(value)) {
    throw new Error(`${label} is required.`)
  }

  return value
}

const requireString = (value, label) => {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${label} is required.`)
  }

  return value.trim()
}

const requirePresentString = (value, label) => {
  if (typeof value !== "string") {
    throw new Error(`${label} is required.`)
  }

  return value.trim()
}

const requirePositiveId = (value, label) => {
  if ((typeof value !== "number" || !Number.isFinite(value) || value <= 0) && (typeof value !== "string" || value.trim() === "")) {
    throw new Error(`${label} is required.`)
  }

  return String(value).trim()
}

const mapPublicField = (field, fieldIndex) => {
  const fieldObject = requireObject(field, `company.publicFields[${fieldIndex}]`)

  return {
    label: requireString(fieldObject.label, `company.publicFields[${fieldIndex}].label`),
    value: requireString(fieldObject.value, `company.publicFields[${fieldIndex}].value`)
  }
}

const mapBilingualPublicField = (field, label) => {
  const fieldObject = requireObject(field, label)

  return {
    fieldCode: requireString(fieldObject.fieldCode, `${label}.fieldCode`),
    labelZh: requireString(fieldObject.labelZh, `${label}.labelZh`),
    labelEn: requireString(fieldObject.labelEn, `${label}.labelEn`),
    valueZh: requirePresentString(fieldObject.valueZh, `${label}.valueZh`),
    valueEn: requirePresentString(fieldObject.valueEn, `${label}.valueEn`)
  }
}

export const mapShowroomAppConfig = (payload) => {
  const data = requireObject(payload, "app-config payload")
  const company = requireObject(data.company, "company")
  const showrooms = Array.isArray(data.showrooms) ? data.showrooms : []

  return {
    company: {
      id: requirePositiveId(company.companyId, "company.companyId"),
      name: requireString(company.name, "company.name"),
      nameEn: requireString(company.nameEn, "company.nameEn"),
      homeImage: requireString(company.homeImageUrl, "company.homeImageUrl"),
      subtitleZh: requireString(company.subtitleZh, "company.subtitleZh"),
      subtitleEn: requireString(company.subtitleEn, "company.subtitleEn"),
      audioZh: requireString(company.audioZhUrl, "company.audioZhUrl"),
      audioEn: requireString(company.audioEnUrl, "company.audioEnUrl"),
      publicFields: requireArray(company.publicFields, "company.publicFields").map(mapPublicField),
      bilingualPublicFields: requireArray(company.bilingualPublicFields, "company.bilingualPublicFields").map((field, fieldIndex) =>
        mapBilingualPublicField(field, `company.bilingualPublicFields[${fieldIndex}]`)
      )
    },
    showrooms: showrooms.map((showroom, showroomIndex) => {
      const showroomObject = requireObject(showroom, `showrooms[${showroomIndex}]`)
      const products = Array.isArray(showroomObject.products) ? showroomObject.products : []

      return {
        id: requirePositiveId(showroomObject.hallId, `showrooms[${showroomIndex}].hallId`),
        code: requireString(showroomObject.hallCode, `showrooms[${showroomIndex}].hallCode`),
        name: requireString(showroomObject.name, `showrooms[${showroomIndex}].name`),
        nameEn: requireString(showroomObject.nameEn, `showrooms[${showroomIndex}].nameEn`),
        description: requirePresentString(showroomObject.description, `showrooms[${showroomIndex}].description`),
        descriptionEn: requirePresentString(showroomObject.descriptionEn, `showrooms[${showroomIndex}].descriptionEn`),
        previewImageUrl: requireString(showroomObject.previewImageUrl, `showrooms[${showroomIndex}].previewImageUrl`),
        products: products.map((product, productIndex) => {
          const productObject = requireObject(product, `showrooms[${showroomIndex}].products[${productIndex}]`)
          return {
            id: requirePositiveId(productObject.productId, `showrooms[${showroomIndex}].products[${productIndex}].productId`),
            code: requireString(productObject.productCode, `showrooms[${showroomIndex}].products[${productIndex}].productCode`),
            nameCn: requireString(productObject.nameCn, `showrooms[${showroomIndex}].products[${productIndex}].nameCn`),
            nameEn: requireString(productObject.nameEn, `showrooms[${showroomIndex}].products[${productIndex}].nameEn`),
            previewImageUrl: requireString(productObject.previewImageUrl, `showrooms[${showroomIndex}].products[${productIndex}].previewImageUrl`),
            subtitleZh: requireString(productObject.subtitleZh, `showrooms[${showroomIndex}].products[${productIndex}].subtitleZh`),
            subtitleEn: requireString(productObject.subtitleEn, `showrooms[${showroomIndex}].products[${productIndex}].subtitleEn`),
            audioZh: requireString(productObject.audioZhUrl, `showrooms[${showroomIndex}].products[${productIndex}].audioZhUrl`),
            audioEn: requireString(productObject.audioEnUrl, `showrooms[${showroomIndex}].products[${productIndex}].audioEnUrl`)
          }
        })
      }
    })
  }
}

export const mapShowroomCompanyDetail = (payload) => {
  const data = requireObject(payload, "company detail payload")

  return {
    name: requireString(data.title, "company.title"),
    nameEn: requireString(data.titleEn, "company.titleEn"),
    subtitleZh: requirePresentString(data.subtitleZh, "company.subtitleZh"),
    subtitleEn: requirePresentString(data.subtitleEn, "company.subtitleEn"),
    homeImage: requireString(data.imageUrl, "company.imageUrl"),
    publicFields: requireArray(data.publicProductFields, "company.publicProductFields").map((field, fieldIndex) => {
      const fieldObject = requireObject(field, `company.publicProductFields[${fieldIndex}]`)

      return {
        label: requireString(fieldObject.label, `company.publicProductFields[${fieldIndex}].label`),
        value: requireString(fieldObject.value, `company.publicProductFields[${fieldIndex}].value`)
      }
    }),
    bilingualPublicFields: requireArray(data.bilingualPublicFields, "company.bilingualPublicFields").map((field, fieldIndex) =>
      mapBilingualPublicField(field, `company.bilingualPublicFields[${fieldIndex}]`)
    )
  }
}

export const mapShowroomProductDetail = (payload) => {
  const data = requireObject(payload, "product detail payload")
  const productCard = requireObject(data.productCard, "product.productCard")

  return {
    id: requirePositiveId(productCard.id, "product.productCard.id"),
    nameCn: requireString(productCard.nameCn, "product.productCard.nameCn"),
    nameEn: requirePresentString(productCard.nameEn, "product.productCard.nameEn"),
    previewImageUrl: requireString(productCard.previewImageUrl, "product.productCard.previewImageUrl"),
    publicFields: requireArray(data.publicProductFields, "product.publicProductFields").map((field, fieldIndex) => {
      const fieldObject = requireObject(field, `product.publicProductFields[${fieldIndex}]`)

      return {
        label: requireString(fieldObject.label, `product.publicProductFields[${fieldIndex}].label`),
        value: requireString(fieldObject.value, `product.publicProductFields[${fieldIndex}].value`)
      }
    }),
    bilingualPublicFields: requireArray(data.bilingualPublicFields, "product.bilingualPublicFields").map((field, fieldIndex) =>
      mapBilingualPublicField(field, `product.bilingualPublicFields[${fieldIndex}]`)
    )
  }
}

export const fetchShowroomAppConfigPayload = async ({
  endpoint = SHOWROOM_APP_CONFIG_ENDPOINT,
  fetchImpl = globalThis.fetch
} = {}) => {
  if (typeof fetchImpl !== "function") {
    throw new Error("SHOWROOM_APP_CONFIG_UNAVAILABLE: fetch implementation is required.")
  }

  const response = await fetchImpl(endpoint, {
    headers: {
      Accept: "application/json"
    }
  })

  if (!response.ok) {
    throw new Error(`SHOWROOM_APP_CONFIG_UNAVAILABLE: request failed with ${response.status}.`)
  }

  const payload = await response.json()

  if (!payload || payload.code !== 0 || !payload.data) {
    const code = payload?.code ?? "unknown"
    const msg =
      typeof payload?.msg === "string" && payload.msg.trim() !== ""
        ? payload.msg.trim()
        : typeof payload?.message === "string" && payload.message.trim() !== ""
          ? payload.message.trim()
          : "unknown error"
    throw new Error(`SHOWROOM_APP_CONFIG_UNAVAILABLE: backend returned code ${code} (${msg}) from ${endpoint}.`)
  }

  return payload.data
}

export const fetchShowroomCompanyDetailPayload = async ({
  endpoint = SHOWROOM_COMPANY_DETAIL_ENDPOINT,
  fetchImpl = globalThis.fetch
} = {}) => {
  if (typeof fetchImpl !== "function") {
    throw new Error("SHOWROOM_COMPANY_DETAIL_UNAVAILABLE: fetch implementation is required.")
  }

  const response = await fetchImpl(endpoint, {
    headers: {
      Accept: "application/json"
    }
  })

  if (!response.ok) {
    throw new Error(`SHOWROOM_COMPANY_DETAIL_UNAVAILABLE: request failed with ${response.status}.`)
  }

  const payload = await response.json()

  if (!payload || payload.code !== 0 || !payload.data) {
    const code = payload?.code ?? "unknown"
    const msg =
      typeof payload?.msg === "string" && payload.msg.trim() !== ""
        ? payload.msg.trim()
        : typeof payload?.message === "string" && payload.message.trim() !== ""
          ? payload.message.trim()
          : "unknown error"
    throw new Error(`SHOWROOM_COMPANY_DETAIL_UNAVAILABLE: backend returned code ${code} (${msg}) from ${endpoint}.`)
  }

  return payload.data
}

export const fetchShowroomProductDetailPayload = async ({
  productId,
  endpoint = `${SHOWROOM_PRODUCT_DETAIL_ENDPOINT_PREFIX}${productId}`,
  fetchImpl = globalThis.fetch
} = {}) => {
  if (!productId) {
    throw new Error("SHOWROOM_PRODUCT_DETAIL_UNAVAILABLE: productId is required.")
  }

  if (typeof fetchImpl !== "function") {
    throw new Error("SHOWROOM_PRODUCT_DETAIL_UNAVAILABLE: fetch implementation is required.")
  }

  const response = await fetchImpl(endpoint, {
    headers: {
      Accept: "application/json"
    }
  })

  if (!response.ok) {
    throw new Error(`SHOWROOM_PRODUCT_DETAIL_UNAVAILABLE: request failed with ${response.status}.`)
  }

  const payload = await response.json()

  if (!payload || payload.code !== 0 || !payload.data) {
    const code = payload?.code ?? "unknown"
    const msg =
      typeof payload?.msg === "string" && payload.msg.trim() !== ""
        ? payload.msg.trim()
        : typeof payload?.message === "string" && payload.message.trim() !== ""
          ? payload.message.trim()
          : "unknown error"
    throw new Error(`SHOWROOM_PRODUCT_DETAIL_UNAVAILABLE: backend returned code ${code} (${msg}) from ${endpoint}.`)
  }

  return payload.data
}

export const fetchShowroomAppConfig = async (options) =>
  mapShowroomAppConfig(await fetchShowroomAppConfigPayload(options))

export const fetchShowroomCompanyDetail = async (options) =>
  mapShowroomCompanyDetail(await fetchShowroomCompanyDetailPayload(options))

export const fetchShowroomProductDetail = async (options) =>
  mapShowroomProductDetail(await fetchShowroomProductDetailPayload(options))
