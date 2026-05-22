// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest"
import { mapShowroomWebsiteConfig } from "./showroom-api.js"
import { createShowroomConsumerApp } from "./showroom-app.js"

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

const createMappedWebsiteConfig = () => mapShowroomWebsiteConfig(createWebsiteConfigPayload())

const createAudioController = (src = "") => {
  const listeners = new Map()

  return {
    src,
    currentTime: 0,
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

  return {
    factory,
    controllers
  }
}

const flush = async () => {
  await Promise.resolve()
  await Promise.resolve()
}

const mountApp = (options = {}) => {
  document.body.innerHTML = '<div id="app"></div>'
  const root = document.getElementById("app")
  createShowroomConsumerApp(root, options)
  return root
}

describe("createShowroomConsumerApp", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    localStorage.clear()
  })

  it("loads remote aggregate data and renders exactly one company entry card on /showroom", async () => {
    const root = document.getElementById("app")
    const loadWebsiteConfig = vi.fn().mockResolvedValue(createMappedWebsiteConfig())

    createShowroomConsumerApp(root, { loadWebsiteConfig })
    await flush()

    expect(loadWebsiteConfig).toHaveBeenCalledTimes(1)
    expect(root.querySelector('[data-load-state="ready"]')).not.toBeNull()
    expect(root.querySelector('[data-screen="company-landing"]')).not.toBeNull()
    expect(root.querySelectorAll("[data-company-entry-card]")).toHaveLength(1)
    expect(root.querySelector('[data-company-entry-card]')?.textContent).toContain("\u76c8\u6cf0\u533b\u7597")
    expect(root.querySelector('[data-company-entry-image]')?.getAttribute("src")).toBe("https://cdn.example.com/company-home.png")
    expect(root.querySelector('[data-language-option="zh"]')?.getAttribute("aria-pressed")).toBe("true")
    expect(root.querySelectorAll("[data-view-showroom-id]")).toHaveLength(0)
    expect(root.querySelectorAll("[data-product-id]")).toHaveLength(0)
  })

  it("switches showroom content to English and restores the persisted language on remount", async () => {
    const loadWebsiteConfig = vi.fn().mockResolvedValue(createMappedWebsiteConfig())
    const root = mountApp({ loadWebsiteConfig, createAudio: vi.fn(() => createAudioController()) })
    await flush()

    root.querySelector('[data-language-option="en"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector('[data-language-option="en"]')?.getAttribute("aria-pressed")).toBe("true")
    expect(root.querySelector("[data-company-entry-card]")?.textContent).toContain("Yingtai Medical")
    expect(root.textContent).toContain("View company profile")

    root.querySelector("[data-company-entry-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector('[data-screen="company-detail"]')).not.toBeNull()
    expect(root.querySelector("[data-company-detail-title]")?.textContent).toContain("Yingtai Medical")
    expect(root.querySelector("[data-company-detail-copy]")?.textContent).toContain("English company narration")
    expect(root.querySelector("[data-company-back]")?.textContent).toContain("Back to home")
    expect(root.textContent).toContain("Development History")
    expect(root.textContent).toContain("Yingtai growth history")
    expect(root.querySelectorAll("[data-company-field]")).toHaveLength(5)
    expect(root.textContent).toContain("Park Introduction")
    expect(root.textContent).toContain("Incubation Platform")
    expect(root.textContent).toContain("Listing Information")
    expect(root.textContent).not.toContain("Honors and Awards")
    expect(root.textContent).not.toContain("Core Manufacturing Capability")

    const remountedRoot = mountApp({ loadWebsiteConfig, createAudio: vi.fn(() => createAudioController()) })
    await flush()

    expect(remountedRoot.querySelector('[data-language-option="en"]')?.getAttribute("aria-pressed")).toBe("true")
    expect(remountedRoot.querySelector("[data-company-entry-card]")?.textContent).toContain("Yingtai Medical")
    expect(remountedRoot.textContent).toContain("View company profile")
  })

  it("switches the active company audio source when the showroom language changes", async () => {
    const audioFactory = createAudioFactoryStub()
    const root = mountApp({
      loadWebsiteConfig: vi.fn().mockResolvedValue(createMappedWebsiteConfig()),
      createAudio: audioFactory.factory
    })
    await flush()

    root.querySelector("[data-company-entry-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    root.querySelector("[data-company-play]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await flush()

    expect(audioFactory.controllers).toHaveLength(1)
    expect(audioFactory.controllers[0].src).toBe("https://cdn.example.com/company-zh.mp3")
    expect(audioFactory.controllers[0].play).toHaveBeenCalledTimes(1)

    root.querySelector('[data-language-option="en"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await flush()

    expect(audioFactory.controllers[0].pause).toHaveBeenCalled()
    expect(audioFactory.controllers).toHaveLength(2)
    expect(audioFactory.controllers[1].src).toBe("https://cdn.example.com/company-en.mp3")
    expect(audioFactory.controllers[1].play).toHaveBeenCalledTimes(1)
    expect(root.querySelector("[data-company-play-state]")?.textContent).toContain("Playing English narration")
  })

  it("renders company detail cards before the narration transcript and keeps the play action visible in the hero area", async () => {
    const root = mountApp({
      loadWebsiteConfig: vi.fn().mockResolvedValue(createMappedWebsiteConfig()),
      createAudio: vi.fn(() => createAudioController())
    })
    await flush()

    root.querySelector("[data-company-entry-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    const hero = root.querySelector("[data-company-detail-media]")
    const fields = root.querySelector("[data-company-fields]")
    const transcript = root.querySelector("[data-company-detail-summary]")

    expect(hero).not.toBeNull()
    expect(fields).not.toBeNull()
    expect(transcript).not.toBeNull()
    expect(root.querySelector("[data-company-play]")?.textContent).toContain("播放讲解")
    expect(root.querySelector("[data-company-detail-copy]")?.textContent).toContain("公司中文讲解")
    expect(fields?.compareDocumentPosition(transcript) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it("renders a dedicated hero play action and keeps the transcript below the five cards", async () => {
    const root = mountApp({
      loadWebsiteConfig: vi.fn().mockResolvedValue(createMappedWebsiteConfig()),
      createAudio: vi.fn(() => createAudioController())
    })
    await flush()

    root.querySelector("[data-company-entry-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    const actionBar = root.querySelector("[data-company-detail-action-bar]")
    const fields = root.querySelector("[data-company-fields]")
    const transcript = root.querySelector("[data-company-detail-summary]")

    expect(actionBar).not.toBeNull()
    expect(actionBar?.textContent).toContain("播放讲解")
    expect(fields?.compareDocumentPosition(transcript) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it("renders stable field label/value markers for the company public fields", async () => {
    const root = mountApp({
      loadWebsiteConfig: vi.fn().mockResolvedValue(createMappedWebsiteConfig()),
      createAudio: vi.fn(() => createAudioController())
    })
    await flush()

    root.querySelector("[data-company-entry-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    const firstField = root.querySelector('[data-company-field-index="0"]')

    expect(firstField?.querySelector("[data-company-field-label]")?.textContent).toContain("发展历程")
    expect(firstField?.querySelector("[data-company-field-value]")?.textContent).toContain("盈泰医疗发展历程")
  })

  it("renders exactly five fixed company detail cards and keeps an empty English value as an empty card body", async () => {
    const root = mountApp({
      loadWebsiteConfig: vi.fn().mockResolvedValue(createMappedWebsiteConfig()),
      createAudio: vi.fn(() => createAudioController())
    })
    await flush()

    root.querySelector('[data-language-option="en"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    root.querySelector("[data-company-entry-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    const fields = Array.from(root.querySelectorAll("[data-company-field]"))

    expect(fields).toHaveLength(5)
    expect(fields.map((field) => field.querySelector("[data-company-field-label]")?.textContent?.trim())).toEqual([
      "Development History",
      "Park Introduction",
      "Incubation Platform",
      "Subsidiary Overview",
      "Listing Information"
    ])
    expect(fields[2]?.querySelector("[data-company-field-value]")?.textContent).toBe("")
    expect(root.textContent).not.toContain("Honors and Awards")
    expect(root.textContent).not.toContain("Core Manufacturing Capability")
  })

  it("fails fast when one fixed company detail field entry is missing", async () => {
    const payload = createWebsiteConfigPayload()
    payload.company.bilingualPublicFields = payload.company.bilingualPublicFields.filter((field) => field.fieldCode !== "stock_info")
    const root = mountApp({
      loadWebsiteConfig: vi.fn().mockResolvedValue(mapShowroomWebsiteConfig(payload)),
      createAudio: vi.fn(() => createAudioController())
    })
    await flush()

    root.querySelector("[data-company-entry-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector('[data-load-state="error"]')).not.toBeNull()
    expect(root.textContent).toContain("company.bilingualPublicFields.stock_info is required.")
  })

  it("shows an explicit error state when company.bilingualPublicFields is missing", async () => {
    const root = document.getElementById("app")

    createShowroomConsumerApp(root, {
      loadWebsiteConfig: vi.fn().mockRejectedValue(new Error("company.bilingualPublicFields is required."))
    })
    await flush()

    expect(root.querySelector('[data-load-state="error"]')).not.toBeNull()
    expect(root.querySelector('[data-screen="showroom-error"]')).not.toBeNull()
    expect(root.textContent).toContain("company.bilingualPublicFields is required.")
  })
})
