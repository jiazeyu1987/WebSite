"use client"

import { useState, useMemo } from "react"
import { CategoryNav } from "@/components/category-nav"
import { ProductGrid, generateProducts } from "@/components/product-grid"
import { AudioPanel } from "@/components/audio-panel"

export default function MedicalDevicePlatform() {
  const [activeCategory, setActiveCategory] = useState("home")
  const products = useMemo(() => generateProducts(), [])

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-card/98 backdrop-blur-sm shadow-sm">
        <CategoryNav
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </header>

      {/* 产品网格区域 - 可滚动 */}
      <main className="flex-1 overflow-auto">
        <ProductGrid
          products={products}
          activeCategory={activeCategory}
        />
      </main>

      {/* 底部语音讲解面板 */}
      <footer className="p-3 pb-6 bg-background border-t border-border/30">
        <AudioPanel />
      </footer>
    </div>
  )
}
