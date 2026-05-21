import { expect, test } from "@playwright/test"

const createApiPayload = () => ({
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
        label: "\u8363\u8a89\u8d44\u8d28",
        value: "\u56fd\u5bb6\u9ad8\u65b0\u6280\u672f\u4f01\u4e1a"
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

  await page.route("**/showroom/display/app-config", async (route) => {
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
  await expect(page.locator("[data-company-field]")).toHaveCount(2)

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

test("fails fast on /showroom when company.publicFields is missing from the backend contract", async ({ page }) => {
  await page.route("**/showroom/display/app-config", async (route) => {
    const payload = createApiPayload()
    delete payload.company.publicFields

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
  await expect(page.locator("body")).toContainText("company.publicFields is required.")
})
