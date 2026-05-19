"use client"

import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
  shortName?: string
  icon: React.ReactNode
}

// 自定义SVG图标组件
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 10.5L12 3l9 7.5v10a1 1 0 01-1 1H4a1 1 0 01-1-1v-10z" />
    </svg>
  )
}

function CardiacIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.04 3 12 4 12 4C12 4 12.96 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z" />
      <path d="M12 6C12 6 11 8 9 10C7 12 7 14 9 16" strokeLinecap="round" />
    </svg>
  )
}

function NeuroIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="5" />
      <path d="M7 13C4 14 3 17 3 20" strokeLinecap="round" />
      <path d="M17 13C20 14 21 17 21 20" strokeLinecap="round" />
      <path d="M12 13V20" strokeLinecap="round" />
      <circle cx="7" cy="6" r="1.5" />
      <circle cx="17" cy="6" r="1.5" />
    </svg>
  )
}

function PeripheralIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3C12 3 8 8 8 12C8 14 10 18 10 21" strokeLinecap="round" />
      <path d="M12 3C12 3 16 8 16 12C16 14 14 18 14 21" strokeLinecap="round" />
      <path d="M6 10C8 11 10 11 12 11C14 11 16 11 18 10" strokeLinecap="round" />
    </svg>
  )
}

function OrthoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 3L8 10C8 11 7 12 6 13L4 16C3 18 4 20 6 21H18C20 20 21 18 20 16L18 13C17 12 16 11 16 10V3" strokeLinecap="round" />
      <path d="M8 3H16" strokeLinecap="round" />
      <ellipse cx="12" cy="14" rx="3" ry="4" />
    </svg>
  )
}

function UrologyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3L12 8" strokeLinecap="round" />
      <ellipse cx="12" cy="13" rx="6" ry="7" />
      <path d="M9 11C9 11 10 13 12 13C14 13 15 11 15 11" strokeLinecap="round" />
    </svg>
  )
}

function NonVascularIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4V9" strokeLinecap="round" />
      <path d="M12 15V20" strokeLinecap="round" />
      <path d="M4 12H9" strokeLinecap="round" />
      <path d="M15 12H20" strokeLinecap="round" />
    </svg>
  )
}

function PrefabIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3L20 8V16L12 21L4 16V8L12 3Z" />
      <path d="M12 12L20 8" strokeLinecap="round" />
      <path d="M12 12L4 8" strokeLinecap="round" />
      <path d="M12 12V21" strokeLinecap="round" />
    </svg>
  )
}

const categories: Category[] = [
  { id: "home", name: "首页", icon: <HomeIcon className="w-5 h-5" /> },
  { id: "cardiac", name: "心内介入类", icon: <CardiacIcon className="w-5 h-5" /> },
  { id: "neuro", name: "神经介入类", icon: <NeuroIcon className="w-5 h-5" /> },
  { id: "peripheral", name: "外周介入类", icon: <PeripheralIcon className="w-5 h-5" /> },
  { id: "ortho", name: "骨科介入类", icon: <OrthoIcon className="w-5 h-5" /> },
  { id: "urology", name: "泌尿介入类", icon: <UrologyIcon className="w-5 h-5" /> },
  { id: "nonvascular", name: "非血管介入及其他", shortName: "非血管介入\n及其他", icon: <NonVascularIcon className="w-5 h-5" /> },
  { id: "prefab", name: "医疗预制件", icon: <PrefabIcon className="w-5 h-5" /> },
]

interface CategoryNavProps {
  activeCategory: string
  onCategoryChange: (id: string) => void
}

export function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <nav className="bg-card border-b border-border/50 px-2 py-2">
      <div className="flex items-stretch justify-between">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex flex-col items-center justify-start flex-1 px-1 py-1.5 rounded-lg transition-all",
              activeCategory === category.id
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-full mb-1 transition-colors",
              activeCategory === category.id 
                ? "bg-primary/10" 
                : "bg-transparent"
            )}>
              {category.icon}
            </div>
            <span className="text-[10px] leading-tight font-medium text-center whitespace-pre-line">
              {category.shortName || category.name}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
