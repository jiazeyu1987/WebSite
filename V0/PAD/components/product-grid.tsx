"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

// 模拟产品数据
export interface Product {
  id: string
  name: string
  image: string
  category: string
}

// 产品图片（使用真实医疗器械图片风格的占位图）
const productImages = [
  // 导管类
  "/placeholder.svg?height=120&width=160&text=导引导管",
  "/placeholder.svg?height=120&width=160&text=微导管",
  "/placeholder.svg?height=120&width=160&text=造影导管",
  "/placeholder.svg?height=120&width=160&text=球囊导管",
  "/placeholder.svg?height=120&width=160&text=引流管",
  "/placeholder.svg?height=120&width=160&text=高压管",
  // 导丝类
  "/placeholder.svg?height=120&width=160&text=导引导丝",
  "/placeholder.svg?height=120&width=160&text=微导丝",
  "/placeholder.svg?height=120&width=160&text=亲水导丝",
  "/placeholder.svg?height=120&width=160&text=支撑导丝",
  // 支架类
  "/placeholder.svg?height=120&width=160&text=血管支架",
  "/placeholder.svg?height=120&width=160&text=冠脉支架",
  // 连接器类
  "/placeholder.svg?height=120&width=160&text=三通阀",
  "/placeholder.svg?height=120&width=160&text=Y型阀",
  "/placeholder.svg?height=120&width=160&text=止血阀",
  "/placeholder.svg?height=120&width=160&text=旋转接头",
  // 其他
  "/placeholder.svg?height=120&width=160&text=栓塞弹簧圈",
  "/placeholder.svg?height=120&width=160&text=封堵器",
  "/placeholder.svg?height=120&width=160&text=滤器",
  "/placeholder.svg?height=120&width=160&text=取栓装置",
  "/placeholder.svg?height=120&width=160&text=穿刺针",
  "/placeholder.svg?height=120&width=160&text=延长管",
]

const productNames = [
  "导引导管", "微导管", "造影导管", "球囊导管", "引流管", "高压管",
  "导引导丝", "微导丝", "亲水导丝", "支撑导丝", "血管支架", "冠脉支架",
  "三通阀", "Y型阀", "止血阀", "旋转接头", "栓塞弹簧圈", "封堵器",
  "滤器", "取栓装置", "穿刺针", "延长管"
]

// 生成模拟产品数据
export function generateProducts(): Product[] {
  const categories = [
    "cardiac", "neuro", "peripheral", "ortho", "urology", "nonvascular", "prefab"
  ]
  
  const products: Product[] = []
  
  for (let i = 0; i < 42; i++) {
    const categoryIndex = Math.floor(i / 6) % categories.length
    const imageIndex = i % productImages.length
    products.push({
      id: `product-${i + 1}`,
      name: productNames[imageIndex],
      image: productImages[imageIndex],
      category: categories[categoryIndex]
    })
  }
  
  return products
}

interface ProductGridProps {
  products: Product[]
  activeCategory: string
  onProductClick?: (product: Product) => void
}

export function ProductGrid({ products, activeCategory, onProductClick }: ProductGridProps) {
  const filteredProducts = activeCategory === "home" 
    ? products 
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-3 p-3 md:p-4">
      {filteredProducts.map((product) => (
        <button
          key={product.id}
          onClick={() => onProductClick?.(product)}
          className={cn(
            "aspect-[4/3] bg-secondary/60 rounded-xl border border-border/30 overflow-hidden",
            "flex items-center justify-center p-3 md:p-4",
            "hover:border-primary/40 hover:shadow-lg hover:bg-card transition-all cursor-pointer",
            "group"
          )}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={160}
              height={120}
              className="object-contain w-full h-full group-hover:scale-105 transition-transform"
            />
          </div>
        </button>
      ))}
    </div>
  )
}
