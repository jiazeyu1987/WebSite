import { expect, test } from "@playwright/test"

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
    publicFields: [
      { label: "Milestones", value: "Yingtai growth timeline" }
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
          incompleteFlag: false,
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
              valueZh: "更顺滑",
              valueEn: "Smoother delivery"
            }
          ]
        }
      ]
    }
  ]
})

test("opens a kiosk product detail page in English, keeps one voice-header toggle button, and persists the language choice", async ({ page }) => {
  await page.addInitScript(() => {
    const audioMetrics = {
      createdSrcs: [],
      playCalls: 0,
      pauseCalls: 0,
      mutedStates: []
    }

    class MockAudio {
      constructor(src = "") {
        this.src = src
        this.currentTime = 0
        this.muted = false
        audioMetrics.createdSrcs.push(src)
      }

      play() {
        audioMetrics.playCalls += 1
        audioMetrics.mutedStates.push(this.muted)
        return Promise.resolve()
      }

      pause() {
        audioMetrics.pauseCalls += 1
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

  await page.setViewportSize({ width: 1920, height: 911 })
  await page.goto("/")

  await expect(page.locator('[data-reference-layout="medical-kiosk"]')).toBeVisible()
  await expect(page.locator("[data-home-hero-image]")).toHaveCount(1)

  await expect(page.locator(".kiosk-header [data-language-toggle-button]")).toHaveCount(0)
  await page.locator("[data-language-toggle-button]").click()
  await expect(page.locator("[data-language-toggle-button]")).toHaveAttribute("data-language-current", "en")
  await expect(page.locator("[data-active-category-title]")).toContainText("Home")

  await page.locator('[data-shift-category="1"]').click()
  await expect(page.locator("[data-active-category-title]")).toContainText("Cardiology Hall")
  await expect(page.locator("[data-voice-copy]")).toContainText("English hall description")
  await expect(page.locator("[data-product-card]").first()).toHaveAttribute("aria-label", "Guidewire System")

  await page.locator("[data-product-card]").first().click()

  const voiceHeader = page.locator(".kiosk-voice__header")
  const audioToggle = page.locator("[data-speech-mute-toggle]")

  await expect(page.locator("[data-product-detail-id]")).toBeVisible()
  await expect(page.locator("[data-back-to-gallery]")).toContainText("Back to hall")
  await expect(page.locator("[data-product-description-title]")).toContainText("Product Details")
  await expect(page.locator("[data-speaking-state]")).toContainText("Press to play narration")
  await expect(page.locator("[data-product-tag]")).toHaveCount(2)
  await expect(page.locator("[data-product-description-panel]")).toContainText("Target Market")
  await expect(page.locator("[data-product-description-panel]")).toContainText("Cardiology")
  await expect(page.locator("[data-product-description-panel]")).toContainText("Core Selling Points")
  await expect(page.locator("[data-product-description-panel]")).toContainText("Smoother delivery")
  await expect(page.locator(".kiosk-voice")).toBeVisible()
  await expect(audioToggle).toBeVisible()
  await expect(audioToggle).toHaveAttribute("data-audio-state", "unmuted")
  await expect(audioToggle).toHaveAttribute("aria-label", "Mute audio")
  await expect(voiceHeader.locator("[data-speech-mute-toggle]")).toHaveCount(1)
  await expect(voiceHeader.locator("[data-language-toggle-button]")).toHaveCount(1)
  await expect(page.locator("[data-speech-toggle]")).toHaveClass(/runtime-playback-button/)
  await expect(page.locator("[data-speech-toggle]")).toHaveAttribute("aria-label", "Play narration")
  await expect(page.locator("[data-speech-toggle]")).toHaveAttribute("title", "Play narration")
  await expect(page.locator("[data-speech-toggle]")).toHaveText("")
  await expect(page.locator("[data-speech-toggle] [data-playback-icon]")).toHaveAttribute("data-icon-state", "play")

  await page.locator("[data-speech-toggle]").click()
  await expect(page.locator("[data-speaking-state]")).toContainText("Playing narration")
  await expect(page.locator("[data-speech-toggle]")).toHaveAttribute("aria-label", "Pause narration")
  await expect(page.locator("[data-speech-toggle]")).toHaveAttribute("title", "Pause narration")
  await expect(page.locator("[data-speech-toggle]")).toHaveText("")
  await expect(page.locator("[data-speech-toggle] [data-playback-icon]")).toHaveAttribute("data-icon-state", "pause")

  const playedMetrics = await page.evaluate(() => window.__audioMetrics)
  expect(playedMetrics.playCalls).toBe(1)
  expect(playedMetrics.createdSrcs).toContain("https://cdn.example.com/product-101-en.mp3")

  await audioToggle.click()
  await expect(audioToggle).toHaveAttribute("data-audio-state", "muted")
  await expect(audioToggle).toHaveAttribute("aria-label", "Unmute audio")

  await page.reload()
  await expect(page.locator("[data-language-toggle-button]")).toHaveAttribute("data-language-current", "en")
  await expect(page.locator("[data-active-category-title]")).toContainText("Home")
})
