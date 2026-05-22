import { expect, test } from "@playwright/test"

const createWebsiteConfigPayload = () => ({
  company: {
    companyId: 1,
    name: "\u76c8\u6cf0\u533b\u7597",
    nameEn: "Yingtai Medical",
    homeImageUrl: "https://cdn.example.com/company-home.png",
    subtitleZh: "\u516c\u53f8\u4e2d\u6587\u8bb2\u89e3",
    subtitleEn: "English company narration",
    audioZhUrl: "https://cdn.example.com/company-zh.mp3",
    audioEnUrl: "https://cdn.example.com/company-en.mp3",
    publicFields: [
      {
        label: "\u53d1\u5c55\u5386\u7a0b",
        value: "\u76c8\u6cf0\u533b\u7597\u53d1\u5c55\u5386\u7a0b"
      },
      {
        label: "\u56ed\u533a\u4ecb\u7ecd",
        value: "\u4e0a\u6d77\u3001\u5c71\u4e1c\u3001\u73e0\u6d77\u4e09\u5927\u57fa\u5730"
      },
      {
        label: "\u5b75\u5316\u5e73\u53f0",
        value: "\u5e73\u53f0\u5316\u5b75\u5316\u4e0e\u7edd\u5bf9\u63a7\u80a1"
      },
      {
        label: "\u5b50\u516c\u53f8\u6982\u89c8",
        value: "\u8986\u76d6\u4ecb\u5165\u5668\u68b0\u3001\u81ea\u52a8\u5316\u4e0e\u6750\u6599"
      },
      {
        label: "\u4e0a\u5e02\u4fe1\u606f",
        value: "\u5f53\u524d\u6682\u65e0\u6b63\u5f0f\u4e0a\u5e02\u6298\u9732"
      },
      {
        label: "\u6838\u5fc3\u5236\u9020\u80fd\u529b",
        value: "\u7cbe\u5bc6\u6324\u51fa\u4e0e\u7f16\u7ec7"
      },
      {
        label: "\u8363\u8a89\u8d44\u8d28",
        value: "\u56fd\u5bb6\u9ad8\u65b0\u6280\u672f\u4f01\u4e1a"
      }
    ],
    bilingualPublicFields: [
      {
        fieldCode: "development_history",
        labelZh: "\u53d1\u5c55\u5386\u7a0b",
        labelEn: "Development History",
        valueZh: "\u76c8\u6cf0\u533b\u7597\u53d1\u5c55\u5386\u7a0b",
        valueEn: "Yingtai growth history"
      },
      {
        fieldCode: "park_introduction",
        labelZh: "\u56ed\u533a\u4ecb\u7ecd",
        labelEn: "Park Introduction",
        valueZh: "\u4e0a\u6d77\u3001\u5c71\u4e1c\u3001\u73e0\u6d77\u4e09\u5927\u57fa\u5730",
        valueEn: "Three industrial hubs in Shanghai, Shandong, and Zhuhai"
      },
      {
        fieldCode: "incubation_platform",
        labelZh: "\u5b75\u5316\u5e73\u53f0",
        labelEn: "Incubation Platform",
        valueZh: "\u5e73\u53f0\u5316\u5b75\u5316\u4e0e\u7edd\u5bf9\u63a7\u80a1",
        valueEn: ""
      },
      {
        fieldCode: "subsidiary_overview",
        labelZh: "\u5b50\u516c\u53f8\u6982\u89c8",
        labelEn: "Subsidiary Overview",
        valueZh: "\u8986\u76d6\u4ecb\u5165\u5668\u68b0\u3001\u81ea\u52a8\u5316\u4e0e\u6750\u6599",
        valueEn: "Covering intervention devices, automation, and materials"
      },
      {
        fieldCode: "stock_info",
        labelZh: "\u4e0a\u5e02\u4fe1\u606f",
        labelEn: "Listing Information",
        valueZh: "\u5f53\u524d\u6682\u65e0\u6b63\u5f0f\u4e0a\u5e02\u6298\u9732",
        valueEn: "No formal listing disclosure at present"
      },
      {
        fieldCode: "core_manufacturing_capability",
        labelZh: "\u6838\u5fc3\u5236\u9020\u80fd\u529b",
        labelEn: "Core Manufacturing Capability",
        valueZh: "\u7cbe\u5bc6\u6324\u51fa\u4e0e\u7f16\u7ec7",
        valueEn: "Precision extrusion and braiding"
      },
      {
        fieldCode: "honors_awards",
        labelZh: "\u8363\u8a89\u8d44\u8d28",
        labelEn: "Honors and Awards",
        valueZh: "\u56fd\u5bb6\u9ad8\u65b0\u6280\u672f\u4f01\u4e1a",
        valueEn: "National high-tech enterprise"
      }
    ]
  },
  showrooms: []
})

test("keeps the kiosk homepage on root and renders the bilingual showroom company flow on /showroom", async ({ page }) => {
  await page.addInitScript(() => {
    const audioMetrics = {
      createdSrcs: [],
      playCalls: 0,
      pauseCalls: 0
    }

    class MockAudio {
      constructor(src = "") {
        this.src = src
        this.currentTime = 0
        this.listeners = new Map()
        audioMetrics.createdSrcs.push(src)
      }

      addEventListener(eventName, listener) {
        const nextListeners = this.listeners.get(eventName) ?? []
        nextListeners.push(listener)
        this.listeners.set(eventName, nextListeners)
      }

      removeEventListener(eventName, listener) {
        const nextListeners = (this.listeners.get(eventName) ?? []).filter((item) => item !== listener)
        this.listeners.set(eventName, nextListeners)
      }

      dispatch(eventName) {
        ;(this.listeners.get(eventName) ?? []).forEach((listener) => listener())
      }

      play() {
        audioMetrics.playCalls += 1
        this.dispatch("play")
        return Promise.resolve()
      }

      pause() {
        audioMetrics.pauseCalls += 1
        this.dispatch("pause")
      }
    }

    window.__audioMetrics = audioMetrics
    window.Audio = MockAudio
  })

  await page.route("**/showroom/display/website-config", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 0,
        msg: "",
        data: createWebsiteConfigPayload()
      })
    })
  })

  await page.goto("/")
  await expect(page.locator('[data-reference-layout="medical-kiosk"]')).toBeVisible()

  await page.goto("/showroom")
  await expect(page.locator('[data-screen="company-landing"]')).toBeVisible()
  await expect(page.locator("[data-company-entry-card]")).toHaveCount(1)
  await expect(page.locator('[data-language-option="zh"]')).toHaveAttribute("aria-pressed", "true")

  await page.locator('[data-language-option="en"]').click()
  await expect(page.locator('[data-language-option="en"]')).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("body")).toContainText("View company profile")
  await expect(page.locator("[data-company-entry-card]")).toContainText("Yingtai Medical")

  await page.locator("[data-company-entry-card]").click()
  await expect(page.locator('[data-screen="company-detail"]')).toBeVisible()
  await expect(page.locator("[data-company-detail-copy]")).toContainText("English company narration")
  await expect(page.locator("[data-company-back]")).toContainText("Back to home")
  await expect(page.locator("[data-company-field]")).toHaveCount(5)
  await expect(page.locator('[data-company-field-index="0"] [data-company-field-label]')).toContainText("Development History")
  await expect(page.locator('[data-company-field-index="0"] [data-company-field-value]')).toContainText("Yingtai growth history")
  await expect(page.locator('[data-company-field-index="1"] [data-company-field-label]')).toContainText("Park Introduction")
  await expect(page.locator('[data-company-field-index="2"] [data-company-field-label]')).toContainText("Incubation Platform")
  await expect(page.locator('[data-company-field-index="2"] [data-company-field-value]')).toHaveText("")
  await expect(page.locator("body")).not.toContainText("Honors and Awards")
  await expect(page.locator("body")).not.toContainText("Core Manufacturing Capability")

  await page.locator("[data-company-play]").click()
  await expect(page.locator("[data-company-play-state]")).toContainText("Playing English narration")

  const audioMetrics = await page.evaluate(() => window.__audioMetrics)
  expect(audioMetrics.playCalls).toBe(1)
  expect(audioMetrics.createdSrcs).toContain("https://cdn.example.com/company-en.mp3")

  await page.reload()
  await expect(page.locator('[data-screen="company-landing"]')).toBeVisible()
  await expect(page.locator('[data-language-option="en"]')).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("[data-company-entry-card]")).toContainText("Yingtai Medical")
})

test("mobile showroom landing uses wide controls for language switch and company entry", async ({ page }) => {
  await page.route("**/showroom/display/website-config", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 0,
        msg: "",
        data: createWebsiteConfigPayload()
      })
    })
  })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/showroom")

  const geometry = await page.evaluate(() => {
    const toggle = document.querySelector("[data-language-toggle]")
    const card = document.querySelector("[data-company-entry-card]")

    return {
      viewportWidth: window.innerWidth,
      toggleWidth: toggle?.getBoundingClientRect().width ?? 0,
      cardWidth: card?.getBoundingClientRect().width ?? 0
    }
  })

  expect(geometry.toggleWidth).toBeGreaterThanOrEqual(280)
  expect(geometry.cardWidth).toBeGreaterThanOrEqual(280)
})

test("mobile showroom stays in a vertical-scroll-only layout without horizontal overflow", async ({ page }) => {
  await page.route("**/showroom/display/website-config", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 0,
        msg: "",
        data: createWebsiteConfigPayload()
      })
    })
  })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/showroom")

  const metrics = await page.evaluate(() => {
    const showroomRoot = document.querySelector("[data-showroom-app]")
    const scrollingElement = document.scrollingElement
    const styles = showroomRoot ? getComputedStyle(showroomRoot) : null

    return {
      scrollWidth: scrollingElement?.scrollWidth ?? 0,
      clientWidth: scrollingElement?.clientWidth ?? 0,
      overflowX: styles?.overflowX ?? "",
      touchAction: styles?.touchAction ?? ""
    }
  })

  expect(metrics.scrollWidth).toBe(metrics.clientWidth)
  expect(metrics.overflowX).toBe("hidden")
  expect(metrics.touchAction).toBe("pan-y")
})

test("mobile showroom detail keeps image title and play action in the first screen", async ({ page }) => {
  await page.route("**/showroom/display/website-config", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 0,
        msg: "",
        data: createWebsiteConfigPayload()
      })
    })
  })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/showroom")

  await page.locator("[data-company-entry-card]").click()

  const detailImage = page.locator(".showroom-detail__hero-image")
  const detailTitle = page.locator("[data-company-detail-title]")
  const playButton = page.locator("[data-company-mobile-play]")
  const fields = page.locator("[data-company-fields]")

  await expect(detailImage).toBeInViewport()
  await expect(detailTitle).toBeInViewport()
  await expect(playButton).toBeInViewport()

  const layout = await page.evaluate(() => {
    const image = document.querySelector(".showroom-detail__hero-image")
    const title = document.querySelector("[data-company-detail-title]")
    const play = document.querySelector("[data-company-mobile-play]")
    const fields = document.querySelector("[data-company-fields]")

    return {
      imageBottom: image?.getBoundingClientRect().bottom ?? 0,
      titleTop: title?.getBoundingClientRect().top ?? 0,
      playTop: play?.getBoundingClientRect().top ?? 0,
      fieldsTop: fields?.getBoundingClientRect().top ?? 0
    }
  })

  expect(layout.titleTop).toBeGreaterThan(layout.imageBottom)
  expect(layout.playTop).toBeGreaterThanOrEqual(layout.titleTop)
  expect(layout.fieldsTop).toBeGreaterThan(layout.titleTop)
})

test("desktop showroom detail prioritizes the five cards before the narration transcript and keeps the play button visible", async ({ page }) => {
  await page.route("**/showroom/display/website-config", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 0,
        msg: "",
        data: createWebsiteConfigPayload()
      })
    })
  })

  await page.setViewportSize({ width: 1440, height: 960 })
  await page.goto("/showroom")
  await page.locator("[data-company-entry-card]").click()

  const playButton = page.locator("[data-company-play]")
  const fields = page.locator("[data-company-fields]")
  const transcript = page.locator("[data-company-detail-summary]")

  await expect(playButton).toBeVisible()
  await expect(fields).toBeVisible()
  await expect(transcript).toBeVisible()

  const layout = await page.evaluate(() => {
    const fields = document.querySelector("[data-company-fields]")
    const transcript = document.querySelector("[data-company-detail-summary]")
    return {
      fieldsBottom: fields?.getBoundingClientRect().bottom ?? 0,
      transcriptTop: transcript?.getBoundingClientRect().top ?? 0
    }
  })

  expect(layout.transcriptTop).toBeGreaterThan(layout.fieldsBottom)
})

test("mobile showroom detail keeps the action bar visible while scrolling fields", async ({ page }) => {
  await page.route("**/showroom/display/website-config", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 0,
        msg: "",
        data: createWebsiteConfigPayload()
      })
    })
  })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/showroom")

  await page.locator("[data-company-entry-card]").click()

  const actionBar = page.locator("[data-company-mobile-action-bar]")

  await expect(actionBar).toBeVisible()
  await page.evaluate(() => window.scrollTo(0, document.scrollingElement.scrollHeight))
  await expect(actionBar).toBeInViewport()
  await expect(actionBar).toContainText("返回首页")
  await expect(actionBar).toContainText("播放讲解")
})

test("mobile showroom detail keeps the action bar in the lower thumb zone", async ({ page }) => {
  await page.route("**/showroom/display/website-config", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 0,
        msg: "",
        data: createWebsiteConfigPayload()
      })
    })
  })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/showroom")

  await page.locator("[data-company-entry-card]").click()

  const actionBar = page.locator("[data-company-mobile-action-bar]")

  await page.evaluate(() => window.scrollTo(0, document.scrollingElement.scrollHeight))
  await expect(actionBar).toBeInViewport()

  const metrics = await actionBar.evaluate((node) => {
    const rect = node.getBoundingClientRect()
    return {
      top: rect.top,
      bottom: rect.bottom,
      viewportHeight: window.innerHeight
    }
  })

  const bottomOffset = metrics.viewportHeight - metrics.bottom

  expect(metrics.top).toBeGreaterThan(metrics.viewportHeight / 2)
  expect(bottomOffset).toBeGreaterThanOrEqual(8)
  expect(bottomOffset).toBeLessThanOrEqual(80)
})

test("mobile showroom detail presents public fields as separated cards", async ({ page }) => {
  await page.route("**/showroom/display/website-config", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 0,
        msg: "",
        data: createWebsiteConfigPayload()
      })
    })
  })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/showroom")

  await page.locator("[data-company-entry-card]").click()

  const firstField = page.locator('[data-company-field-index="0"]')
  const secondField = page.locator('[data-company-field-index="1"]')

  await expect(firstField.locator("[data-company-field-label]")).toContainText("发展历程")
  await expect(firstField.locator("[data-company-field-value]")).toContainText("盈泰医疗发展历程")

  const fieldLayout = await page.evaluate(() => {
    const first = document.querySelector('[data-company-field-index="0"]')
    const second = document.querySelector('[data-company-field-index="1"]')
    const firstLabel = first?.querySelector("[data-company-field-label]")
    const firstValue = first?.querySelector("[data-company-field-value]")
    const styles = first ? getComputedStyle(first) : null

    return {
      firstBottom: first?.getBoundingClientRect().bottom ?? 0,
      secondTop: second?.getBoundingClientRect().top ?? 0,
      labelBottom: firstLabel?.getBoundingClientRect().bottom ?? 0,
      valueTop: firstValue?.getBoundingClientRect().top ?? 0,
      borderRadius: styles?.borderRadius ?? "",
      backgroundColor: styles?.backgroundColor ?? ""
    }
  })

  expect(fieldLayout.secondTop).toBeGreaterThan(fieldLayout.firstBottom)
  expect(fieldLayout.valueTop).toBeGreaterThan(fieldLayout.labelBottom)
  expect(fieldLayout.borderRadius).not.toBe("0px")
  expect(fieldLayout.backgroundColor).not.toBe("rgba(0, 0, 0, 0)")
})

test("fails fast on /showroom when company.bilingualPublicFields is missing from the backend contract", async ({ page }) => {
  await page.route("**/showroom/display/website-config", async (route) => {
    const payload = createWebsiteConfigPayload()
    delete payload.company.bilingualPublicFields

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 0,
        msg: "",
        data: payload
      })
    })
  })

  await page.goto("/showroom")
  await expect(page.locator('[data-screen="showroom-error"]')).toBeVisible()
  await expect(page.locator("body")).toContainText("company.bilingualPublicFields is required.")
})

test("fails fast on /showroom when one fixed company detail field entry is missing", async ({ page }) => {
  await page.route("**/showroom/display/website-config", async (route) => {
    const payload = createWebsiteConfigPayload()
    payload.company.bilingualPublicFields = payload.company.bilingualPublicFields.filter((field) => field.fieldCode !== "stock_info")

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        code: 0,
        msg: "",
        data: payload
      })
    })
  })

  await page.goto("/showroom")
  await page.locator("[data-company-entry-card]").click()
  await expect(page.locator('[data-screen="showroom-error"]')).toBeVisible()
  await expect(page.locator("body")).toContainText("company.bilingualPublicFields.stock_info is required.")
})
