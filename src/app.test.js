// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { categories } from "./demoData.js";
import { createDemoApp } from "./app.js";

describe("createDemoApp", () => {
  it("renders the initial category and switches content when a tab is clicked", () => {
    document.body.innerHTML = '<div id="app"></div>';
    const root = document.getElementById("app");

    createDemoApp(root, categories, categories[0].id);

    expect(root.querySelector("[data-active-category]")?.textContent).toContain("首页");
    expect(root.querySelectorAll("[data-product-card]").length).toBe(categories[0].products.length);

    const nextTab = root.querySelector('[data-tab-id="cardiology"]');
    nextTab?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(root.querySelector("[data-active-category]")?.textContent).toContain("心内介入类");
    expect(root.querySelector("[data-voice-copy]")?.textContent).toContain("心内");
    expect(root.querySelectorAll("[data-product-card]").length).toBe(categories[1].products.length);
  });
});
