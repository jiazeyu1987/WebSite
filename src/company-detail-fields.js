const COMPANY_DETAIL_FIELD_CODES = [
  "development_history",
  "park_introduction",
  "incubation_platform",
  "subsidiary_overview",
  "stock_info"
]

const isEnglish = (language) => language === "en"

export const resolveCompanyDetailFields = (company, language) => {
  if (!company || !Array.isArray(company.bilingualPublicFields)) {
    throw new Error("company.bilingualPublicFields is required.")
  }

  const fieldByCode = new Map(
    company.bilingualPublicFields.map((field) => [field?.fieldCode, field])
  )

  return COMPANY_DETAIL_FIELD_CODES.map((fieldCode) => {
    const field = fieldByCode.get(fieldCode)

    if (!field) {
      throw new Error(`company.bilingualPublicFields.${fieldCode} is required.`)
    }

    return {
      fieldCode,
      label: isEnglish(language) ? field.labelEn : field.labelZh,
      value: isEnglish(language) ? field.valueEn : field.valueZh
    }
  })
}

export { COMPANY_DETAIL_FIELD_CODES }
