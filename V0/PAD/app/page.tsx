"use client"

import { useState, useMemo } from "react"
import { CategoryNav } from "@/components/category-nav"
import { ProductGrid, generateProducts } from "@/components/product-grid"
import { AudioPanel } from "@/components/audio-panel"

export default function MedicalDevicePlatform() {
  const [activeCategory, setActiveCategory] = useState("home")
  const products = useMemo(() => generateProducts(), [])

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm shadow-sm">
        <CategoryNav
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </header>

      {/* 主内容区域 */}
      <main className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* 产品网格区域 */}
        <div className="flex-1 overflow-auto">
          <ProductGrid
            products={products}
            activeCategory={activeCategory}
          />
        </div>

        {/* 语音讲解面板 - 桌面端在右侧 */}
        <aside className="hidden lg:block w-[400px] shrink-0 p-4 bg-background">
          <AudioPanel className="sticky top-24 max-h-[calc(100vh-120px)] overflow-auto" />
        </aside>
      </main>

      {/* 语音讲解面板 - 移动端在底部 */}
      <footer className="lg:hidden p-3 pb-6 bg-background">
        <AudioPanel />
      </footer>
    </div>
  )
}
