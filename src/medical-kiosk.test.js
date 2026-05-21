// @vitest-environment jsdom

import { describe, expect, it } from "vitest"
import { createMedicalKioskApp, kioskCategories } from "./medical-kiosk.js"

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

const openFirstProductDetail = (root) => {
  root.querySelector("[data-product-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
}

const createSpeechRuntime = () => {
  let spokenUtterance = null

  const speechSynthesis = {
    cancelCalled: 0,
    speakCalled: 0,
    cancel() {
      this.cancelCalled += 1
    },
    speak(utterance) {
      this.speakCalled += 1
      spokenUtterance = utterance
    }
  }

  return {
    speechSynthesis,
    SpeechSynthesisUtterance: MockSpeechSynthesisUtterance,
    getSpokenUtterance: () => spokenUtterance
  }
}

const mountApp = (options = {}) => {
  document.body.innerHTML = '<div id="app"></div>'
  const root = document.getElementById("app")

  createMedicalKioskApp(root, options)

  return root
}

describe("createMedicalKioskApp", () => {
  it("renders a single active hall title and switches categories by swipe", () => {
    const root = mountApp()

    expect(root.querySelector('[data-reference-layout="medical-kiosk"]')).not.toBeNull()
    expect(root.querySelectorAll("[data-tab-id]")).toHaveLength(0)
    expect(root.querySelectorAll("[data-active-category-title]")).toHaveLength(1)
    expect(root.querySelector("[data-active-category-title]")?.textContent).toContain(kioskCategories[0].title)
    expect(root.querySelectorAll("[data-product-card]")).toHaveLength(kioskCategories[0].products.length)

    const swipeHeader = root.querySelector("[data-swipe-header]")

    swipeHeader?.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, clientX: 220, clientY: 24 }))
    swipeHeader?.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, clientX: 40, clientY: 24 }))

    expect(root.querySelector("[data-active-category-id]")?.getAttribute("data-active-category-id")).toBe("cardiology")
    expect(root.querySelector("[data-active-category-title]")?.textContent).toContain(kioskCategories[1].title)
    expect(root.querySelectorAll("[data-product-card]")).toHaveLength(kioskCategories[1].products.length)
  })

  it("switches categories by arrow controls and renders a dedicated gallery scroll region", () => {
    const root = mountApp()

    expect(root.querySelector("[data-gallery-scroll-region]")).not.toBeNull()

    root.querySelector('[data-shift-category="1"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector("[data-active-category-id]")?.getAttribute("data-active-category-id")).toBe("cardiology")
    expect(root.querySelector("[data-active-category-title]")?.textContent).toContain(kioskCategories[1].title)

    root.querySelector('[data-shift-category="-1"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector("[data-active-category-id]")?.getAttribute("data-active-category-id")).toBe("home")
    expect(root.querySelector("[data-active-category-title]")?.textContent).toContain(kioskCategories[0].title)
  })

  it("opens a product detail page and returns to the gallery", () => {
    const root = mountApp()

    openFirstProductDetail(root)

    expect(root.querySelector("[data-product-detail-id]")).not.toBeNull()
    expect(root.querySelector("[data-product-detail-title]")?.textContent).toContain("导入鞘套组")
    expect(root.querySelector("[data-product-specs-panel]")).toBeNull()
    expect(root.querySelectorAll("[data-product-spec-item]")).toHaveLength(0)

    root.querySelector("[data-back-to-gallery]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector("[data-product-detail-id]")).toBeNull()
    expect(root.querySelectorAll("[data-product-card]")).toHaveLength(kioskCategories[0].products.length)
  })

  it("renders the detail composition without the bottom spec-card section", () => {
    const root = mountApp()

    openFirstProductDetail(root)

    expect(root.querySelector("[data-back-to-gallery]")?.textContent).toContain("返回展厅")
    expect(root.querySelector("[data-speaking-state]")?.textContent).toContain("语音讲解")
    expect(root.querySelector("[data-product-detail-title]")?.textContent).toContain("导入鞘套组")
    expect(root.querySelector("[data-product-hero-art]")).not.toBeNull()
    expect(root.querySelector("[data-product-description-panel]")).not.toBeNull()
    expect(root.querySelector("[data-product-description-title]")?.textContent).toContain("产品描述")
    expect(root.querySelectorAll("[data-product-description-line]")).toHaveLength(3)
    expect(root.querySelectorAll("[data-product-tag]")).toHaveLength(3)
    expect(root.querySelector("[data-speech-toggle]")).not.toBeNull()
    expect(root.querySelector("[data-speech-mute]")).not.toBeNull()
    expect(root.querySelector("[data-speech-unmute]")).not.toBeNull()
    expect(root.querySelector("[data-muted-state]")?.textContent).toContain("已开声")
    expect(root.querySelector("[data-product-specs-panel]")).toBeNull()
    expect(root.querySelectorAll("[data-product-spec-item]")).toHaveLength(0)
  })

  it("plays and stops narration through the detail-page speech action", () => {
    const speechRuntime = createSpeechRuntime()
    const root = mountApp(speechRuntime)

    openFirstProductDetail(root)
    root.querySelector("[data-speech-toggle]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(speechRuntime.speechSynthesis.speakCalled).toBe(1)
    expect(root.querySelector("[data-speaking-state]")?.textContent).toContain("正在播放语音讲解")
    expect(root.querySelector("[data-speech-toggle]")?.textContent).toContain("停止讲解")
    expect(speechRuntime.getSpokenUtterance()?.text).toContain("导入鞘套组")

    speechRuntime.getSpokenUtterance()?.onend?.()

    expect(root.querySelector("[data-speaking-state]")?.textContent).toContain("点击播放语音讲解")
    expect(root.querySelector("[data-speech-toggle]")?.textContent).toContain("播放讲解")
  })

  it("enters narration mode without speaking when playback starts while muted", () => {
    const speechRuntime = createSpeechRuntime()
    const root = mountApp(speechRuntime)

    openFirstProductDetail(root)
    root.querySelector("[data-speech-mute]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    root.querySelector("[data-speech-toggle]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(speechRuntime.speechSynthesis.speakCalled).toBe(0)
    expect(root.querySelector("[data-muted-state]")?.textContent).toContain("已静音")
    expect(root.querySelector("[data-speaking-state]")?.textContent).toContain("已静音，仅显示文字")
    expect(root.querySelector("[data-speech-toggle]")?.textContent).toContain("停止讲解")
  })

  it("mutes active narration immediately and keeps text-only narration active", () => {
    const speechRuntime = createSpeechRuntime()
    const root = mountApp(speechRuntime)

    openFirstProductDetail(root)
    root.querySelector("[data-speech-toggle]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    const cancelCallsAfterPlay = speechRuntime.speechSynthesis.cancelCalled

    root.querySelector("[data-speech-mute]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(speechRuntime.speechSynthesis.speakCalled).toBe(1)
    expect(speechRuntime.speechSynthesis.cancelCalled).toBe(cancelCallsAfterPlay + 1)
    expect(root.querySelector("[data-muted-state]")?.textContent).toContain("已静音")
    expect(root.querySelector("[data-speaking-state]")?.textContent).toContain("已静音，仅显示文字")
    expect(root.querySelector("[data-speech-toggle]")?.textContent).toContain("停止讲解")
  })

  it("replays the active transcript immediately when unmuting during muted narration", () => {
    const speechRuntime = createSpeechRuntime()
    const root = mountApp(speechRuntime)

    openFirstProductDetail(root)
    root.querySelector("[data-speech-mute]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    root.querySelector("[data-speech-toggle]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    root.querySelector("[data-speech-unmute]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(speechRuntime.speechSynthesis.speakCalled).toBe(1)
    expect(root.querySelector("[data-muted-state]")?.textContent).toContain("已开声")
    expect(root.querySelector("[data-speaking-state]")?.textContent).toContain("正在播放语音讲解")
    expect(speechRuntime.getSpokenUtterance()?.text).toContain("导入鞘套组")
  })

  it("preserves mute across product navigation while resetting narration mode", () => {
    const speechRuntime = createSpeechRuntime()
    const root = mountApp(speechRuntime)

    openFirstProductDetail(root)
    root.querySelector("[data-speech-mute]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    root.querySelector("[data-speech-toggle]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    root.querySelector("[data-back-to-gallery]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector("[data-product-detail-id]")).toBeNull()

    root.querySelectorAll("[data-product-card]")[1]?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector("[data-muted-state]")?.textContent).toContain("已静音")
    expect(root.querySelector("[data-speaking-state]")?.textContent).toContain("已静音，点击播放语音讲解")
    expect(root.querySelector("[data-speech-toggle]")?.textContent).toContain("播放讲解")

    root.querySelector("[data-speech-toggle]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(speechRuntime.speechSynthesis.speakCalled).toBe(0)
    expect(root.querySelector("[data-speaking-state]")?.textContent).toContain("已静音，仅显示文字")
  })
})
