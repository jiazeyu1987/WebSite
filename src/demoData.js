const palette = {
  navy: "#163873",
  blue: "#2c72e8",
  sky: "#8cc7ff",
  teal: "#2fbf9b",
  violet: "#6f66ff",
  amber: "#f4b844",
  slate: "#29405d",
  white: "#f7fbff"
}

const toBase64 = (bytes) => {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64")
  }

  let binary = ""
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary)
}

const createSilentAudioDataUri = (durationSeconds = 0.35) => {
  const sampleRate = 8000
  const sampleCount = Math.max(1, Math.round(sampleRate * durationSeconds))
  const dataSize = sampleCount * 2
  const buffer = new ArrayBuffer(44 + dataSize)
  const view = new DataView(buffer)

  const writeAscii = (offset, text) => {
    for (let index = 0; index < text.length; index += 1) {
      view.setUint8(offset + index, text.charCodeAt(index))
    }
  }

  writeAscii(0, "RIFF")
  view.setUint32(4, 36 + dataSize, true)
  writeAscii(8, "WAVE")
  writeAscii(12, "fmt ")
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeAscii(36, "data")
  view.setUint32(40, dataSize, true)

  for (let offset = 44; offset < buffer.byteLength; offset += 2) {
    view.setInt16(offset, 0, true)
  }

  return `data:audio/wav;base64,${toBase64(new Uint8Array(buffer))}`
}

const createArtworkDataUri = ({ label, accent, accent2, background }) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 640">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${background}" />
          <stop offset="100%" stop-color="#f9fcff" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.35" />
          <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="960" height="640" rx="42" fill="url(#bg)" />
      <circle cx="760" cy="140" r="140" fill="url(#glow)" />
      <circle cx="180" cy="520" r="210" fill="url(#glow)" />
      <rect x="80" y="76" width="800" height="488" rx="34" fill="rgba(255,255,255,0.55)" stroke="${accent2}" stroke-opacity="0.22" />
      <path d="M148 430C256 312 360 274 520 274c98 0 178 24 292 92" fill="none" stroke="${accent}" stroke-width="22" stroke-linecap="round" />
      <path d="M164 474C278 366 388 332 540 332c108 0 200 30 256 68" fill="none" stroke="${accent2}" stroke-width="12" stroke-linecap="round" stroke-opacity="0.72" />
      <text x="128" y="176" fill="${accent2}" font-family="Segoe UI, Microsoft YaHei, sans-serif" font-size="46" font-weight="700" letter-spacing="3">${label}</text>
      <text x="128" y="236" fill="#35506f" font-family="Segoe UI, Microsoft YaHei, sans-serif" font-size="24" font-weight="600">configuration-driven showcase</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const createMediaSet = (label, accent, accent2, background) => ({
  image: createArtworkDataUri({ label, accent, accent2, background }),
  audioZh: createSilentAudioDataUri(),
  audioEn: createSilentAudioDataUri()
})

const createProduct = (id, name, label, colors, subtitles) => {
  const media = createMediaSet(label, colors.accent, colors.accent2, colors.background)

  return {
    id,
    name,
    image: media.image,
    audioZh: media.audioZh,
    audioEn: media.audioEn,
    subtitleZh: subtitles.zh,
    subtitleEn: subtitles.en
  }
}

const createShowroom = (id, name, label, colors, productDefinitions) => {
  const media = createMediaSet(label, colors.accent, colors.accent2, colors.background)

  return {
    id,
    name,
    image: media.image,
    products: productDefinitions.map((definition) =>
      createProduct(definition.id, definition.name, definition.label, definition.colors, definition.subtitles)
    )
  }
}

const companyMedia = createMediaSet("Company Home", palette.blue, palette.sky, "#e6f1ff")

export const defaultAppConfig = {
  company: {
    name: "北辰医疗科技",
    homeImage: companyMedia.image,
    audioZh: companyMedia.audioZh,
    audioEn: companyMedia.audioEn,
    subtitleZh: "以配置表驱动前端展厅、主页和产品信息。",
    subtitleEn: "Drive the homepage, showrooms, and products from a workbook."
  },
  showrooms: [
    createShowroom("cardiology", "心血管展厅", "Cardiology Hall", {
      accent: palette.blue,
      accent2: palette.sky,
      background: "#eaf4ff"
    }, [
      {
        id: "cardio-guidewire",
        name: "导丝系统",
        label: "Guidewire",
        colors: { accent: palette.blue, accent2: palette.sky, background: "#f0f7ff" },
        subtitles: {
          zh: "用于血管内路径建立的中文讲解字幕。",
          en: "English subtitle for vascular access guidance."
        }
      },
      {
        id: "cardio-sheath",
        name: "鞘管组件",
        label: "Sheath",
        colors: { accent: palette.teal, accent2: palette.blue, background: "#edfdf8" },
        subtitles: {
          zh: "用于稳定输送与通路维持的中文讲解字幕。",
          en: "English subtitle for stable delivery support."
        }
      }
    ]),
    createShowroom("neuro", "神经介入展厅", "Neuro Hall", {
      accent: palette.violet,
      accent2: palette.sky,
      background: "#f2efff"
    }, [
      {
        id: "neuro-microcatheter",
        name: "微导管",
        label: "Microcatheter",
        colors: { accent: palette.violet, accent2: palette.blue, background: "#f6f4ff" },
        subtitles: {
          zh: "适用于远端精细通路的中文讲解字幕。",
          en: "English subtitle for distal navigation."
        }
      },
      {
        id: "neuro-support",
        name: "支撑导管",
        label: "Support",
        colors: { accent: palette.blue, accent2: palette.violet, background: "#eef4ff" },
        subtitles: {
          zh: "用于提供支撑与稳定性的中文讲解字幕。",
          en: "English subtitle for support and stability."
        }
      }
    ]),
    createShowroom("peripheral", "外周介入展厅", "Peripheral Hall", {
      accent: palette.teal,
      accent2: palette.sky,
      background: "#ecfff9"
    }, [
      {
        id: "peripheral-balloon",
        name: "球囊扩张导管",
        label: "Balloon",
        colors: { accent: palette.teal, accent2: palette.blue, background: "#effffa" },
        subtitles: {
          zh: "用于扩张狭窄部位的中文讲解字幕。",
          en: "English subtitle for dilation procedures."
        }
      },
      {
        id: "peripheral-delivery",
        name: "输送系统",
        label: "Delivery",
        colors: { accent: palette.blue, accent2: palette.teal, background: "#eef9ff" },
        subtitles: {
          zh: "用于传递与释放器械的中文讲解字幕。",
          en: "English subtitle for device delivery."
        }
      }
    ]),
    createShowroom("support", "器械配套展厅", "Support Hall", {
      accent: palette.amber,
      accent2: palette.violet,
      background: "#fff7e8"
    }, [
      {
        id: "support-connector",
        name: "连接件",
        label: "Connector",
        colors: { accent: palette.amber, accent2: palette.violet, background: "#fff9ee" },
        subtitles: {
          zh: "用于系统连接与组装的中文讲解字幕。",
          en: "English subtitle for system connection."
        }
      },
      {
        id: "support-accessory",
        name: "术中耗材",
        label: "Accessory",
        colors: { accent: palette.violet, accent2: palette.amber, background: "#fdf3ff" },
        subtitles: {
          zh: "用于术中补充与配套的中文讲解字幕。",
          en: "English subtitle for in-procedure accessories."
        }
      }
    ])
  ]
}

