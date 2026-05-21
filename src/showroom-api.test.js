import { describe, expect, it } from "vitest"
import { mapShowroomAppConfig, mapShowroomCompanyDetail, mapShowroomProductDetail } from "./showroom-api.js"

const createAppConfigPayload = () => ({
  company: {
    companyId: 1,
    name: "Yingtai Medical CN",
    nameEn: "Yingtai Medical",
    homeImageUrl: "https://cdn.example.com/company-home.png",
    subtitleZh: "Company narration in Chinese",
    subtitleEn: "English company narration",
    audioZhUrl: "https://cdn.example.com/company-zh.mp3",
    audioEnUrl: "https://cdn.example.com/company-en.mp3",
    publicFields: [
      { label: "Milestones", value: "Yingtai growth timeline" },
      { label: "Awards", value: "National high-tech enterprise" }
    ]
  },
  showrooms: [
    {
      hallId: 10,
      hallCode: "CARDIOLOGY",
      name: "Cardiology Hall CN",
      nameEn: "Cardiology Hall",
      description: "Chinese hall description",
      descriptionEn: "English hall description",
      previewImageUrl: "https://cdn.example.com/hall-cardiology.png",
      products: [
        {
          productId: 101,
          productCode: "P-101",
          nameCn: "Guidewire System CN",
          nameEn: "Guidewire System",
          previewImageUrl: "https://cdn.example.com/product-101.png",
          subtitleZh: "Chinese product narration",
          subtitleEn: "English product narration",
          audioZhUrl: "https://cdn.example.com/product-101-zh.mp3",
          audioEnUrl: "https://cdn.example.com/product-101-en.mp3"
        }
      ]
    }
  ]
})

describe("mapShowroomAppConfig", () => {
  it("maps the company and showroom app-config contract", () => {
    const mapped = mapShowroomAppConfig(createAppConfigPayload())

    expect(mapped.company.id).toBe("1")
    expect(mapped.company.name).toBe("Yingtai Medical CN")
    expect(mapped.company.nameEn).toBe("Yingtai Medical")
    expect(mapped.company.homeImage).toBe("https://cdn.example.com/company-home.png")
    expect(mapped.company.audioZh).toBe("https://cdn.example.com/company-zh.mp3")
    expect(mapped.company.publicFields).toEqual([
      { label: "Milestones", value: "Yingtai growth timeline" },
      { label: "Awards", value: "National high-tech enterprise" }
    ])
    expect(mapped.showrooms).toHaveLength(1)
    expect(mapped.showrooms[0].id).toBe("10")
    expect(mapped.showrooms[0].nameEn).toBe("Cardiology Hall")
    expect(mapped.showrooms[0].products[0].nameEn).toBe("Guidewire System")
  })

  it("fails fast when company.publicFields is missing", () => {
    const payload = createAppConfigPayload()
    delete payload.company.publicFields

    expect(() => mapShowroomAppConfig(payload)).toThrow("company.publicFields is required.")
  })
})

describe("mapShowroomCompanyDetail", () => {
  it("maps the anonymous company detail payload", () => {
    const mapped = mapShowroomCompanyDetail({
      title: "Yingtai Medical CN",
      titleEn: "Yingtai Medical",
      subtitleZh: "Company narration in Chinese",
      subtitleEn: "English company narration",
      imageUrl: "https://cdn.example.com/company-home.png",
      publicProductFields: [
        { label: "Milestones", value: "Yingtai growth timeline" },
        { label: "Awards", value: "National high-tech enterprise" }
      ]
    })

    expect(mapped.name).toBe("Yingtai Medical CN")
    expect(mapped.nameEn).toBe("Yingtai Medical")
    expect(mapped.subtitleZh).toBe("Company narration in Chinese")
    expect(mapped.subtitleEn).toBe("English company narration")
    expect(mapped.homeImage).toBe("https://cdn.example.com/company-home.png")
    expect(mapped.publicFields).toHaveLength(2)
  })

  it("fails fast when company image is missing", () => {
    expect(() =>
      mapShowroomCompanyDetail({
        title: "Yingtai Medical CN",
        titleEn: "Yingtai Medical",
        subtitleZh: "Company narration in Chinese",
        subtitleEn: "English company narration",
        publicProductFields: []
      })
    ).toThrow("company.imageUrl is required.")
  })
})

describe("mapShowroomProductDetail", () => {
  it("maps the product detail payload", () => {
    const mapped = mapShowroomProductDetail({
      productCard: {
        id: 101,
        nameCn: "Guidewire System CN",
        nameEn: "Guidewire System",
        previewImageUrl: "https://cdn.example.com/product-101.png"
      },
      publicProductFields: [
        { label: "Target market", value: "Cardiology" },
        { label: "Registration", value: "Cert-A" }
      ]
    })

    expect(mapped.id).toBe("101")
    expect(mapped.nameCn).toBe("Guidewire System CN")
    expect(mapped.nameEn).toBe("Guidewire System")
    expect(mapped.previewImageUrl).toBe("https://cdn.example.com/product-101.png")
    expect(mapped.publicFields).toEqual([
      { label: "Target market", value: "Cardiology" },
      { label: "Registration", value: "Cert-A" }
    ])
  })

  it("fails fast when product preview image is missing", () => {
    expect(() =>
      mapShowroomProductDetail({
        productCard: {
          id: 101,
          nameCn: "Guidewire System CN",
          nameEn: "Guidewire System"
        },
        publicProductFields: []
      })
    ).toThrow("product.productCard.previewImageUrl is required.")
  })
})
