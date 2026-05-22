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

const createApiPayload = ({ cardiologyProducts = 36 } = {}) => ({
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
      },
      {
        fieldCode: "core_manufacturing_capability",
        labelZh: "核心制造能力",
        labelEn: "Core Manufacturing Capability",
        valueZh: "Precision extrusion and braiding",
        valueEn: "Precision extrusion and braiding"
      },
      {
        fieldCode: "honors_awards",
        labelZh: "荣誉资质",
        labelEn: "Honors and Awards",
        valueZh: "National high-tech enterprise",
        valueEn: "National high-tech enterprise"
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
      products: Array.from({ length: cardiologyProducts }, (_, index) => createProduct(index + 1))
    },
    {
      hallId: 20,
      hallCode: "NEUROLOGY",
      name: "Neurology Hall CN",
      nameEn: "Neurology Hall",
      description: "Neurology hall description",
      descriptionEn: "Neurology hall description in English",
      previewImageUrl: "https://cdn.example.com/halls/neurology.png",
      products: [createProduct(99)]
    }
  ]
})

const createProductDetailPayload = (productId = 101) => ({
  productCard: {
    id: productId,
    nameCn: `Guidewire System CN ${productId}`,
    nameEn: `Guidewire System ${productId}`,
    previewImageUrl: `https://cdn.example.com/product-${productId}.png`
  },
  publicProductFields: [
    { label: "Target market", value: "Cardiology" },
    { label: "Registration", value: "Cert-A" }
  ]
})

test("gallery arrows switch showrooms and the card region scrolls internally", async ({ page }) => {
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

  const swipeHeader = page.locator("[data-swipe-header]")
  const title = page.locator("[data-active-category-title]")
  const activeIcon = page.locator("[data-active-category-icon]")
  const gallery = page.locator("[data-gallery-scroll-region]")
  const lastCard = page.locator("[data-product-card]").last()

  await expect(swipeHeader).toHaveAttribute("data-active-category-id", "home")
  await expect(title).toBeVisible()
  await expect(gallery).toBeVisible()
  await expect(activeIcon).toHaveCount(0)
  await expect(page.locator("[data-home-hero-image]")).toHaveCount(1)
  await expect(page.locator("[data-product-card]")).toHaveCount(0)
  await expect(page.locator("[data-mode-option]")).toHaveCount(0)
  await expect(page.locator(".kiosk-header [data-language-toggle-button]")).toHaveCount(0)
  await expect(page.locator(".kiosk-voice__header [data-language-toggle-button]")).toHaveCount(1)
  await expect(page.locator("[data-voice-panel-toggle]")).toBeHidden()
  await expect(page.locator("[data-voice-copy]")).toBeVisible()
  await expect(page.locator("[data-voice-preview]")).toBeHidden()

  await page.locator('[data-shift-category="1"]').click()
  await expect(swipeHeader).toHaveAttribute("data-active-category-id", "cardiology")
  await expect(title).toContainText("Cardiology Hall CN")
  await expect(activeIcon).toHaveCount(1)
  await expect(activeIcon).toHaveAttribute("src", /\/kiosk-hall-icons\/cardiology\.svg$/)

  const galleryMetrics = await page.evaluate(() => {
    const galleryNode = document.querySelector("[data-gallery-scroll-region]")

    return {
      clientHeight: galleryNode?.clientHeight ?? 0,
      scrollHeight: galleryNode?.scrollHeight ?? 0
    }
  })

  expect(galleryMetrics.scrollHeight).toBeGreaterThan(galleryMetrics.clientHeight)

  const internalScrollTop = await gallery.evaluate((node) => {
    node.scrollTop = node.scrollHeight
    return node.scrollTop
  })

  expect(internalScrollTop).toBeGreaterThan(0)

  const afterScrollBounds = await page.evaluate(() => {
    const galleryNode = document.querySelector("[data-gallery-scroll-region]")
    const cardNodes = document.querySelectorAll("[data-product-card]")
    const lastCardNode = cardNodes[cardNodes.length - 1]

    return {
      galleryBottom: galleryNode?.getBoundingClientRect().bottom ?? 0,
      lastCardBottom: lastCardNode?.getBoundingClientRect().bottom ?? 0
    }
  })

  expect(afterScrollBounds.lastCardBottom).toBeLessThanOrEqual(afterScrollBounds.galleryBottom)
  await expect.poll(() => page.evaluate(() => document.scrollingElement?.scrollTop ?? 0)).toBe(0)

  await gallery.evaluate((node) => {
    node.scrollTop = 0
  })

  await expect(lastCard).toBeVisible()

  await page.locator('[data-shift-category="-1"]').click()
  await expect(swipeHeader).toHaveAttribute("data-active-category-id", "home")
  await expect(activeIcon).toHaveCount(0)
  await expect(page.locator("[data-home-hero-image]")).toHaveCount(1)
  await expect(page.locator("[data-product-card]")).toHaveCount(0)
})

test("mobile title strip hides swipe guidance and slot progress", async ({ page }) => {
  await page.route("**/showroom/display/website-config", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 0,
        msg: "",
        data: createApiPayload({ cardiologyProducts: 1 })
      })
    })
  })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const swipeHint = page.locator("[data-swipe-hint]")
  const swipeProgress = page.locator("[data-swipe-progress]")

  await expect(swipeHint).toHaveCount(0)
  await expect(swipeProgress).toHaveCount(0)

  await page.locator('[data-shift-category="1"]').click()

  await expect(page.locator("[data-swipe-header]")).toHaveAttribute("data-active-category-id", "cardiology")
  await expect(swipeHint).toHaveCount(0)
  await expect(swipeProgress).toHaveCount(0)
})

test("mobile pointer swipe shows drag feedback, ignores vertical drags, and clears on cancel", async ({ page }) => {
  await page.route("**/showroom/display/website-config", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 0,
        msg: "",
        data: createApiPayload({ cardiologyProducts: 1 })
      })
    })
  })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const swipeHeader = page.locator("[data-swipe-header]")

  await swipeHeader.evaluate((node) => {
    const rect = node.getBoundingClientRect()
    node.dispatchEvent(new PointerEvent("pointerdown", {
      bubbles: true,
      cancelable: true,
      pointerId: 1,
      pointerType: "touch",
      clientX: rect.right - 20,
      clientY: rect.top + rect.height / 2
    }))
    node.dispatchEvent(new PointerEvent("pointermove", {
      bubbles: true,
      cancelable: true,
      pointerId: 1,
      pointerType: "touch",
      clientX: rect.right - 88,
      clientY: rect.top + rect.height / 2 + 4
    }))
  })

  await expect(swipeHeader).toHaveAttribute("data-swipe-dragging", "true")
  await expect(swipeHeader).toHaveAttribute("data-swipe-axis", "x")

  await swipeHeader.evaluate((node) => {
    const rect = node.getBoundingClientRect()
    node.dispatchEvent(new PointerEvent("pointercancel", {
      bubbles: true,
      cancelable: true,
      pointerId: 1,
      pointerType: "touch",
      clientX: rect.right - 88,
      clientY: rect.top + rect.height / 2 + 4
    }))
  })

  await expect(swipeHeader).toHaveAttribute("data-swipe-dragging", "false")
  await expect(swipeHeader).toHaveAttribute("data-swipe-axis", "idle")
  await expect(swipeHeader).toHaveAttribute("data-active-category-id", "home")

  await swipeHeader.evaluate((node) => {
    const rect = node.getBoundingClientRect()
    node.dispatchEvent(new PointerEvent("pointerdown", {
      bubbles: true,
      cancelable: true,
      pointerId: 2,
      pointerType: "touch",
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + 12
    }))
    node.dispatchEvent(new PointerEvent("pointermove", {
      bubbles: true,
      cancelable: true,
      pointerId: 2,
      pointerType: "touch",
      clientX: rect.left + rect.width / 2 + 8,
      clientY: rect.bottom - 12
    }))
    node.dispatchEvent(new PointerEvent("pointerup", {
      bubbles: true,
      cancelable: true,
      pointerId: 2,
      pointerType: "touch",
      clientX: rect.left + rect.width / 2 + 8,
      clientY: rect.bottom - 12
    }))
  })

  await expect(swipeHeader).toHaveAttribute("data-active-category-id", "home")
  await expect(swipeHeader).toHaveAttribute("data-swipe-axis", "idle")
})

test("mobile portrait voice panel starts compact and can expand on demand", async ({ page }) => {
  await page.route("**/showroom/display/website-config", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 0,
        msg: "",
        data: createApiPayload({ cardiologyProducts: 1 })
      })
    })
  })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const voicePanel = page.locator("[data-voice-panel]")
  const voiceToggle = page.locator("[data-voice-panel-toggle]")
  const voicePreview = page.locator("[data-voice-preview]")
  const voiceCopy = page.locator("[data-voice-copy]")

  await expect(voicePanel).toHaveAttribute("data-voice-panel-expanded", "false")
  await expect(voiceToggle).toBeVisible()
  await expect(voiceToggle).toContainText("展开讲解")
  await expect(voicePreview).toBeVisible()
  await expect(voiceCopy).toBeHidden()

  await voiceToggle.click()

  await expect(voicePanel).toHaveAttribute("data-voice-panel-expanded", "true")
  await expect(voiceToggle).toContainText("收起讲解")
  await expect(voicePreview).toBeHidden()
  await expect(voiceCopy).toBeVisible()
})

test("returning from product detail restores the desktop gallery internal scroll position", async ({ page }) => {
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

  await page.locator('[data-shift-category="1"]').click()

  const gallery = page.locator("[data-gallery-scroll-region]")
  const targetCard = page.locator("[data-product-card]").nth(20)
  const beforeScrollTop = await gallery.evaluate((node) => {
    node.scrollTop = 420
    return node.scrollTop
  })

  await targetCard.scrollIntoViewIfNeeded()
  await targetCard.click()
  await expect(page.locator("[data-product-detail-id]")).toBeVisible()

  await page.locator("[data-back-to-gallery]").click()

  await expect(page.locator("[data-product-card]").nth(20)).toBeVisible()
  await expect.poll(() => gallery.evaluate((node) => node.scrollTop)).toBe(beforeScrollTop)
  await expect.poll(() => page.evaluate(() => document.scrollingElement?.scrollTop ?? 0)).toBe(0)
})

test("returning from product detail restores the mobile document scroll position", async ({ page }) => {
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

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  await page.locator('[data-shift-category="1"]').click()

  const targetCard = page.locator("[data-product-card]").nth(20)
  await targetCard.scrollIntoViewIfNeeded()
  const beforeScrollTop = await page.evaluate(() => {
    const scrollingElement = document.scrollingElement
    return scrollingElement?.scrollTop ?? 0
  })

  await targetCard.click()
  await expect(page.locator("[data-product-detail-id]")).toBeVisible()
  await page.evaluate(() => window.scrollTo(0, 0))

  await page.locator("[data-back-to-gallery]").click()

  await expect(page.locator("[data-product-card]").nth(20)).toBeVisible()
  await expect.poll(() => page.evaluate(() => document.scrollingElement?.scrollTop ?? 0)).toBe(beforeScrollTop)
})

test("clicking the home hero opens company detail loaded from IntRuoyi and returns back home", async ({ page }) => {
  await page.route("**/showroom/display/website-config", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 0,
        msg: "",
        data: createApiPayload({ cardiologyProducts: 1 })
      })
    })
  })

  await page.setViewportSize({ width: 1920, height: 911 })
  await page.goto("/")

  await expect(page.locator("[data-home-hero-image]")).toHaveCount(1)

  await page.locator("[data-home-company-entry-card]").click()
  await expect(page.locator("[data-company-detail-panel]")).toBeVisible()
  await expect(page.locator("[data-company-detail-field]")).toHaveCount(5)
  await expect(page.locator("[data-company-detail-title]")).toContainText("Yingtai Medical CN")
  await expect(page.locator("body")).toContainText("Yingtai growth timeline")
  await expect(page.locator("body")).not.toContainText("Honors and Awards")
  await expect(page.locator("body")).not.toContainText("Core Manufacturing Capability")

  await page.locator("[data-company-back]").click()
  await expect(page.locator("[data-home-hero-image]")).toHaveCount(1)
})

test("root company detail keeps five fixed cards in English and leaves empty card values blank", async ({ page }) => {
  await page.route("**/showroom/display/website-config", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 0,
        msg: "",
        data: createApiPayload({ cardiologyProducts: 1 })
      })
    })
  })

  await page.setViewportSize({ width: 1920, height: 911 })
  await page.goto("/")

  await page.locator("[data-language-toggle-button]").click()
  await page.locator("[data-home-company-entry-card]").click()

  await expect(page.locator("[data-company-detail-field]")).toHaveCount(5)
  await expect(page.locator('[data-company-detail-field-index="0"] dt')).toContainText("Development History")
  await expect(page.locator('[data-company-detail-field-index="1"] dt')).toContainText("Park Introduction")
  await expect(page.locator('[data-company-detail-field-index="2"] dt')).toContainText("Incubation Platform")
  await expect(page.locator('[data-company-detail-field-index="2"] dd')).toHaveText("")
  await expect(page.locator("body")).not.toContainText("Honors and Awards")
  await expect(page.locator("body")).not.toContainText("Core Manufacturing Capability")
})
