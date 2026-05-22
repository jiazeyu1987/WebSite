import { describe, expect, it, vi } from "vitest"
import {
  SHOWROOM_WEBSITE_CONFIG_ENDPOINT,
  fetchShowroomWebsiteConfig,
  mapShowroomWebsiteConfig
} from "./showroom-api.js"

const createWebsiteConfigPayload = () => ({
  company: {
    companyId: 1,
    name: "瑛泰",
    nameEn: "int-medical",
    homeImageUrl: "/admin-api/infra/file/28/get/showroom/preview/temp/20260519/02-screen-default-entry.png",
    subtitleZh: "公司中文讲解",
    subtitleEn: "English company narration",
    audioZhUrl: "/admin-api/infra/file/28/get/showroom/narration/20260522/company-1-zh-ruoxi.wav",
    audioEnUrl: "/admin-api/infra/file/28/get/showroom/narration/20260521/company-1-en-ruoxi.wav",
    bilingualPublicFields: [
      {
        fieldCode: "development_history",
        labelZh: "发展历程",
        labelEn: "Development History",
        valueZh: "瑛泰医疗发展历程",
        valueEn: ""
      },
      {
        fieldCode: "park_introduction",
        labelZh: "园区介绍",
        labelEn: "Park Introduction",
        valueZh: "集团现有上海嘉定总部、山东日照基地、珠海产业基地三大产业基地。",
        valueEn: ""
      }
    ]
  },
  showrooms: [
    {
      hallId: 1,
      hallCode: "hall_01",
      name: "心内介植入展厅",
      nameEn: "Cardiac Intervention Implant Hall",
      description: "",
      descriptionEn: "",
      previewImageUrl: "/admin-api/infra/file/28/get/showroom/preview/temp/20260519/02-screen-default-entry.png",
      products: [
        {
          productId: 240,
          productCode: "E2E-PUBLISH-1779348878460",
          nameCn: "发布入口真实验证38",
          nameEn: "Publish Entry Verification 38",
          incompleteFlag: false,
          previewImageUrl: "/admin-api/infra/file/28/get/showroom/preview/temp/20260519/02-screen-default-entry.png",
          subtitleZh: "发布入口讲解稿 1779348878460",
          subtitleEn: "Presentation script for the launch entrance 1779348878460",
          audioZhUrl: "/admin-api/infra/file/28/get/showroom/narration/20260521/product-240-zh-xiaoyun.wav",
          audioEnUrl: "/admin-api/infra/file/28/get/showroom/narration/20260521/product-240-en-xiaoyun.wav",
          bilingualPublicFields: [
            {
              fieldCode: "name",
              labelZh: "产品名称",
              labelEn: "Product Name",
              valueZh: "发布入口真实验证38",
              valueEn: "Publish Entry Verification 38"
            },
            {
              fieldCode: "owner_company_id",
              labelZh: "所属公司",
              labelEn: "Owner Company",
              valueZh: "瑛泰",
              valueEn: "int-medical"
            }
          ]
        }
      ]
    },
    {
      hallId: 2,
      hallCode: "hall_02",
      name: "心脏植入展厅",
      nameEn: "Cardiac Implant Hall",
      description: "",
      descriptionEn: "",
      previewImageUrl: "/admin-api/infra/file/28/get/showroom/preview/temp/20260519/02-screen-default-entry.png",
      products: [
        {
          productId: 241,
          productCode: "E2E-PUBLISH-1779349002816",
          nameCn: "发布入口真实验证42",
          nameEn: "Publish Entry Verification 42",
          incompleteFlag: true,
          previewImageUrl: "/admin-api/infra/file/28/get/showroom/preview/temp/20260519/02-screen-default-entry.png",
          subtitleZh: "发布入口讲解稿 1779349002816",
          subtitleEn: "Presentation script for the launch entrance 1779349002816",
          audioZhUrl: "/admin-api/infra/file/28/get/showroom/narration/20260521/product-241-zh-xiaoyun.wav",
          audioEnUrl: "/admin-api/infra/file/28/get/showroom/narration/20260521/product-241-en-xiaoyun.wav",
          bilingualPublicFields: [
            {
              fieldCode: "lifecycle_stage",
              labelZh: "生命周期",
              labelEn: "Lifecycle Stage",
              valueZh: "已注册",
              valueEn: "Registered"
            }
          ]
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
      name: "瑛泰",
      nameEn: "int-medical",
      homeImage: "/admin-api/infra/file/28/get/showroom/preview/temp/20260519/02-screen-default-entry.png",
      subtitleZh: "公司中文讲解",
      subtitleEn: "English company narration",
      audioZh: "/admin-api/infra/file/28/get/showroom/narration/20260522/company-1-zh-ruoxi.wav",
      audioEn: "/admin-api/infra/file/28/get/showroom/narration/20260521/company-1-en-ruoxi.wav",
      bilingualPublicFields: [
        {
          fieldCode: "development_history",
          labelZh: "发展历程",
          labelEn: "Development History",
          valueZh: "瑛泰医疗发展历程",
          valueEn: ""
        },
        {
          fieldCode: "park_introduction",
          labelZh: "园区介绍",
          labelEn: "Park Introduction",
          valueZh: "集团现有上海嘉定总部、山东日照基地、珠海产业基地三大产业基地。",
          valueEn: ""
        }
      ]
    })
    expect(mapped.showrooms.map((showroom) => showroom.id)).toEqual(["1", "2"])
    expect(mapped.showrooms[0].products[0]).toEqual({
      id: "240",
      code: "E2E-PUBLISH-1779348878460",
      nameCn: "发布入口真实验证38",
      nameEn: "Publish Entry Verification 38",
      incompleteFlag: false,
      previewImageUrl: "/admin-api/infra/file/28/get/showroom/preview/temp/20260519/02-screen-default-entry.png",
      subtitleZh: "发布入口讲解稿 1779348878460",
      subtitleEn: "Presentation script for the launch entrance 1779348878460",
      audioZh: "/admin-api/infra/file/28/get/showroom/narration/20260521/product-240-zh-xiaoyun.wav",
      audioEn: "/admin-api/infra/file/28/get/showroom/narration/20260521/product-240-en-xiaoyun.wav",
      bilingualPublicFields: [
        {
          fieldCode: "name",
          labelZh: "产品名称",
          labelEn: "Product Name",
          valueZh: "发布入口真实验证38",
          valueEn: "Publish Entry Verification 38"
        },
        {
          fieldCode: "owner_company_id",
          labelZh: "所属公司",
          labelEn: "Owner Company",
          valueZh: "瑛泰",
          valueEn: "int-medical"
        }
      ]
    })
    expect(mapped.showrooms[0].code).toBe("hall_01")
    expect(mapped.showrooms[0].description).toBe("")
    expect(mapped.showrooms[1].products[0].bilingualPublicFields[0].valueEn).toBe("Registered")
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
