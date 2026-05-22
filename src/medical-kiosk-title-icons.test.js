// @vitest-environment jsdom

import { describe, expect, it } from "vitest"
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
    bilingualPublicFields: []
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
      products: []
    },
    {
      id: "20",
      code: "NEUROLOGY",
      name: "Neurology Hall CN",
      nameEn: "Neurology Hall",
      description: "Neurology description",
      descriptionEn: "Neurology description en",
      previewImageUrl: "https://cdn.example.com/hall-neurology.png",
      products: []
    }
  ]
})

const flush = async () => {
  await Promise.resolve()
  await Promise.resolve()
  await Promise.resolve()
}

const mountApp = async () => {
  document.body.innerHTML = '<div id="app"></div>'
  const root = document.getElementById("app")

  createMedicalKioskApp(root, {
    loadWebsiteConfig: () => Promise.resolve(createMappedWebsiteConfig())
  })

  await flush()
  return root
}

describe("medical kiosk title showroom icons", () => {
  it("renders the matching hall icon for icon-mapped backend hall codes and keeps home text-only", async () => {
    const root = await mountApp()
    const expectedIconByCategoryId = {
      cardiology: "/kiosk-hall-icons/cardiology.svg",
      neurology: "/kiosk-hall-icons/neurology.svg"
    }

    expect(root.querySelector("[data-active-category-id]")?.getAttribute("data-active-category-id")).toBe("home")
    expect(root.querySelector("[data-active-category-icon]")).toBeNull()

    for (const [categoryId, iconPath] of Object.entries(expectedIconByCategoryId)) {
      root.querySelector('[data-shift-category="1"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

      const activeIcon = root.querySelector("[data-active-category-icon]")

      expect(root.querySelector("[data-active-category-id]")?.getAttribute("data-active-category-id")).toBe(categoryId)
      expect(root.querySelectorAll("[data-active-category-icon]")).toHaveLength(1)
      expect(activeIcon?.getAttribute("src")).toContain(iconPath)
      expect(activeIcon?.getAttribute("alt")).toBe("")
      expect(activeIcon?.getAttribute("aria-hidden")).toBe("true")
    }
  })
})
