// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest"
import { createShowroomApp } from "./app.js"
import { defaultAppConfig } from "./demoData.js"

const cloneConfig = (config) => structuredClone(config)

const createImportedConfig = () => {
  const config = cloneConfig(defaultAppConfig)

  config.company.name = "北辰医疗科技"
  config.company.subtitleZh = "导入后的中文主页字幕"
  config.company.subtitleEn = "Imported English company subtitle"
  config.showrooms[0].name = "导入展厅"
  config.showrooms[0].products[0].name = "导入产品"
  config.showrooms[0].products[0].subtitleZh = "导入产品中文讲解"
  config.showrooms[0].products[0].subtitleEn = "Imported product subtitle"

  return config
}

describe("createShowroomApp", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
  })

  it("renders the company homepage by default and switches to a showroom product view", () => {
    const root = document.getElementById("app")

    createShowroomApp(root, { initialConfig: defaultAppConfig })

    expect(root.querySelector('[data-screen="company-home"]')).not.toBeNull()
    expect(root.textContent).toContain(defaultAppConfig.company.name)
    expect(root.textContent).toContain(defaultAppConfig.company.subtitleZh)

    const firstShowroom = defaultAppConfig.showrooms[0]
    const showroomTab = root.querySelector(`[data-view-showroom-id="${firstShowroom.id}"]`)
    showroomTab?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.querySelector('[data-screen="showroom"]')?.getAttribute("data-screen-showroom-id")).toBe(
      firstShowroom.id
    )
    expect(root.textContent).toContain(firstShowroom.products[0].name)
    expect(root.textContent).toContain(firstShowroom.products[0].subtitleZh)
  })

  it("imports workbook data from the admin console and exports the active config", async () => {
    const root = document.getElementById("app")
    const importedConfig = createImportedConfig()
    const parseWorkbookBinary = vi.fn().mockResolvedValue(importedConfig)
    const createWorkbookBinary = vi.fn().mockReturnValue(new Uint8Array([1, 2, 3]))
    const downloadWorkbook = vi.fn()

    createShowroomApp(root, {
      initialConfig: defaultAppConfig,
      parseWorkbookBinary,
      createWorkbookBinary,
      downloadWorkbook
    })

    root.querySelector('[data-view-id="admin"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    const file = new File(["demo"], "config.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    })
    file.arrayBuffer = vi.fn().mockResolvedValue(new ArrayBuffer(8))

    const input = root.querySelector("[data-config-file-input]")
    Object.defineProperty(input, "files", {
      configurable: true,
      value: [file]
    })
    input?.dispatchEvent(new Event("change", { bubbles: true }))

    root.querySelector('[data-action="import-workbook"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await Promise.resolve()
    await Promise.resolve()

    expect(parseWorkbookBinary).toHaveBeenCalledTimes(1)
    expect(root.textContent).toContain(importedConfig.company.name)
    expect(root.textContent).toContain(importedConfig.company.subtitleZh)

    root.querySelector('[data-view-id="admin"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    root.querySelector('[data-action="export-workbook"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await Promise.resolve()

    expect(createWorkbookBinary).toHaveBeenCalledWith(importedConfig)
    expect(downloadWorkbook).toHaveBeenCalledWith(expect.any(Uint8Array), "showroom-config.xlsx")
  })

  it("shows a validation error and keeps the previous config when workbook import fails", async () => {
    const root = document.getElementById("app")
    const parseWorkbookBinary = vi.fn().mockRejectedValue(
      new Error("Products sheet row 1 references unknown showroom_id `missing-showroom`.")
    )

    createShowroomApp(root, {
      initialConfig: defaultAppConfig,
      parseWorkbookBinary
    })

    root.querySelector('[data-view-id="admin"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    const file = new File(["broken"], "broken.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    })
    file.arrayBuffer = vi.fn().mockResolvedValue(new ArrayBuffer(4))

    const input = root.querySelector("[data-config-file-input]")
    Object.defineProperty(input, "files", {
      configurable: true,
      value: [file]
    })
    input?.dispatchEvent(new Event("change", { bubbles: true }))

    root.querySelector('[data-action="import-workbook"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    await Promise.resolve()
    await Promise.resolve()

    expect(root.textContent).toContain("Products sheet row 1 references unknown showroom_id `missing-showroom`.")

    root.querySelector('[data-view-id="company"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(root.textContent).toContain(defaultAppConfig.company.name)
    expect(root.textContent).not.toContain("导入后的中文主页字幕")
  })
})
