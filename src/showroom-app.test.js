// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest"
import { createShowroomConsumerApp } from "./showroom-app.js"

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

  it("loads remote app-config data and renders exactly one company entry card on /showroom", async () => {
    const root = document.getElementById("app")
    const loadAppConfig = vi.fn().mockResolvedValue(createApiPayload())

    createShowroomConsumerApp(root, { loadAppConfig })
    await flush()

    expect(loadAppConfig).toHaveBeenCalledTimes(1)
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
    const loadAppConfig = vi.fn().mockResolvedValue(createApiPayload())
    const root = mountApp({ loadAppConfig, createAudio: vi.fn(() => createAudioController()) })
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

    const remountedRoot = mountApp({ loadAppConfig, createAudio: vi.fn(() => createAudioController()) })
    await flush()

    expect(remountedRoot.querySelector('[data-language-option="en"]')?.getAttribute("aria-pressed")).toBe("true")
    expect(remountedRoot.querySelector("[data-company-entry-card]")?.textContent).toContain("Yingtai Medical")
    expect(remountedRoot.textContent).toContain("View company profile")
  })

  it("switches the active company audio source when the showroom language changes", async () => {
    const audioFactory = createAudioFactoryStub()
    const root = mountApp({
      loadAppConfig: vi.fn().mockResolvedValue(createApiPayload()),
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

  it("renders the company detail summary and play action before the public field list", async () => {
    const root = mountApp({
      loadAppConfig: vi.fn().mockResolvedValue(createApiPayload()),
      createAudio: vi.fn(() => createAudioController())
    })
    await flush()

    root.querySelector("[data-company-entry-card]")?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    const summary = root.querySelector("[data-company-detail-summary]")
    const actions = root.querySelector("[data-company-detail-actions]")
    const fields = root.querySelector("[data-company-fields]")

    expect(summary).not.toBeNull()
    expect(actions).not.toBeNull()
    expect(root.querySelector("[data-company-play]")?.textContent).toContain("播放讲解")
    expect(root.querySelector("[data-company-detail-copy]")?.textContent).toContain("公司中文讲解")
    expect(summary?.compareDocumentPosition(fields) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(actions?.compareDocumentPosition(fields) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it("shows an explicit error state when company.publicFields is missing", async () => {
    const root = document.getElementById("app")
    const payload = createApiPayload()
    delete payload.company.publicFields

    createShowroomConsumerApp(root, {
      loadAppConfig: vi.fn().mockResolvedValue(payload)
    })
    await flush()

    expect(root.querySelector('[data-load-state="error"]')).not.toBeNull()
    expect(root.querySelector('[data-screen="showroom-error"]')).not.toBeNull()
    expect(root.textContent).toContain("company.publicFields is required.")
  })
})
