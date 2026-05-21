import { expect, test } from "@playwright/test"

test("opens a kiosk product detail page, keeps the hall voice panel, supports mute controls, and returns to the gallery", async ({ page }) => {
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

    window.__speechMetrics = metrics
    window.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance
    window.speechSynthesis = {
      cancel() {
        metrics.cancelCalled += 1
      },
      speak(utterance) {
        metrics.speakCalled += 1
        metrics.lastText = utterance.text
      }
    }
  })

  await page.setViewportSize({ width: 1920, height: 911 })
  await page.goto("/")

  await expect(page.locator('[data-reference-layout="medical-kiosk"]')).toBeVisible()
  const galleryVoiceParagraphs = await page.locator("[data-voice-copy] p").allInnerTexts()

  await page.locator("[data-product-card]").first().click()

  await expect(page.locator("[data-product-detail-id]")).toBeVisible()
  await expect(page.locator("[data-back-to-gallery]")).toContainText("返回展厅")
  await expect(page.locator("[data-product-hero-art]")).toBeVisible()
  await expect(page.locator("[data-product-description-panel]")).toBeVisible()
  await expect(page.locator("[data-product-description-title]")).toContainText("产品描述")
  await expect(page.locator("[data-speaking-state]")).toContainText("语音讲解")
  await expect(page.locator(".kiosk-voice")).toBeVisible()
  await expect(page.locator("[data-voice-copy] p")).toHaveText(galleryVoiceParagraphs)
  await expect(page.locator("[data-product-tag]")).toHaveCount(3)
  await expect(page.locator("[data-speech-toggle]")).toBeVisible()
  await expect(page.locator("[data-speech-mute]")).toBeVisible()
  await expect(page.locator("[data-speech-unmute]")).toBeVisible()
  await expect(page.locator("[data-muted-state]")).toContainText("已开声")
  await expect(page.locator("[data-product-spec-item]")).toHaveCount(0)
  await expect(page.locator("[data-product-specs-panel]")).toHaveCount(0)

  await page.locator("[data-speech-mute]").click()
  await expect(page.locator("[data-muted-state]")).toContainText("已静音")
  await expect(page.locator("[data-speaking-state]")).toContainText("已静音，点击播放语音讲解")
  await expect(page.locator("[data-voice-copy] p")).toHaveText(galleryVoiceParagraphs)

  await page.locator("[data-speech-toggle]").click()
  await expect(page.locator("[data-speaking-state]")).toContainText("已静音，仅显示文字")
  await expect(page.locator("[data-speech-toggle]")).toContainText("停止讲解")
  await expect(page.locator("[data-product-description-panel]")).toContainText(
    await page.locator("[data-product-detail-title]").innerText()
  )
  await expect(page.locator("[data-voice-copy] p")).toHaveText(galleryVoiceParagraphs)

  const mutedMetrics = await page.evaluate(() => window.__speechMetrics)
  expect(mutedMetrics.speakCalled).toBe(0)

  await page.locator("[data-speech-unmute]").click()
  await expect(page.locator("[data-muted-state]")).toContainText("已开声")
  await expect(page.locator("[data-speaking-state]")).toContainText("正在播放语音讲解")
  await expect(page.locator("[data-voice-copy] p")).toHaveText(galleryVoiceParagraphs)

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
