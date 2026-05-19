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

// 产品图片占位
const productImages = [
  "/placeholder.svg?height=60&width=80&text=导管",
  "/placeholder.svg?height=60&width=80&text=导丝",
  "/placeholder.svg?height=60&width=80&text=支架",
  "/placeholder.svg?height=60&width=80&text=球囊",
  "/placeholder.svg?height=60&width=80&text=三通",
  "/placeholder.svg?height=60&width=80&text=Y阀",
  "/placeholder.svg?height=60&width=80&text=止血阀",
  "/placeholder.svg?height=60&width=80&text=连接器",
  "/placeholder.svg?height=60&width=80&text=弹簧圈",
  "/placeholder.svg?height=60&width=80&text=封堵器",
  "/placeholder.svg?height=60&width=80&text=滤器",
  "/placeholder.svg?height=60&width=80&text=取栓器",
  "/placeholder.svg?height=60&width=80&text=穿刺针",
  "/placeholder.svg?height=60&width=80&text=延长管",
  "/placeholder.svg?height=60&width=80&text=高压管",
  "/placeholder.svg?height=60&width=80&text=输送器",
  "/placeholder.svg?height=60&width=80&text=微导管",
  "/placeholder.svg?height=60&width=80&text=造影管",
]

const productNames = [
  "导引导管", "微导管", "造影导管", "球囊导管", "引流管", "高压管",
  "导引导丝", "微导丝", "亲水导丝", "支撑导丝", "血管支架", "冠脉支架",
  "三通阀", "Y型阀", "止血阀", "旋转接头", "栓塞弹簧圈", "封堵器",
  "滤器", "取栓装置", "穿刺针", "延长管", "造影剂注射器", "保护伞"
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
      name: productNames[i % productNames.length],
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
    <div className="grid grid-cols-6 gap-1.5 p-2">
      {filteredProducts.map((product) => (
        <button
          key={product.id}
          onClick={() => onProductClick?.(product)}
          className={cn(
            "aspect-[4/3] bg-secondary/40 rounded-lg overflow-hidden",
            "flex items-center justify-center p-1.5",
            "hover:bg-secondary/60 active:scale-95 transition-all"
          )}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={80}
              height={60}
              className="object-contain w-full h-full"
            />
          </div>
        </button>
      ))}
    </div>
  )
}
