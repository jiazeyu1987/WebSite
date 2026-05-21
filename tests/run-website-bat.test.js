import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("run-website.bat", () => {
  it("exists and enforces the expected Windows restart flow", () => {
    const filePath = resolve(process.cwd(), "run-website.bat");

    expect(existsSync(filePath)).toBe(true);

    const content = readFileSync(filePath, "utf8");

    expect(content).toContain("where npm");
    expect(content).toContain("package.json");
    expect(content).toContain("node_modules");
    expect(content).toContain("Get-CimInstance Win32_Process");
    expect(content).toContain("taskkill /PID");
    expect(content).toContain('set "WEBSITE_URL=http://%WEBSITE_HOST%:%WEBSITE_PORT%/"');
    expect(content).toContain("Stopping existing website process on %WEBSITE_URL%");
    expect(content).toContain("Restarting website on %WEBSITE_URL%");
    expect(content).toContain("call npm run dev -- --host %WEBSITE_HOST% --port %WEBSITE_PORT% --strictPort");
    expect(content).not.toContain("Stop the process using 127.0.0.1:4173 before starting the website.");
  });
});
