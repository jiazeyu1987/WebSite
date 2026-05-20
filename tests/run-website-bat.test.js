import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("run-website.bat", () => {
  it("exists and enforces the expected Windows startup flow", () => {
    const filePath = resolve(process.cwd(), "run-website.bat");

    expect(existsSync(filePath)).toBe(true);

    const content = readFileSync(filePath, "utf8");

    expect(content).toContain("where npm");
    expect(content).toContain("package.json");
    expect(content).toContain("node_modules");
    expect(content).toContain("npm run dev -- --host 127.0.0.1 --port 4173 --strictPort");
  });
});
