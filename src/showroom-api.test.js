import { describe, expect, it, vi } from "vitest"
import {
  SHOWROOM_WEBSITE_CONFIG_ENDPOINT,
  fetchShowroomWebsiteConfig,
  mapShowroomAppConfig,
  mapShowroomWebsiteConfig
} from "./showroom-api.js"

const createWebsiteConfigPayload = () => ({
  company: {
    companyId: 1,
    name: "Yingtai Medical CN",
    nameEn: "Yingtai Medical",
    homeImageUrl: "https://cdn.example.com/company-home.png",
    subtitleZh: "Company narration in Chinese",
    subtitleEn: "English company narration",
    audioZhUrl: "https://cdn.example.com/company-zh.mp3",
    audioEnUrl: "https://cdn.example.com/company-en.mp3",
    bilingualPublicFields: [
      {
        fieldCode: "development_history",
        labelZh: "发展历程",
        labelEn: "Development History",
        valueZh: "Yingtai growth timeline",
        valueEn: "Yingtai growth history"
      },
      {
        fieldCode: "honors_awards",
        labelZh: "荣誉资质",
        labelEn: "Honors and Awards",
        valueZh: "National high-tech enterprise",
        valueEn: ""
      }
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
          audioEnUrl: "https://cdn.example.com/product-101-en.mp3",
          bilingualPublicFields: [
            {
              fieldCode: "target_market",
              labelZh: "目标市场",
              labelEn: "Target Market",
              valueZh: "心内",
              valueEn: "Cardiology"
            },
            {
              fieldCode: "core_selling_points",
              labelZh: "核心卖点",
              labelEn: "Core Selling Points",
              valueZh: "更顺滑的通过性",
              valueEn: ""
            }
          ]
        }
      ]
    },
    {
      hallId: 20,
      hallCode: "SURGERY",
      name: "Surgery Hall CN",
      nameEn: "Surgery Hall",
      description: "Second hall description",
      descriptionEn: "Second hall English description",
      previewImageUrl: "https://cdn.example.com/hall-surgery.png",
      products: [
        {
          productId: 202,
          productCode: "P-202",
          nameCn: "Stent System CN",
          nameEn: "Stent System",
          previewImageUrl: "https://cdn.example.com/product-202.png",
          subtitleZh: "Second product Chinese narration",
          subtitleEn: "Second product English narration",
          audioZhUrl: "https://cdn.example.com/product-202-zh.mp3",
          audioEnUrl: "https://cdn.example.com/product-202-en.mp3",
          bilingualPublicFields: [
            {
              fieldCode: "pipeline_layout",
              labelZh: "管线布局",
              labelEn: "Pipeline Layout",
              valueZh: "国内三甲",
              valueEn: "Tier-3 hospitals"
            }
          ]
        }
      ]
    }
  ]
})

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
    ],
    bilingualPublicFields: [
      {
        fieldCode: "development_history",
        labelZh: "发展历程",
        labelEn: "Development History",
        valueZh: "Yingtai growth timeline",
        valueEn: "Yingtai growth history"
      }
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

describe("mapShowroomWebsiteConfig", () => {
  it("maps company, showroom order, product cards, detail fields, and bilingual audio from one aggregate payload", () => {
    const mapped = mapShowroomWebsiteConfig(createWebsiteConfigPayload())

    expect(mapped.company).toEqual({
      id: "1",
      name: "Yingtai Medical CN",
      nameEn: "Yingtai Medical",
      homeImage: "https://cdn.example.com/company-home.png",
      subtitleZh: "Company narration in Chinese",
      subtitleEn: "English company narration",
      audioZh: "https://cdn.example.com/company-zh.mp3",
      audioEn: "https://cdn.example.com/company-en.mp3",
      bilingualPublicFields: [
        {
          fieldCode: "development_history",
          labelZh: "发展历程",
          labelEn: "Development History",
          valueZh: "Yingtai growth timeline",
          valueEn: "Yingtai growth history"
        },
        {
          fieldCode: "honors_awards",
          labelZh: "荣誉资质",
          labelEn: "Honors and Awards",
          valueZh: "National high-tech enterprise",
          valueEn: ""
        }
      ]
    })
    expect(mapped.showrooms.map((showroom) => showroom.id)).toEqual(["10", "20"])
    expect(mapped.showrooms[0].products[0]).toEqual({
      id: "101",
      code: "P-101",
      nameCn: "Guidewire System CN",
      nameEn: "Guidewire System",
      previewImageUrl: "https://cdn.example.com/product-101.png",
      subtitleZh: "Chinese product narration",
      subtitleEn: "English product narration",
      audioZh: "https://cdn.example.com/product-101-zh.mp3",
      audioEn: "https://cdn.example.com/product-101-en.mp3",
      bilingualPublicFields: [
        {
          fieldCode: "target_market",
          labelZh: "目标市场",
          labelEn: "Target Market",
          valueZh: "心内",
          valueEn: "Cardiology"
        },
        {
          fieldCode: "core_selling_points",
          labelZh: "核心卖点",
          labelEn: "Core Selling Points",
          valueZh: "更顺滑的通过性",
          valueEn: ""
        }
      ]
    })
    expect(mapped.showrooms[1].products[0].bilingualPublicFields[0].valueEn).toBe("Tier-3 hospitals")
  })

  it("fails fast when company bilingual detail fields are missing", () => {
    const payload = createWebsiteConfigPayload()
    delete payload.company.bilingualPublicFields

    expect(() => mapShowroomWebsiteConfig(payload)).toThrow("company.bilingualPublicFields is required.")
  })

  it("fails fast when a product detail body is missing from the aggregate payload", () => {
    const payload = createWebsiteConfigPayload()
    delete payload.showrooms[0].products[0].bilingualPublicFields

    expect(() => mapShowroomWebsiteConfig(payload)).toThrow(
      "showrooms[0].products[0].bilingualPublicFields is required."
    )
  })
})

describe("fetchShowroomWebsiteConfig", () => {
  it("loads and maps the single aggregate payload from the dedicated endpoint", async () => {
    const payload = createWebsiteConfigPayload()
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        code: 0,
        data: payload
      })
    })

    const mapped = await fetchShowroomWebsiteConfig({ fetchImpl })

    expect(fetchImpl).toHaveBeenCalledWith(SHOWROOM_WEBSITE_CONFIG_ENDPOINT, {
      headers: {
        Accept: "application/json"
      }
    })
    expect(mapped.showrooms[0].products[0].bilingualPublicFields[0].fieldCode).toBe("target_market")
  })
})

describe("mapShowroomAppConfig", () => {
  it("keeps the current app-config mapper behavior intact before runtime cutover", () => {
    const mapped = mapShowroomAppConfig(createAppConfigPayload())

    expect(mapped.company.id).toBe("1")
    expect(mapped.company.publicFields).toEqual([
      { label: "Milestones", value: "Yingtai growth timeline" },
      { label: "Awards", value: "National high-tech enterprise" }
    ])
    expect(mapped.showrooms[0].products[0].nameEn).toBe("Guidewire System")
  })
})
