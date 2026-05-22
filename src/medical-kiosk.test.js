// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest"
import { createMedicalKioskApp } from "./medical-kiosk.js"

const createMappedWebsiteConfig = () => ({
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
      { label: "发展历程", value: "Yingtai growth timeline" },
      { label: "园区介绍", value: "Three industrial hubs" },
      { label: "孵化平台", value: "Platform incubation model" },
      { label: "子公司概览", value: "Intervention, automation, materials" },
      { label: "上市信息", value: "No formal listing disclosure" },
      { label: "核心制造能力", value: "Precision extrusion and braiding" },
      { label: "荣誉资质", value: "National high-tech enterprise" }
    ],
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
          incompleteFlag: false,
          nameCn: "Guidewire System CN",
          nameEn: "Guidewire System",
          previewImageUrl: "https://cdn.example.com/product-101.png",
          subtitleZh: "Chinese product narration",
          subtitleEn: "English product narration",
          audioZh: "https://cdn.example.com/product-101-zh.mp3",
          audioEn: "https://cdn.example.com/product-101-en.mp3",
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
          incompleteFlag: false,
          nameCn: "Catheter System CN",
          nameEn: "Catheter System",
          previewImageUrl: "https://cdn.example.com/product-201.png",
          subtitleZh: "Chinese product narration two",
          subtitleEn: "English product narration two",
          audioZh: "https://cdn.example.com/product-201-zh.mp3",
          audioEn: "https://cdn.example.com/product-201-en.mp3",
          bilingualPublicFields: [
            {
              fieldCode: "target_market",
              labelZh: "目标市场",
              labelEn: "Target Market",
              valueZh: "神内",
              valueEn: "Neurology"
            },
            {
              fieldCode: "core_selling_points",
              labelZh: "核心卖点",
              labelEn: "Core Selling Points",
              valueZh: "更稳定",
              valueEn: "More stable support"
            }
          ]
        }
      ]
    }
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

  it("renders backend halls, hides swipe meta, and switches halls by arrows", async () => {
    const loadWebsiteConfig = vi.fn().mockResolvedValue(createMappedWebsiteConfig())
    const root = mountApp({
      loadWebsiteConfig
    })
    await flush()

    expect(loadWebsiteConfig).toHaveBeenCalledTimes(1)
    expect(root.querySelector('[data-reference-layout="medical-kiosk"]')).not.toBeNull()
    expect(root.querySelector("[data-mode-option]")).toBeNull()
    expect(root.querySelector(".kiosk-header [data-language-toggle-button]")).toBeNull()
    expect(root.querySelector(".kiosk-voice__header [data-language-toggle-button]")).not.toBeNull()
    expect(root.querySelector('[data-home-hero-image]')?.getAttribute("src")).toBe("https://cdn.example.com/company-home.png")
    expect(root.querySelector("[data-active-category-id]")?.getAttribute("data-active-category-id")).toBe("home")
    expect(root.querySelector("[data-active-category-title]")?.textContent).toContain("\u9996\u9875")
    expect(root.querySelector("[data-swipe-hint]")).toBeNull()
    expect(root.querySelector("[data-swipe-progress]")).toBeNull()

    root.querySelector('[data-shift-category="1"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector("[data-active-category-id]")?.getAttribute("data-active-category-id")).toBe("cardiology")
    expect(root.querySelector("[data-active-category-title]")?.textContent).toContain("Cardiology Hall CN")
    expect(root.querySelector("[data-swipe-hint]")).toBeNull()
    expect(root.querySelector("[data-swipe-progress]")).toBeNull()
    expect(root.querySelectorAll("[data-product-card]")).toHaveLength(1)
    expect(root.querySelector("[data-product-card]")?.getAttribute("aria-label")).toContain("Guidewire System CN")
  })

  it("shows drag feedback during a horizontal pointer swipe and clears it on cancel", async () => {
    const root = mountApp({
      loadWebsiteConfig: vi.fn().mockResolvedValue(createMappedWebsiteConfig())
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
      loadWebsiteConfig: vi.fn().mockResolvedValue(createMappedWebsiteConfig())
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
      loadWebsiteConfig: vi.fn().mockResolvedValue(createMappedWebsiteConfig()),
      createAudio: audioFactory.factory
    })
    await flush()

    root.querySelector("[data-language-toggle-button]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    root.querySelector("[data-home-company-entry-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await flush()

    expect(root.querySelector("[data-company-detail-panel]")).not.toBeNull()
    expect(root.querySelector("[data-company-detail-media-card]")).not.toBeNull()
    expect(root.querySelector("[data-company-detail-reference-layout]")).not.toBeNull()
    expect(root.querySelector("[data-company-detail-play-dock]")).not.toBeNull()
    expect(root.querySelector('[data-company-detail-cards-column="right"]')).not.toBeNull()
    expect(root.querySelector("[data-company-detail-title]")?.textContent).toContain("Yingtai Medical")
    expect(root.querySelector('[data-company-detail-cards-panel="right"]')).not.toBeNull()
    expect(root.textContent).toContain("Development History")
    expect(root.textContent).toContain("Yingtai growth history")
    expect(root.querySelectorAll("[data-company-detail-field]")).toHaveLength(5)
    expect(root.querySelector("[data-company-detail-playback-button]")?.getAttribute("aria-label")).toBe("Play narration")
    expect(root.querySelector("[data-company-detail-playback-button]")?.textContent).toContain("Play narration")
    expect(root.querySelector("[data-company-detail-playback-icon]")?.getAttribute("data-icon-state")).toBe("play")
    expect(root.textContent).toContain("Park Introduction")
    expect(root.textContent).toContain("Incubation Platform")
    expect(root.textContent).toContain("Listing Information")
    expect(root.textContent).not.toContain("Honors and Awards")
    expect(root.textContent).not.toContain("Core Manufacturing Capability")
    expect(root.querySelector("[data-company-detail-transcript]")).toBeNull()

    root.querySelector("[data-speech-toggle]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await flush()

    expect(audioFactory.controllers).toHaveLength(1)
    expect(audioFactory.controllers[0].src).toBe("https://cdn.example.com/company-en.mp3")
    expect(audioFactory.controllers[0].play).toHaveBeenCalledTimes(1)
    expect(root.querySelector("[data-company-detail-playback-button]")?.getAttribute("aria-label")).toBe("Stop narration")
    expect(root.querySelector("[data-company-detail-playback-icon]")?.getAttribute("data-icon-state")).toBe("stop")
    expect(root.querySelector("[data-speech-mute-toggle]")?.getAttribute("aria-label")).toBe("Mute audio")
    expect(root.querySelector("[data-speech-mute-toggle]")?.getAttribute("data-audio-state")).toBe("unmuted")

    root.querySelector("[data-speech-mute-toggle]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector("[data-speech-mute-toggle]")?.getAttribute("aria-label")).toBe("Unmute audio")
    expect(root.querySelector("[data-speech-mute-toggle]")?.getAttribute("data-audio-state")).toBe("muted")
  })

  it("loads product detail from the backend, renders mapped fields, and plays English product audio", async () => {
    const audioFactory = createAudioFactoryStub()
    const root = mountApp({
      loadWebsiteConfig: vi.fn().mockResolvedValue(createMappedWebsiteConfig()),
      createAudio: audioFactory.factory
    })
    await flush()

    root.querySelector("[data-language-toggle-button]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    root.querySelector('[data-shift-category="1"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    root.querySelector("[data-product-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await flush()
    await flush()

    expect(root.querySelector("[data-product-detail-id]")).not.toBeNull()
    expect(root.querySelector("[data-product-detail-title]")?.textContent).toContain("Guidewire System")
    expect(root.querySelectorAll("[data-product-description-line]")).toHaveLength(2)
    expect(root.textContent).toContain("Target Market")
    expect(root.textContent).toContain("Cardiology")
    expect(root.textContent).toContain("Core Selling Points")
    expect(root.textContent).toContain("Smoother delivery")

    root.querySelector("[data-speech-toggle]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await flush()

    expect(audioFactory.controllers).toHaveLength(1)
    expect(audioFactory.controllers[0].src).toBe("https://cdn.example.com/product-101-en.mp3")
    expect(audioFactory.controllers[0].play).toHaveBeenCalledTimes(1)
  })

  it("renders a compact voice panel state that can expand and collapse on demand", async () => {
    const root = mountApp({
      loadWebsiteConfig: vi.fn().mockResolvedValue(createMappedWebsiteConfig())
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

  it("keeps the public narration card mounted while toggling its local controls", async () => {
    const root = mountApp({
      loadWebsiteConfig: vi.fn().mockResolvedValue(createMappedWebsiteConfig())
    })
    await flush()

    const kioskShell = root.querySelector('[data-reference-layout="medical-kiosk"]')
    const voicePanel = root.querySelector("[data-voice-panel]")

    expect(kioskShell).not.toBeNull()
    expect(voicePanel).not.toBeNull()
    expect(root.querySelector("[data-language-toggle-button]")).not.toBeNull()
    expect(root.querySelector("[data-speech-mute-toggle]")).not.toBeNull()

    root.querySelector("[data-language-toggle-button]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await flush()

    expect(root.querySelector('[data-reference-layout="medical-kiosk"]')).not.toBeNull()
    expect(root.querySelector("[data-voice-panel]")).not.toBeNull()
    expect(root.querySelector("[data-language-toggle-button]")?.getAttribute("data-language-current")).toBe("en")
    expect(root.querySelector("[data-active-category-title]")?.textContent).toContain("Home")
    expect(root.querySelector("[data-voice-copy]")?.textContent).toContain("English company narration")

    root.querySelector("[data-speech-mute-toggle]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await flush()

    expect(root.querySelector('[data-reference-layout="medical-kiosk"]')).not.toBeNull()
    expect(root.querySelector("[data-voice-panel]")).not.toBeNull()
    expect(root.querySelector("[data-speech-mute-toggle]")?.getAttribute("data-audio-state")).toBe("muted")
    expect(root.querySelector("[data-speech-mute-toggle]")?.getAttribute("aria-label")).toBe("Unmute audio")
  })

  it("restores the gallery scroll position after returning from product detail", async () => {
    const originalGetComputedStyle = window.getComputedStyle.bind(window)
    const getComputedStyleSpy = vi.spyOn(window, "getComputedStyle").mockImplementation((element) => {
      if (element instanceof Element && element.hasAttribute("data-gallery-scroll-region")) {
        return { overflowY: "auto" }
      }

      return originalGetComputedStyle(element)
    })

    const root = mountApp({
      loadWebsiteConfig: vi.fn().mockResolvedValue(createMappedWebsiteConfig())
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
      loadWebsiteConfig: vi.fn().mockResolvedValue(createMappedWebsiteConfig())
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

  it("renders exactly five fixed company detail cards in the right-side column while keeping the left column for image and playback", async () => {
    const root = mountApp({
      loadWebsiteConfig: vi.fn().mockResolvedValue(createMappedWebsiteConfig())
    })
    await flush()

    root.querySelector("[data-language-toggle-button]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    root.querySelector("[data-home-company-entry-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await flush()

    const fields = Array.from(root.querySelectorAll("[data-company-detail-field]"))
    const playDock = root.querySelector("[data-company-detail-play-dock]")
    const rightColumnFields = Array.from(root.querySelectorAll('[data-company-detail-field-column="right"]'))
    const mediaCard = root.querySelector("[data-company-detail-media-card]")
    const rightCardsPanel = root.querySelector('[data-company-detail-cards-column="right"]')

    expect(fields).toHaveLength(5)
    expect(rightColumnFields).toHaveLength(5)
    expect(fields.map((field) => field.querySelector("dt")?.textContent?.trim())).toEqual([
      "Development History",
      "Park Introduction",
      "Incubation Platform",
      "Subsidiary Overview",
      "Listing Information"
    ])
    expect(fields[2]?.querySelector("dd")?.textContent).toBe("")
    expect(root.textContent).not.toContain("Honors and Awards")
    expect(root.textContent).not.toContain("Core Manufacturing Capability")
    expect(root.querySelector("[data-company-detail-transcript]")).toBeNull()
    expect(mediaCard?.compareDocumentPosition(playDock ?? null) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(playDock?.compareDocumentPosition(rightCardsPanel ?? null) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it("fails fast when a fixed company detail field entry is missing", async () => {
    const config = createMappedWebsiteConfig()
    config.company.bilingualPublicFields = config.company.bilingualPublicFields.filter((field) => field.fieldCode !== "stock_info")
    const root = mountApp({
      loadWebsiteConfig: vi.fn().mockResolvedValue(config)
    })
    await flush()

    root.querySelector("[data-home-company-entry-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector('[data-load-state="error"]')).not.toBeNull()
    expect(root.textContent).toContain("company.bilingualPublicFields.stock_info is required.")
  })

  it("shows an explicit error when the initial app-config load fails", async () => {
    const root = mountApp({
      loadWebsiteConfig: vi.fn().mockRejectedValue(new Error("SHOWROOM_WEBSITE_CONFIG_UNAVAILABLE: request failed with 503."))
    })
    await flush()

    expect(root.querySelector('[data-load-state="error"]')).not.toBeNull()
    expect(root.querySelector('[data-screen="kiosk-error"]')).not.toBeNull()
    expect(root.textContent).toContain("SHOWROOM_WEBSITE_CONFIG_UNAVAILABLE: request failed with 503.")
  })

  it("persists the selected English language across remounts", async () => {
    const loadWebsiteConfig = vi.fn().mockResolvedValue(createMappedWebsiteConfig())
    const root = mountApp({ loadWebsiteConfig })
    await flush()

    root.querySelector("[data-language-toggle-button]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector("[data-language-toggle-button]")?.getAttribute("data-language-current")).toBe("en")
    expect(root.querySelector("[data-active-category-title]")?.textContent).toContain("Home")
    expect(root.querySelector("[data-voice-copy]")?.textContent).toContain("English company narration")

    const remountedRoot = mountApp({ loadWebsiteConfig })
    await flush()

    expect(remountedRoot.querySelector("[data-language-toggle-button]")?.getAttribute("data-language-current")).toBe("en")
    expect(remountedRoot.querySelector("[data-active-category-title]")?.textContent).toContain("Home")
    expect(remountedRoot.querySelector("[data-voice-copy]")?.textContent).toContain("English company narration")
  })
})
