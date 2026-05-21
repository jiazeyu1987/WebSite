import { describe, expect, it } from "vitest"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

describe("src/main.js", () => {
  it("keeps the kiosk as the root entry while allowing a separate showroom path", () => {
    const filePath = resolve(process.cwd(), "src/main.js")
    const content = readFileSync(filePath, "utf8")

    expect(content).toContain('import "./medical-kiosk.css"')
    expect(content).toContain('import "./showroom-app.css"')
    expect(content).toContain('import { createMedicalKioskApp } from "./medical-kiosk.js"')
    expect(content).toContain('import { createShowroomConsumerApp } from "./showroom-app.js"')
    expect(content).toContain('pathname.startsWith("/showroom")')
    expect(content).toContain("createMedicalKioskApp(root)")
    expect(content).toContain("createShowroomConsumerApp(root)")
  })
})
