// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { createMedicalKioskApp, kioskCategories } from "./medical-kiosk.js";

describe("createMedicalKioskApp", () => {
  it("renders the reference kiosk layout and switches categories", () => {
    document.body.innerHTML = '<div id="app"></div>';
    const root = document.getElementById("app");

    createMedicalKioskApp(root);

    expect(root.querySelector('[data-reference-layout="medical-kiosk"]')).not.toBeNull();
    expect(root.querySelectorAll("[data-tab-id]").length).toBe(kioskCategories.length);
    expect(root.querySelectorAll("[data-product-card]").length).toBe(kioskCategories[0].products.length);

    const targetTab = root.querySelector('[data-tab-id="cardiology"]');
    targetTab?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(root.querySelector("[data-active-category-id]")?.getAttribute("data-active-category-id")).toBe(
      "cardiology"
    );
    expect(root.querySelectorAll("[data-product-card]").length).toBe(kioskCategories[1].products.length);
  });
});
