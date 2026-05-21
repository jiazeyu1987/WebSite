// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest"
import { createMedicalKioskApp } from "./medical-kiosk.js"

const createMappedAppConfig = () => ({
  company: {
    id: "1",
    name: "Yingtai Medical CN",
    nameEn: "Yingtai Medical",
    homeImage: "https://cdn.example.com/company-home.png",
    subtitleZh: "Company narration in Chinese",
    subtitleEn: "English company narration",
    audioZh: "https://cdn.example.com/company-zh.mp3",
    audioEn: "https://cdn.example.com/company-en.mp3",
    publicFields: [
      { label: "Milestones", value: "Yingtai growth timeline" },
      { label: "Awards", value: "National high-tech enterprise" }
    ]
  },
  showrooms: [
    {
      id: "10",
      code: "CARDIOLOGY",
      name: "Cardiology Hall CN",
      nameEn: "Cardiology Hall",
      description: "Chinese hall description",
      descriptionEn: "English hall description",
      previewImageUrl: "https://cdn.example.com/hall-cardiology.png",
      products: [
        {
          id: "101",
          code: "P-101",
          nameCn: "Guidewire System CN",
          nameEn: "Guidewire System",
          previewImageUrl: "https://cdn.example.com/product-101.png",
          subtitleZh: "Chinese product narration",
          subtitleEn: "English product narration",
          audioZh: "https://cdn.example.com/product-101-zh.mp3",
          audioEn: "https://cdn.example.com/product-101-en.mp3"
        }
      ]
    },
    {
      id: "20",
      code: "NEUROLOGY",
      name: "Neurology Hall CN",
      nameEn: "Neurology Hall",
      description: "Neurology hall description",
      descriptionEn: "Neurology hall description in English",
      previewImageUrl: "https://cdn.example.com/hall-neuro.png",
      products: [
        {
          id: "201",
          code: "P-201",
          nameCn: "Catheter System CN",
          nameEn: "Catheter System",
          previewImageUrl: "https://cdn.example.com/product-201.png",
          subtitleZh: "Chinese product narration two",
          subtitleEn: "English product narration two",
          audioZh: "https://cdn.example.com/product-201-zh.mp3",
          audioEn: "https://cdn.example.com/product-201-en.mp3"
        }
      ]
    }
  ]
})

const createMappedProductDetail = (productId) => ({
  id: String(productId),
  nameCn: productId === "101" ? "Guidewire System CN" : "Catheter System CN",
  nameEn: productId === "101" ? "Guidewire System" : "Catheter System",
  previewImageUrl: `https://cdn.example.com/product-${productId}.png`,
  publicFields: [
    { label: "Target market", value: productId === "101" ? "Cardiology" : "Neurology" },
    { label: "Registration", value: productId === "101" ? "Cert-A" : "Cert-B" }
  ]
})

const createAudioController = (src = "") => {
  const listeners = new Map()

  return {
    src,
    currentTime: 0,
    muted: false,
    play: vi.fn(async () => {
      listeners.get("play")?.forEach((listener) => listener())
    }),
    pause: vi.fn(() => {
      listeners.get("pause")?.forEach((listener) => listener())
    }),
    addEventListener: vi.fn((eventName, listener) => {
      const nextListeners = listeners.get(eventName) ?? []
      nextListeners.push(listener)
      listeners.set(eventName, nextListeners)
    }),
    removeEventListener: vi.fn((eventName, listener) => {
      const nextListeners = (listeners.get(eventName) ?? []).filter((item) => item !== listener)
      listeners.set(eventName, nextListeners)
    })
  }
}

const createAudioFactoryStub = () => {
  const controllers = []
  const factory = vi.fn((src) => {
    const controller = createAudioController(src)
    controllers.push(controller)
    return controller
  })

  return { factory, controllers }
}

const flush = async () => {
  await Promise.resolve()
  await Promise.resolve()
  await Promise.resolve()
}

const createPointerGestureEvent = (type, init = {}) => {
  const EventCtor = window.PointerEvent ?? window.MouseEvent
  const event = new EventCtor(type, {
    bubbles: true,
    cancelable: true,
    clientX: init.clientX ?? 0,
    clientY: init.clientY ?? 0
  })

  if (!("pointerId" in event)) {
    Object.defineProperty(event, "pointerId", { configurable: true, value: init.pointerId ?? 1 })
  }

  if (!("pointerType" in event)) {
    Object.defineProperty(event, "pointerType", { configurable: true, value: init.pointerType ?? "touch" })
  }

  return event
}

const mountApp = (options = {}) => {
  document.body.innerHTML = '<div id="app"></div>'
  const root = document.getElementById("app")
  createMedicalKioskApp(root, options)
  return root
}

describe("createMedicalKioskApp", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    localStorage.clear()
  })

  it("renders backend halls and switches halls by arrows", async () => {
    const loadAppConfig = vi.fn().mockResolvedValue(createMappedAppConfig())
    const root = mountApp({
      loadAppConfig
    })
    await flush()

    expect(loadAppConfig).toHaveBeenCalledTimes(1)
    expect(root.querySelector('[data-reference-layout="medical-kiosk"]')).not.toBeNull()
    expect(root.querySelector("[data-mode-option]")).toBeNull()
    expect(root.querySelector(".kiosk-header [data-language-toggle-button]")).toBeNull()
    expect(root.querySelector(".kiosk-voice__header [data-language-toggle-button]")).not.toBeNull()
    expect(root.querySelector('[data-home-hero-image]')?.getAttribute("src")).toBe("https://cdn.example.com/company-home.png")
    expect(root.querySelector("[data-active-category-id]")?.getAttribute("data-active-category-id")).toBe("home")
    expect(root.querySelector("[data-active-category-title]")?.textContent).toContain("\u9996\u9875")
    expect(root.querySelector("[data-swipe-hint]")?.textContent).toContain("\u5de6\u53f3\u6ed1\u52a8\u6216\u70b9\u51fb\u5207\u6362\u5c55\u5385")
    expect(root.querySelector("[data-swipe-progress]")?.getAttribute("data-current-slot")).toBe("1")
    expect(root.querySelector("[data-swipe-progress]")?.getAttribute("data-total-slots")).toBe("3")

    root.querySelector('[data-shift-category="1"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector("[data-active-category-id]")?.getAttribute("data-active-category-id")).toBe("cardiology")
    expect(root.querySelector("[data-active-category-title]")?.textContent).toContain("Cardiology Hall CN")
    expect(root.querySelector("[data-swipe-progress]")?.getAttribute("data-current-slot")).toBe("2")
    expect(root.querySelector("[data-swipe-progress]")?.getAttribute("data-total-slots")).toBe("3")
    expect(root.querySelectorAll("[data-product-card]")).toHaveLength(1)
    expect(root.querySelector("[data-product-card]")?.getAttribute("aria-label")).toContain("Guidewire System CN")
  })

  it("shows drag feedback during a horizontal pointer swipe and clears it on cancel", async () => {
    const root = mountApp({
      loadAppConfig: vi.fn().mockResolvedValue(createMappedAppConfig())
    })
    await flush()

    const swipeHeader = root.querySelector("[data-swipe-header]")

    swipeHeader?.dispatchEvent(createPointerGestureEvent("pointerdown", { clientX: 300, clientY: 120 }))
    swipeHeader?.dispatchEvent(createPointerGestureEvent("pointermove", { clientX: 232, clientY: 124 }))

    expect(root.querySelector("[data-swipe-header]")?.getAttribute("data-swipe-dragging")).toBe("true")
    expect(root.querySelector("[data-swipe-header]")?.getAttribute("data-swipe-axis")).toBe("x")
    expect(root.querySelector("[data-swipe-header]")?.style.getPropertyValue("--kiosk-swipe-shift")).not.toBe("0px")

    swipeHeader?.dispatchEvent(createPointerGestureEvent("pointercancel", { clientX: 232, clientY: 124 }))

    expect(root.querySelector("[data-swipe-header]")?.getAttribute("data-swipe-dragging")).toBe("false")
    expect(root.querySelector("[data-swipe-header]")?.getAttribute("data-swipe-axis")).toBe("idle")
    expect(root.querySelector("[data-swipe-header]")?.style.getPropertyValue("--kiosk-swipe-shift")).toBe("0px")
    expect(root.querySelector("[data-active-category-id]")?.getAttribute("data-active-category-id")).toBe("home")
  })

  it("does not switch halls for a predominantly vertical pointer drag", async () => {
    const root = mountApp({
      loadAppConfig: vi.fn().mockResolvedValue(createMappedAppConfig())
    })
    await flush()

    const swipeHeader = root.querySelector("[data-swipe-header]")

    swipeHeader?.dispatchEvent(createPointerGestureEvent("pointerdown", { clientX: 180, clientY: 100 }))
    swipeHeader?.dispatchEvent(createPointerGestureEvent("pointermove", { clientX: 188, clientY: 184 }))
    swipeHeader?.dispatchEvent(createPointerGestureEvent("pointerup", { clientX: 188, clientY: 184 }))

    expect(root.querySelector("[data-active-category-id]")?.getAttribute("data-active-category-id")).toBe("home")
    expect(root.querySelector("[data-swipe-header]")?.getAttribute("data-swipe-dragging")).toBe("false")
    expect(root.querySelector("[data-swipe-header]")?.getAttribute("data-swipe-axis")).toBe("idle")
  })

  it("opens company detail from backend config and plays the backend company audio in English", async () => {
    const audioFactory = createAudioFactoryStub()
    const root = mountApp({
      loadAppConfig: vi.fn().mockResolvedValue(createMappedAppConfig()),
      createAudio: audioFactory.factory
    })
    await flush()

    root.querySelector("[data-language-toggle-button]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    root.querySelector("[data-home-company-entry-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await flush()

    expect(root.querySelector("[data-company-detail-panel]")).not.toBeNull()
    expect(root.querySelector("[data-company-detail-title]")?.textContent).toContain("Yingtai Medical")
    expect(root.querySelector("[data-company-detail-copy]")?.textContent).toContain("English company narration")

    root.querySelector("[data-speech-toggle]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await flush()

    expect(audioFactory.controllers).toHaveLength(1)
    expect(audioFactory.controllers[0].src).toBe("https://cdn.example.com/company-en.mp3")
    expect(audioFactory.controllers[0].play).toHaveBeenCalledTimes(1)
    expect(root.querySelector("[data-speech-toggle]")?.textContent).toContain("Pause narration")
    expect(root.querySelector("[data-speech-mute-toggle]")?.getAttribute("aria-label")).toBe("Mute audio")
    expect(root.querySelector("[data-speech-mute-toggle]")?.getAttribute("data-audio-state")).toBe("unmuted")

    root.querySelector("[data-speech-mute-toggle]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector("[data-speech-mute-toggle]")?.getAttribute("aria-label")).toBe("Unmute audio")
    expect(root.querySelector("[data-speech-mute-toggle]")?.getAttribute("data-audio-state")).toBe("muted")
  })

  it("loads product detail from the backend, renders mapped fields, and plays English product audio", async () => {
    const audioFactory = createAudioFactoryStub()
    const loadProductDetail = vi.fn((productId) => Promise.resolve(createMappedProductDetail(productId)))
    const root = mountApp({
      loadAppConfig: vi.fn().mockResolvedValue(createMappedAppConfig()),
      loadProductDetail,
      createAudio: audioFactory.factory
    })
    await flush()

    root.querySelector("[data-language-toggle-button]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    root.querySelector('[data-shift-category="1"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    root.querySelector("[data-product-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await flush()
    await flush()

    expect(loadProductDetail).toHaveBeenCalledWith("101")
    expect(root.querySelector("[data-product-detail-id]")).not.toBeNull()
    expect(root.querySelector("[data-product-detail-title]")?.textContent).toContain("Guidewire System")
    expect(root.querySelectorAll("[data-product-description-line]")).toHaveLength(2)
    expect(root.textContent).toContain("Target market")
    expect(root.textContent).toContain("Cert-A")

    root.querySelector("[data-speech-toggle]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await flush()

    expect(audioFactory.controllers).toHaveLength(1)
    expect(audioFactory.controllers[0].src).toBe("https://cdn.example.com/product-101-en.mp3")
    expect(audioFactory.controllers[0].play).toHaveBeenCalledTimes(1)
  })

  it("renders a compact voice panel state that can expand and collapse on demand", async () => {
    const root = mountApp({
      loadAppConfig: vi.fn().mockResolvedValue(createMappedAppConfig())
    })
    await flush()

    const voicePanel = root.querySelector("[data-voice-panel]")
    const voiceToggle = root.querySelector("[data-voice-panel-toggle]")
    const voicePreview = root.querySelector("[data-voice-preview]")

    expect(voicePanel?.getAttribute("data-voice-panel-expanded")).toBe("false")
    expect(voiceToggle?.textContent).toContain("\u5c55\u5f00\u8bb2\u89e3")
    expect(voiceToggle?.getAttribute("aria-expanded")).toBe("false")
    expect(voicePreview?.textContent).toContain("Company narration in Chinese")

    voiceToggle?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector("[data-voice-panel]")?.getAttribute("data-voice-panel-expanded")).toBe("true")
    expect(root.querySelector("[data-voice-panel-toggle]")?.textContent).toContain("\u6536\u8d77\u8bb2\u89e3")
    expect(root.querySelector("[data-voice-panel-toggle]")?.getAttribute("aria-expanded")).toBe("true")

    root.querySelector("[data-voice-panel-toggle]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector("[data-voice-panel]")?.getAttribute("data-voice-panel-expanded")).toBe("false")
  })

  it("restores the gallery scroll position after returning from product detail", async () => {
    const originalGetComputedStyle = window.getComputedStyle.bind(window)
    const getComputedStyleSpy = vi.spyOn(window, "getComputedStyle").mockImplementation((element) => {
      if (element instanceof Element && element.hasAttribute("data-gallery-scroll-region")) {
        return { overflowY: "auto" }
      }

      return originalGetComputedStyle(element)
    })

    const loadProductDetail = vi.fn((productId) => Promise.resolve(createMappedProductDetail(productId)))
    const root = mountApp({
      loadAppConfig: vi.fn().mockResolvedValue(createMappedAppConfig()),
      loadProductDetail
    })
    await flush()

    root.querySelector('[data-shift-category="1"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    const gallery = root.querySelector("[data-gallery-scroll-region]")
    gallery.scrollTop = 180

    root.querySelector("[data-product-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await flush()
    await flush()

    root.querySelector("[data-back-to-gallery]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector("[data-gallery-scroll-region]")?.scrollTop).toBe(180)
    getComputedStyleSpy.mockRestore()
  })

  it("restores the home browse position after returning from company detail", async () => {
    const originalGetComputedStyle = window.getComputedStyle.bind(window)
    const scrollingElement = document.scrollingElement ?? document.documentElement
    const getComputedStyleSpy = vi.spyOn(window, "getComputedStyle").mockImplementation((element) => {
      if (element instanceof Element && element.hasAttribute("data-gallery-scroll-region")) {
        return { overflowY: "visible" }
      }

      return originalGetComputedStyle(element)
    })
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation((x, y) => {
      scrollingElement.scrollLeft = Number(x)
      scrollingElement.scrollTop = Number(y)
    })

    const root = mountApp({
      loadAppConfig: vi.fn().mockResolvedValue(createMappedAppConfig())
    })
    await flush()

    scrollingElement.scrollTop = 240

    root.querySelector("[data-home-company-entry-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    scrollingElement.scrollTop = 0

    root.querySelector("[data-company-back]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(scrollingElement.scrollTop).toBe(240)
    getComputedStyleSpy.mockRestore()
    scrollToSpy.mockRestore()
  })

  it("shows an explicit error when the initial app-config load fails", async () => {
    const root = mountApp({
      loadAppConfig: vi.fn().mockRejectedValue(new Error("SHOWROOM_APP_CONFIG_UNAVAILABLE: request failed with 503."))
    })
    await flush()

    expect(root.querySelector('[data-load-state="error"]')).not.toBeNull()
    expect(root.querySelector('[data-screen="kiosk-error"]')).not.toBeNull()
    expect(root.textContent).toContain("SHOWROOM_APP_CONFIG_UNAVAILABLE: request failed with 503.")
  })

  it("persists the selected English language across remounts", async () => {
    const loadAppConfig = vi.fn().mockResolvedValue(createMappedAppConfig())
    const root = mountApp({ loadAppConfig })
    await flush()

    root.querySelector("[data-language-toggle-button]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector("[data-language-toggle-button]")?.getAttribute("data-language-current")).toBe("en")
    expect(root.querySelector("[data-active-category-title]")?.textContent).toContain("Home")
    expect(root.querySelector("[data-voice-copy]")?.textContent).toContain("English company narration")

    const remountedRoot = mountApp({ loadAppConfig })
    await flush()

    expect(remountedRoot.querySelector("[data-language-toggle-button]")?.getAttribute("data-language-current")).toBe("en")
    expect(remountedRoot.querySelector("[data-active-category-title]")?.textContent).toContain("Home")
    expect(remountedRoot.querySelector("[data-voice-copy]")?.textContent).toContain("English company narration")
  })
})
