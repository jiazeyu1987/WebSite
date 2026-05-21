import { expect, test } from "@playwright/test"

test("opens a kiosk product detail page, uses one voice-header toggle button, and returns to the gallery", async ({ page }) => {
  await page.addInitScript(() => {
    const metrics = {
      cancelCalled: 0,
      speakCalled: 0,
      lastText: ""
    }

    class MockSpeechSynthesisUtterance {
      constructor(text) {
        this.text = text
        this.lang = ""
        this.rate = 1
        this.pitch = 1
        this.onend = null
        this.onerror = null
      }
    }

    const speechSynthesis = {
      cancel() {
        metrics.cancelCalled += 1
      },
      speak(utterance) {
        metrics.speakCalled += 1
        metrics.lastText = utterance.text
      }
    }

    window.__speechMetrics = metrics
    window.__MEDICAL_KIOSK_SPEECH_RUNTIME__ = {
      speechSynthesis,
      SpeechSynthesisUtterance: MockSpeechSynthesisUtterance
    }
  })

  await page.setViewportSize({ width: 1920, height: 911 })
  await page.goto("/")

  await expect(page.locator('[data-reference-layout="medical-kiosk"]')).toBeVisible()
  await expect(page.locator("[data-company-logo-card]")).toHaveCount(1)

  await page.locator('[data-shift-category="1"]').click()
  await expect(page.locator("[data-active-category-title]")).toContainText("心内介入展厅")

  const galleryVoiceParagraphs = await page.locator("[data-voice-copy] p").allInnerTexts()

  await page.locator("[data-product-card]").first().click()

  const voiceHeader = page.locator(".kiosk-voice__header")
  const audioToggle = page.locator("[data-speech-mute-toggle]")

  await expect(page.locator("[data-product-detail-id]")).toBeVisible()
  await expect(page.locator("[data-back-to-gallery]")).toContainText("返回展厅")
  await expect(page.locator("[data-product-description-title]")).toContainText("产品描述")
  await expect(page.locator("[data-speaking-state]")).toContainText("语音讲解")
  await expect(page.locator("[data-product-tag]")).toHaveCount(3)
  await expect(page.locator(".kiosk-voice")).toBeVisible()
  await expect(page.locator("[data-voice-copy] p")).toHaveText(galleryVoiceParagraphs)
  await expect(audioToggle).toBeVisible()
  await expect(audioToggle).toHaveAttribute("data-audio-state", "unmuted")
  await expect(audioToggle).toHaveAttribute("aria-label", "静音")
  await expect(voiceHeader.locator("[data-speech-mute-toggle]")).toHaveCount(1)
  await expect(page.locator("[data-speech-mute]")).toHaveCount(0)
  await expect(page.locator("[data-speech-unmute]")).toHaveCount(0)
  await expect(page.locator("[data-muted-state]")).toHaveCount(0)

  expect(await audioToggle.evaluate((element) => getComputedStyle(element).color)).toBe("rgb(40, 179, 106)")

  await audioToggle.click()
  await expect(audioToggle).toHaveAttribute("data-audio-state", "muted")
  await expect(audioToggle).toHaveAttribute("aria-label", "开声")
  await expect(page.locator("[data-speaking-state]")).toContainText("已静音，点击播放语音讲解")
  expect(await audioToggle.evaluate((element) => getComputedStyle(element).color)).toBe("rgb(215, 77, 83)")

  await page.locator("[data-speech-toggle]").click()
  await expect(page.locator("[data-speaking-state]")).toContainText("已静音，仅显示文字")
  await expect(page.locator("[data-speech-toggle]")).toContainText("停止讲解")
  await expect(page.locator("[data-voice-copy] p")).toHaveText(galleryVoiceParagraphs)

  const mutedMetrics = await page.evaluate(() => window.__speechMetrics)
  expect(mutedMetrics.speakCalled).toBe(0)

  await audioToggle.click()
  await expect(audioToggle).toHaveAttribute("data-audio-state", "unmuted")
  await expect(audioToggle).toHaveAttribute("aria-label", "静音")
  await expect(page.locator("[data-speaking-state]")).toContainText("正在播放语音讲解")
  expect(await audioToggle.evaluate((element) => getComputedStyle(element).color)).toBe("rgb(40, 179, 106)")

  const unmutedMetrics = await page.evaluate(() => window.__speechMetrics)
  expect(unmutedMetrics.speakCalled).toBe(1)
  expect(unmutedMetrics.lastText).toContain(await page.locator("[data-product-detail-title]").innerText())

  await page.screenshot({
    path: "output/playwright/kiosk-detail-reference-alignment.png",
    fullPage: true
  })

  await page.locator("[data-back-to-gallery]").click()
  await expect(page.locator("[data-product-detail-id]")).toHaveCount(0)
  await expect(page.locator("[data-voice-copy] p")).toHaveText(galleryVoiceParagraphs)
  await expect(page.locator("[data-product-card]")).toHaveCount(36)
})
