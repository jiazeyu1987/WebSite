// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { categories } from "./demoData.js";
import { createDemoApp } from "./app.js";

describe("createDemoApp", () => {
  it("renders the initial category and switches content when a tab is clicked", () => {
    document.body.innerHTML = '<div id="app"></div>';
    const root = document.getElementById("app");

    createDemoApp(root, categories, categories[0].id);

    expect(root.querySelector("[data-active-category-id]")?.getAttribute("data-active-category-id")).toBe(
      categories[0].id
    );
    expect(root.querySelectorAll("[data-product-card]").length).toBe(categories[0].products.length);

    const nextTab = root.querySelector('[data-tab-id="cardiology"]');
    nextTab?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(root.querySelector("[data-active-category-id]")?.getAttribute("data-active-category-id")).toBe(
      categories[1].id
    );
    expect(root.querySelectorAll("[data-product-card]").length).toBe(categories[1].products.length);
    expect(root.querySelector('[data-tab-id="cardiology"]')?.getAttribute("aria-pressed")).toBe("true");
  });

  it("renders a full-bleed gallery layout with outline-style tabs", () => {
    document.body.innerHTML = '<div id="app"></div>';
    const root = document.getElementById("app");

    createDemoApp(root, categories, categories[0].id);

    expect(root.querySelector(".demo-shell")?.getAttribute("data-layout")).toBe("full-bleed");
    expect(root.querySelector(".demo-gallery__header")).toBeNull();
    expect(root.querySelectorAll("[data-product-card]").length).toBeGreaterThanOrEqual(30);
    expect(root.querySelectorAll('[data-icon-style="outline"]').length).toBe(categories.length);
  });
});
