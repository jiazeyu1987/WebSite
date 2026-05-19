"use client"

import { useState, useMemo } from "react"
import { CategoryNav } from "@/components/category-nav"
import { ProductGrid, generateProducts } from "@/components/product-grid"
import { AudioPanel } from "@/components/audio-panel"

export default function MedicalDevicePlatform() {
  const [activeCategory, setActiveCategory] = useState("home")
  const products = useMemo(() => generateProducts(), [])

  return (
    <div className="h-screen w-screen bg-background flex flex-col overflow-hidden">
      {/* 顶部导航 */}
      <header className="shrink-0 z-50">
        <CategoryNav
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </header>

      {/* 主内容区域 - 左右分栏 */}
      <main className="flex-1 flex min-h-0">
        {/* 左侧产品网格区域 */}
        <div className="flex-1 overflow-auto">
          <ProductGrid
            products={products}
            activeCategory={activeCategory}
          />
        </div>

        {/* 右侧语音讲解面板 */}
        <aside className="w-[280px] shrink-0 p-2 bg-background">
          <AudioPanel className="h-full" />
        </aside>
      </main>
    </div>
  )
}
