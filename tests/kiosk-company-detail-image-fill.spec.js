import { expect, test } from "@playwright/test"

const createProduct = (index) => ({
  productId: 100 + index,
  productCode: `P-${100 + index}`,
  incompleteFlag: false,
  nameCn: `Guidewire System CN ${index}`,
  nameEn: `Guidewire System ${index}`,
  previewImageUrl: `https://cdn.example.com/products/guidewire-${index}.png`,
  subtitleZh: `Chinese product narration ${index}`,
  subtitleEn: `English product narration ${index}`,
  audioZhUrl: `https://cdn.example.com/products/guidewire-${index}-zh.mp3`,
  audioEnUrl: `https://cdn.example.com/products/guidewire-${index}-en.mp3`,
  bilingualPublicFields: [
    {
      fieldCode: "target_market",
      labelZh: "目标市场",
      labelEn: "Target Market",
      valueZh: `市场 ${index}`,
      valueEn: `Market ${index}`
    }
  ]
})

const createApiPayload = () => ({
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
        fieldCode: "park_introduction",
        labelZh: "园区介绍",
        labelEn: "Park Introduction",
        valueZh: "Three industrial hubs",
        valueEn: "Three industrial hubs"
      },
      {
        fieldCode: "incubation_platform",
        labelZh: "孵化平台",
        labelEn: "Incubation Platform",
        valueZh: "Platform incubation model",
        valueEn: ""
      },
      {
        fieldCode: "subsidiary_overview",
        labelZh: "子公司概览",
        labelEn: "Subsidiary Overview",
        valueZh: "Intervention, automation, materials",
        valueEn: "Intervention, automation, and materials"
      },
      {
        fieldCode: "stock_info",
        labelZh: "上市信息",
        labelEn: "Listing Information",
        valueZh: "No formal listing disclosure",
        valueEn: "No formal listing disclosure"
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
      previewImageUrl: "https://cdn.example.com/halls/cardiology.png",
      products: [createProduct(1)]
    }
  ]
})

test("company detail media image fills the desktop hero card", async ({ page }) => {
  await page.route("**/showroom/display/website-config", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 0,
        msg: "",
        data: createApiPayload()
      })
    })
  })

  await page.setViewportSize({ width: 1920, height: 911 })
  await page.goto("/")

  await page.locator("[data-home-company-entry-card]").click()
  await expect(page.locator("[data-company-detail-media-card]")).toBeVisible()

  const layout = await page.evaluate(() => {
    const media = document.querySelector("[data-company-detail-media-card]")
    const imageWrap = document.querySelector(".kiosk-company-detail__image-wrap")
    const image = document.querySelector(".kiosk-company-detail__image")

    return {
      mediaWidth: media?.getBoundingClientRect().width ?? 0,
      wrapWidth: imageWrap?.getBoundingClientRect().width ?? 0,
      wrapHeight: imageWrap?.getBoundingClientRect().height ?? 0,
      imageWidth: image?.getBoundingClientRect().width ?? 0,
      imageHeight: image?.getBoundingClientRect().height ?? 0
    }
  })

  expect(layout.wrapWidth / layout.mediaWidth).toBeGreaterThan(0.9)
  expect(layout.imageWidth / layout.wrapWidth).toBeGreaterThan(0.95)
  expect(layout.imageHeight).toBeGreaterThanOrEqual(layout.wrapHeight - 8)
})
