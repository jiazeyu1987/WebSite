export const SHOWROOM_APP_CONFIG_ENDPOINT = "/showroom/display/app-config"
export const SHOWROOM_WEBSITE_CONFIG_ENDPOINT = "/showroom/display/website-config"
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

const mapShowroomCompany = (company, label, { includePublicFields = false } = {}) => {
  const companyObject = requireObject(company, label)
  const mappedCompany = {
    id: requirePositiveId(companyObject.companyId, `${label}.companyId`),
    name: requireString(companyObject.name, `${label}.name`),
    nameEn: requireString(companyObject.nameEn, `${label}.nameEn`),
    homeImage: requireString(companyObject.homeImageUrl, `${label}.homeImageUrl`),
    subtitleZh: requireString(companyObject.subtitleZh, `${label}.subtitleZh`),
    subtitleEn: requireString(companyObject.subtitleEn, `${label}.subtitleEn`),
    audioZh: requireString(companyObject.audioZhUrl, `${label}.audioZhUrl`),
    audioEn: requireString(companyObject.audioEnUrl, `${label}.audioEnUrl`),
    bilingualPublicFields: requireArray(companyObject.bilingualPublicFields, `${label}.bilingualPublicFields`).map(
      (field, fieldIndex) => mapBilingualPublicField(field, `${label}.bilingualPublicFields[${fieldIndex}]`)
    )
  }

  if (includePublicFields) {
    mappedCompany.publicFields = requireArray(companyObject.publicFields, `${label}.publicFields`).map(mapPublicField)
  }

  return mappedCompany
}

const mapShowroomProductCard = (product, label, { includeBilingualPublicFields = false } = {}) => {
  const productObject = requireObject(product, label)
  const mappedProduct = {
    id: requirePositiveId(productObject.productId, `${label}.productId`),
    code: requireString(productObject.productCode, `${label}.productCode`),
    nameCn: requireString(productObject.nameCn, `${label}.nameCn`),
    nameEn: requireString(productObject.nameEn, `${label}.nameEn`),
    previewImageUrl: requireString(productObject.previewImageUrl, `${label}.previewImageUrl`),
    subtitleZh: requireString(productObject.subtitleZh, `${label}.subtitleZh`),
    subtitleEn: requireString(productObject.subtitleEn, `${label}.subtitleEn`),
    audioZh: requireString(productObject.audioZhUrl, `${label}.audioZhUrl`),
    audioEn: requireString(productObject.audioEnUrl, `${label}.audioEnUrl`)
  }

  if (includeBilingualPublicFields) {
    mappedProduct.bilingualPublicFields = requireArray(productObject.bilingualPublicFields, `${label}.bilingualPublicFields`).map(
      (field, fieldIndex) => mapBilingualPublicField(field, `${label}.bilingualPublicFields[${fieldIndex}]`)
    )
  }

  return mappedProduct
}

const mapShowroomList = (showrooms, label, { includeProductBilingualPublicFields = false } = {}) =>
  showrooms.map((showroom, showroomIndex) => {
    const showroomLabel = `${label}[${showroomIndex}]`
    const showroomObject = requireObject(showroom, showroomLabel)
    const products = Array.isArray(showroomObject.products) ? showroomObject.products : []

    return {
      id: requirePositiveId(showroomObject.hallId, `${showroomLabel}.hallId`),
      code: requireString(showroomObject.hallCode, `${showroomLabel}.hallCode`),
      name: requireString(showroomObject.name, `${showroomLabel}.name`),
      nameEn: requireString(showroomObject.nameEn, `${showroomLabel}.nameEn`),
      description: requirePresentString(showroomObject.description, `${showroomLabel}.description`),
      descriptionEn: requirePresentString(showroomObject.descriptionEn, `${showroomLabel}.descriptionEn`),
      previewImageUrl: requireString(showroomObject.previewImageUrl, `${showroomLabel}.previewImageUrl`),
      products: products.map((product, productIndex) =>
        mapShowroomProductCard(product, `${showroomLabel}.products[${productIndex}]`, {
          includeBilingualPublicFields: includeProductBilingualPublicFields
        })
      )
    }
  })

export const mapShowroomAppConfig = (payload) => {
  const data = requireObject(payload, "app-config payload")
  const showrooms = Array.isArray(data.showrooms) ? data.showrooms : []

  return {
    company: mapShowroomCompany(data.company, "company", { includePublicFields: true }),
    showrooms: mapShowroomList(showrooms, "showrooms")
  }
}

export const mapShowroomWebsiteConfig = (payload) => {
  const data = requireObject(payload, "website-config payload")
  const showrooms = Array.isArray(data.showrooms) ? data.showrooms : []

  return {
    company: mapShowroomCompany(data.company, "company"),
    showrooms: mapShowroomList(showrooms, "showrooms", {
      includeProductBilingualPublicFields: true
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

export const fetchShowroomWebsiteConfigPayload = async ({
  endpoint = SHOWROOM_WEBSITE_CONFIG_ENDPOINT,
  fetchImpl = globalThis.fetch
} = {}) => {
  if (typeof fetchImpl !== "function") {
    throw new Error("SHOWROOM_WEBSITE_CONFIG_UNAVAILABLE: fetch implementation is required.")
  }

  const response = await fetchImpl(endpoint, {
    headers: {
      Accept: "application/json"
    }
  })

  if (!response.ok) {
    throw new Error(`SHOWROOM_WEBSITE_CONFIG_UNAVAILABLE: request failed with ${response.status}.`)
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
    throw new Error(`SHOWROOM_WEBSITE_CONFIG_UNAVAILABLE: backend returned code ${code} (${msg}) from ${endpoint}.`)
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

export const fetchShowroomWebsiteConfig = async (options) =>
  mapShowroomWebsiteConfig(await fetchShowroomWebsiteConfigPayload(options))

export const fetchShowroomCompanyDetail = async (options) =>
  mapShowroomCompanyDetail(await fetchShowroomCompanyDetailPayload(options))

export const fetchShowroomProductDetail = async (options) =>
  mapShowroomProductDetail(await fetchShowroomProductDetailPayload(options))
