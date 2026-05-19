"use client"

import { cn } from "@/lib/utils"

interface AudioPanelProps {
  className?: string
}

// 音频波形图标组件
function AudioWaveIcon() {
  return (
    <div className="flex items-center gap-0.5 h-5">
      {[1, 2, 3, 4, 5, 4, 3].map((height, i) => (
        <div
          key={i}
          className="w-0.5 bg-primary/70 rounded-full"
          style={{
            height: `${height * 4}px`,
            animation: `audioWave 1s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  )
}

export function AudioPanel({ className }: AudioPanelProps) {
  return (
    <div className={cn(
      "bg-card rounded-2xl border border-border/50 p-5 md:p-6 shadow-sm",
      className
    )}>
      <style jsx>{`
        @keyframes audioWave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.5); }
        }
      `}</style>
      
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-primary">
          语音讲解
        </h3>
        <AudioWaveIcon />
      </div>
      
      <div className="space-y-4 text-sm leading-relaxed text-foreground/85">
        <p>
          欢迎来到本公司的产品展示平台。本平台为您呈现我们在介入医疗领域的丰富产品线与创新成果。
        </p>
        
        <p>
          我们专注于为临床提供安全、可靠、高效的解决方案，覆盖心内、神经、外周、骨科、泌尿及非血管介入等多个领域，满足不同临床场景的多样化需求。
        </p>
        
        <p>
          我们的产品以先进的设计理念、严苛的工艺标准和完善的质量管理体系为基础，致力于提高手术的精准性与安全性，助力医生实现更优的治疗效果，改善患者预后。
        </p>
        
        <p>
          在本平台，您可以浏览各类产品的高清展示，了解产品的结构特点与应用场景。点击任意产品，即可收听详细的语音介绍，帮助您全面深入地了解产品信息。
        </p>
        
        <p>
          我们始终坚持以客户为中心，不断推进技术创新与产品优化，持续为全球医疗机构提供值得信赖的产品与服务。
        </p>
        
        <p className="italic text-muted-foreground pt-2">
          感谢您的关注与支持，期待与您携手，共同推动介入医疗事业的发展与进步。
        </p>
      </div>
    </div>
  )
}
