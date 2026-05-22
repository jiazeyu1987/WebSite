export const SHOWROOM_WEBSITE_CONFIG_ENDPOINT =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SHOWROOM_WEBSITE_CONFIG_ENDPOINT) ||
  "/showroom/display/website-config"

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

const mapShowroomCompany = (company, label) => {
  const companyObject = requireObject(company, label)
  return {
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
}

const mapShowroomProduct = (product, label) => {
  const productObject = requireObject(product, label)
  return {
    id: requirePositiveId(productObject.productId, `${label}.productId`),
    code: requireString(productObject.productCode, `${label}.productCode`),
    nameCn: requireString(productObject.nameCn, `${label}.nameCn`),
    nameEn: requireString(productObject.nameEn, `${label}.nameEn`),
    incompleteFlag: typeof productObject.incompleteFlag === "boolean" ? productObject.incompleteFlag : false,
    previewImageUrl: requireString(productObject.previewImageUrl, `${label}.previewImageUrl`),
    subtitleZh: requireString(productObject.subtitleZh, `${label}.subtitleZh`),
    subtitleEn: requireString(productObject.subtitleEn, `${label}.subtitleEn`),
    audioZh: requireString(productObject.audioZhUrl, `${label}.audioZhUrl`),
    audioEn: requireString(productObject.audioEnUrl, `${label}.audioEnUrl`),
    bilingualPublicFields: requireArray(productObject.bilingualPublicFields, `${label}.bilingualPublicFields`).map(
      (field, fieldIndex) => mapBilingualPublicField(field, `${label}.bilingualPublicFields[${fieldIndex}]`)
    )
  }
}

const mapShowroomList = (showrooms, label) =>
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
      products: products.map((product, productIndex) => mapShowroomProduct(product, `${showroomLabel}.products[${productIndex}]`))
    }
  })

export const mapShowroomWebsiteConfig = (payload) => {
  const data = requireObject(payload, "website-config payload")
  const showrooms = Array.isArray(data.showrooms) ? data.showrooms : []

  return {
    company: mapShowroomCompany(data.company, "company"),
    showrooms: mapShowroomList(showrooms, "showrooms")
  }
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

export const fetchShowroomWebsiteConfig = async (options) =>
  mapShowroomWebsiteConfig(await fetchShowroomWebsiteConfigPayload(options))
