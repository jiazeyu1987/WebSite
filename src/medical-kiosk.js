const iconMap = {
  home: `
    <svg viewBox="0 0 48 48" aria-hidden="true" fill="none">
      <path d="M11 22.5 24 12l13 10.5" />
      <path d="M15.5 20.5V36h17V20.5" />
    </svg>
  `,
  heart: `
    <svg viewBox="0 0 48 48" aria-hidden="true" fill="none">
      <path d="M25 10c6.9 0 12.5 5.6 12.5 12.5S31.9 35 25 35 12.5 29.4 12.5 22.5" />
      <path d="M20.5 13.5A12.5 12.5 0 0 0 12.5 22.5" />
      <path d="M25 8v5" />
      <path d="M17.8 11.2l2.2 3" />
      <path d="M19.5 23h5l1.8-4.2 2.7 8 2.5-4.1H35" />
    </svg>
  `,
  brain: `
    <svg viewBox="0 0 48 48" aria-hidden="true" fill="none">
      <path d="M16.5 16.5c0-4.3 3.4-7.5 7.5-7.5 2.1 0 4 .8 5.3 2.3a6.6 6.6 0 0 1 8.2 6.4c0 1.8-.6 3.4-1.7 4.7 1.6 1.3 2.4 3.1 2.4 5.3 0 4.6-3.6 8-8.2 8H19.8c-5.1 0-8.8-3.5-8.8-8.3 0-2.3.8-4.1 2.5-5.4-1.1-1.2-1.7-2.8-1.7-4.6 0-4.1 3.2-7.2 7.3-7.2" />
      <path d="M24 14v20" />
      <path d="M18.5 18.5c2 0 3.5 1.5 3.5 3.4" />
      <path d="M29.5 17c-2 0-3.5 1.4-3.5 3.3" />
      <path d="M18.5 26.5c2 0 3.5 1.4 3.5 3.3" />
      <path d="M29.5 25c-2 0-3.5 1.4-3.5 3.3" />
    </svg>
  `,
  profile: `
    <svg viewBox="0 0 48 48" aria-hidden="true" fill="none">
      <path d="M19 9.5c7.8 0 13.5 5.7 13.5 13.4 0 4.2-1.6 7.8-4.9 10.4l3.2 7.2-8.1-4.1H19c-7.2 0-12.5-5.2-12.5-12.3C6.5 15.2 11.7 9.5 19 9.5Z" />
      <path d="M21.2 17.2c2.8 1.4 4.5 4 4.5 7.2 0 2.6-1.3 5-3.4 6.6" />
    </svg>
  `,
  bone: `
    <svg viewBox="0 0 48 48" aria-hidden="true" fill="none">
      <path d="M14.5 16.2a4.8 4.8 0 1 1-3.4-8.2c2 0 3.7 1.1 4.5 2.9l16.2 3.9A4.9 4.9 0 1 1 31.8 33l-16.3 3.9a4.9 4.9 0 1 1-4.4-6.9c2 0 3.7 1.1 4.4 2.8L33 29" />
    </svg>
  `,
  kidney: `
    <svg viewBox="0 0 48 48" aria-hidden="true" fill="none">
      <path d="M18.5 10.5c-4.8 0-8 4.3-8 10.1 0 7.8 3.9 13.9 9.7 13.9 2.5 0 4.5-.9 5.8-2.5V20c0-5.6-3.1-9.5-7.5-9.5Z" />
      <path d="M29.5 10.5c4.8 0 8 4.3 8 10.1 0 7.8-3.9 13.9-9.7 13.9-2.5 0-4.5-.9-5.8-2.5V20c0-5.6 3.1-9.5 7.5-9.5Z" />
      <path d="M24 18v18.5" />
    </svg>
  `,
  bulb: `
    <svg viewBox="0 0 48 48" aria-hidden="true" fill="none">
      <path d="M24 10.5c6.6 0 11.7 4.9 11.7 11.5 0 4.3-2.3 7.8-5.7 9.9-1.8 1.1-2.7 2.8-2.7 4.8h-6.7c0-2-1.1-3.7-2.8-4.8-3.2-2-5.4-5.5-5.4-9.8 0-6.6 5.1-11.6 11.6-11.6Z" />
      <path d="M20.5 36.7h7" />
      <path d="M19.2 40.2h9.6" />
      <path d="M24 16.2v6.7" />
      <path d="M20.4 23.8h7.2" />
    </svg>
  `,
  microscope: `
    <svg viewBox="0 0 48 48" aria-hidden="true" fill="none">
      <path d="M19.5 11.5 28 20" />
      <path d="M15 17.5 29 31.5" />
      <path d="M26.5 11.5c3.2 0 5.3 2.2 5.3 5.3V19" />
      <path d="M19.5 30.2a8.4 8.4 0 1 0 16.8 0V27" />
      <path d="M8.5 39h31" />
      <path d="M24.5 33H14" />
      <path d="M28.5 20 34.8 13.8" />
    </svg>
  `
}

const palette = {
  blue: "#1b5ad9",
  sky: "#6bb8ff",
  green: "#24b06d",
  gold: "#f5bc3b",
  graphite: "#21314f",
  silver: "#94a5c2",
  purple: "#7c64ff"
}

const sharedSpecs = [
  { kind: "sheath", stroke: palette.blue, accent: palette.sky },
  { kind: "loop", stroke: palette.green, accent: palette.sky },
  { kind: "catheter", stroke: palette.graphite, accent: palette.blue },
  { kind: "kit", stroke: palette.sky, accent: palette.purple },
  { kind: "balloon", stroke: palette.sky, accent: palette.blue },
  { kind: "loop", stroke: palette.green, accent: palette.gold },
  { kind: "wire", stroke: palette.sky, accent: palette.blue },
  { kind: "catheter", stroke: palette.gold, accent: palette.sky },
  { kind: "arc", stroke: palette.blue, accent: palette.green },
  { kind: "balloon", stroke: palette.sky, accent: palette.blue },
  { kind: "stent", stroke: palette.silver, accent: palette.blue },
  { kind: "coil", stroke: palette.silver, accent: palette.blue },
  { kind: "wire", stroke: palette.blue, accent: palette.gold },
  { kind: "line-kit", stroke: palette.sky, accent: palette.green },
  { kind: "connector", stroke: palette.sky, accent: palette.blue },
  { kind: "ring", stroke: palette.silver, accent: palette.blue }
]

const baseProductNames = [
  "导入鞘套组",
  "亲水导管",
  "塑形导管",
  "输送组件",
  "球囊扩张导管",
  "微导丝",
  "支架系统",
  "血栓回收装置",
  "封堵器组件",
  "三通连接件",
  "压力延长管",
  "冲洗回路"
]

const makeProducts = (prefix, names, specOffset = 0) =>
  Array.from({ length: 3 }, (_, batchIndex) =>
    names.map((name, index) => ({
      id: `${prefix}-${batchIndex + 1}-${index + 1}`,
      name,
      art: sharedSpecs[(index + batchIndex * 3 + specOffset) % sharedSpecs.length]
    }))
  ).flat()

export const kioskCategories = [
  {
    id: "home",
    label: "首页",
    icon: "home",
    voiceTitle: "语言讲解",
    voiceCopy: [
      "欢迎来到本公司的产品展示平台。本平台为您呈现我们在介入医疗领域的丰富产品线与创新成果。",
      "我们专注于为临床提供安全、可靠、高效的解决方案，覆盖心内、神经、外周、骨科、泌尿及非血管介入等多个领域，满足不同临床场景的多样化需求。",
      "我们的产品以先进的设计理念、严格的工艺标准和完善的质量管理体系为基础，致力于提高手术的精准性与安全性，助力医生实现更优的治疗效果，改善患者预后。",
      "在本平台，您可以浏览各类产品的高清展示，了解产品的结构特点与应用场景。点击任意产品，即可收听详细的语音介绍，帮助您全面深入地了解产品信息。",
      "我们始终坚持以客户为中心，不断推进技术创新与产品优化，持续为全球医疗机构提供值得信赖的产品与服务。",
      "感谢您的关注与支持，期待与您携手，共同推动介入医疗事业的发展与进步。"
    ],
    products: makeProducts("home", baseProductNames, 0)
  },
  {
    id: "cardiology",
    label: "心内介入类",
    icon: "heart",
    voiceTitle: "语言讲解",
    voiceCopy: [
      "心内介入类产品强调轨迹稳定性、推送响应与末端精控，适合展示导管、导丝、球囊及连接附件的完整组合关系。",
      "页面切换后保留统一的视觉框架，只替换产品阵列与说明文本，从而让不同学科目录仍然维持一致的品牌观感。",
      "如果后续补齐真实产品摄影，本模块可以直接替换卡片中的示意图层，而不需要重写切换逻辑。",
      "在演示场景中，这类页面尤其适合配合销售讲稿、展会触屏和产品培训材料一起使用。",
      "对于复杂临床路径，统一的展示格式也更便于快速比较同一产品家族中的不同器械。"
    ],
    products: makeProducts("cardiology", baseProductNames, 2)
  },
  {
    id: "neurology",
    label: "神经介入类",
    icon: "brain",
    voiceTitle: "语言讲解",
    voiceCopy: [
      "神经介入目录更强调柔顺过弯、远端显影与精细输送，因此在视觉上保持细线条、弧线器械与高洁净底色的组合。",
      "本模块用程序生成的线稿模拟微导管、取栓支架、弹簧圈和输送系统，目的是先验证版式、信息节奏与切换体验。",
      "缺失的真实资产会在交付说明里单列，避免把演示素材误当作可直接投产的正式商品图。",
      "在正式资源到位后，这里的卡片位、说明栏和顶部分类结构都可以直接复用。"
    ],
    products: makeProducts("neurology", baseProductNames, 4)
  },
  {
    id: "peripheral",
    label: "外周介入类",
    icon: "profile",
    voiceTitle: "语言讲解",
    voiceCopy: [
      "外周介入页面延续蓝白底色，但通过更长的导丝与支架形态增强器械尺度感，适合演示下肢、肿瘤或通路相关器械组合。",
      "右侧讲解面板可承接展厅播报、触屏语音脚本、销售讲稿或培训摘要，在结构上与左侧产品矩阵解耦。",
      "整个页面的交互核心是分类切换和信息联动，因此即使以后接入真实 CMS，也可以沿用这一前端骨架。",
      "如果配合真实产品图与音频素材，这一页可以直接用于客户接待或展厅导览。"
    ],
    products: makeProducts("peripheral", baseProductNames, 1)
  },
  {
    id: "orthopedic",
    label: "骨科介入类",
    icon: "bone",
    voiceTitle: "语言讲解",
    voiceCopy: [
      "骨科介入类保留统一的页面语言，同时通过更稳重的线条密度与器械轮廓，表达穿刺、输送与支撑类组件的专业感。",
      "卡片使用统一圆角和淡阴影，可以保证图片资源替换前后版面节奏稳定，不会因为单张素材尺寸不同而跳动。",
      "这一版更适合做风格验证与交互演示，正式上线前建议补充真实产品渲染图、编号体系和分类层级说明。"
    ],
    products: makeProducts("orthopedic", baseProductNames, 6)
  },
  {
    id: "urology",
    label: "泌尿介入类",
    icon: "kidney",
    voiceTitle: "语言讲解",
    voiceCopy: [
      "泌尿介入类延续顶部导航和卡片矩阵结构，适合展示导管、导丝、取石相关附件等轻量型器械的组合。",
      "页面整体避免厚重容器和夸张装饰，主要依靠留白、渐变、轻边框和高对比图标来还原参考图的展厅屏风格。",
      "后续如果需要加入二级切换、筛选或详情抽屉，也可以在不破坏当前主视图的前提下继续扩展。"
    ],
    products: makeProducts("urology", baseProductNames, 3)
  },
  {
    id: "nonvascular",
    label: "非血管介入及其他",
    icon: "bulb",
    voiceTitle: "语言讲解",
    voiceCopy: [
      "非血管介入及其他模块适合作为多学科集合入口，因此文案采用更概括的介绍方式，产品阵列也更偏综合示意。",
      "演示中保持了同一套网格和面板比例，以便快速比较不同分类之间的信息密度和可视节奏。",
      "如果后面补齐真实 SKU 列表、主图和分类图标，这一页可以较低成本升级为更接近正式发布状态的版本。"
    ],
    products: makeProducts("nonvascular", baseProductNames, 5)
  },
  {
    id: "prefabrication",
    label: "医疗预制件",
    icon: "microscope",
    voiceTitle: "语言讲解",
    voiceCopy: [
      "医疗预制件页面偏向展示零部件、接头与基础组件，因此卡片内容上更强调接口、管路和装配关系的线性表达。",
      "右侧文案可以切换成能力介绍、制造工艺、材料体系或代工服务说明，适合作为官网中的业务能力展示模块。",
      "目前 demo 只复刻了视觉语气与交互结构，尚未绑定真实产品素材和企业品牌资产，这部分会在缺失清单中明确列出。"
    ],
    products: makeProducts("prefabrication", baseProductNames, 7)
  }
]

const createProductArt = ({ kind, stroke, accent }) => {
  const base = `stroke="${stroke}" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"`
  const accentStroke = `stroke="${accent}" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"`

  const artMap = {
    sheath: `
      <line x1="34" y1="78" x2="214" y2="78" ${base} />
      <rect x="16" y="68" width="20" height="20" rx="4" stroke="${accent}" fill="rgba(107,184,255,0.18)" stroke-width="3.2" />
    `,
    loop: `
      <path d="M176 36c-34 20-74 84-30 86 30 2 54-34 66-82" ${base} />
      <circle cx="184" cy="38" r="4" fill="${accent}" />
    `,
    catheter: `
      <path d="M26 100C76 44 110 28 202 36" ${base} />
      <path d="M202 36c10 1 18 5 22 8" ${accentStroke} />
    `,
    kit: `
      <line x1="50" y1="34" x2="50" y2="114" ${base} />
      <line x1="94" y1="28" x2="94" y2="120" ${accentStroke} />
      <line x1="138" y1="40" x2="138" y2="108" ${base} />
      <line x1="182" y1="34" x2="182" y2="114" ${accentStroke} />
      <line x1="226" y1="48" x2="226" y2="102" ${base} />
      <circle cx="50" cy="58" r="6" fill="${accent}" />
      <circle cx="138" cy="52" r="6" fill="${accent}" />
    `,
    balloon: `
      <line x1="24" y1="88" x2="214" y2="54" ${base} />
      <ellipse cx="126" cy="70" rx="46" ry="18" stroke="${accent}" fill="rgba(107,184,255,0.12)" stroke-width="3.2" />
    `,
    wire: `
      <line x1="22" y1="84" x2="220" y2="84" ${base} />
      <circle cx="36" cy="84" r="5" fill="${accent}" />
      <circle cx="86" cy="84" r="3.5" fill="${accent}" />
      <circle cx="136" cy="84" r="3.5" fill="${accent}" />
      <circle cx="186" cy="84" r="3.5" fill="${accent}" />
    `,
    stent: `
      <path d="M36 94 84 48l48 46 48-46 48 46" ${base} />
      <path d="M36 60 84 106l48-46 48 46 48-46" ${accentStroke} />
      <line x1="24" y1="84" x2="236" y2="70" stroke="${stroke}" stroke-width="2" stroke-linecap="round" />
    `,
    coil: `
      <path d="M72 76c0-23 18-42 42-42 24 0 42 19 42 42 0 23-18 42-42 42-24 0-42-19-42-42Z" ${base} />
      <path d="M106 46c12 8 22 24 22 42 0 18-10 34-22 42" ${accentStroke} />
      <line x1="156" y1="76" x2="216" y2="76" ${base} />
    `,
    arc: `
      <path d="M42 98c24-50 70-70 152-42" ${base} />
      <path d="M194 56c16 6 24 14 30 22" ${accentStroke} />
    `,
    "line-kit": `
      <line x1="32" y1="78" x2="216" y2="78" ${base} />
      <rect x="60" y="66" width="24" height="24" rx="4" stroke="${accent}" fill="rgba(126,229,193,0.15)" stroke-width="3.2" />
      <rect x="120" y="68" width="26" height="20" rx="4" stroke="${stroke}" fill="rgba(29,90,217,0.08)" stroke-width="3.2" />
      <rect x="176" y="62" width="20" height="32" rx="4" stroke="${accent}" fill="rgba(126,229,193,0.15)" stroke-width="3.2" />
    `,
    connector: `
      <line x1="28" y1="78" x2="220" y2="78" ${base} />
      <rect x="82" y="62" width="26" height="32" rx="5" stroke="${accent}" fill="rgba(107,184,255,0.16)" stroke-width="3.2" />
      <rect x="144" y="66" width="18" height="24" rx="4" stroke="${stroke}" fill="rgba(29,90,217,0.12)" stroke-width="3.2" />
    `,
    ring: `
      <ellipse cx="124" cy="76" rx="66" ry="42" ${base} />
      <ellipse cx="124" cy="76" rx="48" ry="28" ${accentStroke} />
    `
  }

  return `
    <svg class="kiosk-product-art" viewBox="0 0 248 152" aria-hidden="true" role="img">
      ${artMap[kind] ?? artMap.sheath}
    </svg>
  `
}

const createTabsMarkup = (categories, activeCategoryId) =>
  categories
    .map(
      (category) => `
        <button
          class="kiosk-tab${category.id === activeCategoryId ? " is-active" : ""}"
          type="button"
          data-tab-id="${category.id}"
          aria-pressed="${category.id === activeCategoryId ? "true" : "false"}"
        >
          <span class="kiosk-tab__icon">${iconMap[category.icon]}</span>
          <span class="kiosk-tab__label">${category.label}</span>
        </button>
      `
    )
    .join("")

const createCardsMarkup = (products) =>
  products
    .map(
      (product) => `
        <article class="kiosk-card" data-product-card aria-label="${product.name}">
          <div class="kiosk-card__glow"></div>
          <div class="kiosk-card__art">${createProductArt(product.art)}</div>
        </article>
      `
    )
    .join("")

const createVoiceMarkup = (category) =>
  `
    <aside class="kiosk-voice" data-active-category-id="${category.id}">
      <div class="kiosk-voice__header">
        <h2 class="kiosk-voice__title">${category.voiceTitle}</h2>
        <div class="kiosk-voice__wave" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
      <div class="kiosk-voice__copy" data-voice-copy>
        ${category.voiceCopy.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </div>
    </aside>
  `

const createMarkup = (categories, activeCategoryId) => {
  const activeCategory = categories.find((category) => category.id === activeCategoryId) ?? categories[0]

  return `
    <div class="kiosk-shell" data-reference-layout="medical-kiosk">
      <header class="kiosk-header">
        <div class="kiosk-header__halo kiosk-header__halo--left"></div>
        <div class="kiosk-header__halo kiosk-header__halo--right"></div>
        <nav class="kiosk-tabs" aria-label="产品分类">
          ${createTabsMarkup(categories, activeCategory.id)}
        </nav>
      </header>
      <main class="kiosk-content" data-responsive-layout="landscape-sidebar portrait-bottom-panel">
        <section class="kiosk-gallery" aria-label="${activeCategory.label}">
          <div class="kiosk-gallery__grid">
            ${createCardsMarkup(activeCategory.products)}
          </div>
        </section>
        ${createVoiceMarkup(activeCategory)}
      </main>
    </div>
  `
}

export const createMedicalKioskApp = (root, options = {}) => {
  if (!root) {
    throw new Error("Kiosk root element is required.")
  }

  const categories = options.categories ?? kioskCategories
  const initialCategoryId = categories[0]?.id

  if (!initialCategoryId) {
    throw new Error("At least one kiosk category is required.")
  }

  const state = {
    activeCategoryId: initialCategoryId
  }

  const render = () => {
    root.innerHTML = createMarkup(categories, state.activeCategoryId)
  }

  root.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target.closest("[data-tab-id]") : null

    if (!(target instanceof HTMLElement)) {
      return
    }

    state.activeCategoryId = target.dataset.tabId
    render()
  })

  render()

  return {
    getActiveCategoryId: () => state.activeCategoryId
  }
}
