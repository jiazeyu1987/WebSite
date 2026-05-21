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

const createCategory = (id, title, specOffset, voiceCopy) => ({
  id,
  title,
  voiceTitle: "语音讲解",
  voiceCopy,
  products: makeProducts(id, baseProductNames, specOffset)
})

export const kioskCategories = [
  createCategory("home", "首页", 0, [
    "欢迎来到产品展示平台。这里汇集了公司在介入医疗领域的核心器械与典型组合方案。",
    "页面通过统一的蓝白医疗语气和卡片矩阵，帮助来访者快速浏览产品品类、轮廓特征和重点讲解路径。",
    "点击任意一张卡片后，可进入独立详情页查看图文说明，并从顶部返回按钮继续浏览其他器械。"
  ]),
  createCategory("cardiology", "心内介入展厅", 2, [
    "心内介入展厅强调导管、导丝、球囊与配套器械的整体协同关系。",
    "展示视图保持统一结构，便于在接待、培训和会场演示中快速切换不同产品。",
    "后续如需替换成真实产品图片与讲解素材，可直接沿用这一套前端骨架。"
  ]),
  createCategory("neurology", "神经介入展厅", 4, [
    "神经介入展厅更强调柔顺通过、远端显影与精细输送。",
    "页面用更纤细的器械线稿表达产品路径，帮助访客快速理解器械定位。",
    "在正式素材到位后，这一页可以直接承接客户讲解与内部培训。"
  ]),
  createCategory("peripheral", "外周介入展厅", 1, [
    "外周介入展厅延续浅蓝医疗语气，但通过更长的器械比例强化通路感。",
    "右侧讲解区适合承接展厅播报、触屏讲稿或销售接待摘要。",
    "后续接入真实 CMS 时，当前交互骨架也可以继续复用。"
  ]),
  createCategory("orthopedic", "骨科介入展厅", 6, [
    "骨科介入展厅保持统一页面语言，同时通过更稳重的线条密度表达器械支撑感。",
    "卡片区采用一致圆角和淡阴影，能在替换真实素材前先稳定版式节奏。",
    "这一版尤其适合做风格校准与讲解节奏验证。"
  ]),
  createCategory("urology", "泌尿介入展厅", 3, [
    "泌尿介入展厅适合展示导管、导丝、取石与配套附件的组合关系。",
    "页面整体避免厚重装饰，更依赖留白、细边框和高对比器械图形建立专业感。",
    "如需扩展筛选或二级切换，也能在不破坏当前主视图的前提下继续增加。"
  ]),
  createCategory("nonvascular", "非血管介入及其他展厅", 5, [
    "非血管介入及其他展厅更适合作为多学科集合入口，因此文案更偏概览。",
    "统一网格和面板比例能帮助访客快速比较不同分组的信息密度。",
    "如果后续补齐真实 SKU、主图和分类图形，这一页可以较低成本升级为正式版本。"
  ]),
  createCategory("prefabrication", "医疗预制件展厅", 7, [
    "医疗预制件展厅更偏向展示零部件、接头与基础组件的组合方式。",
    "右侧文案区可以切换成制造工艺、材料体系或代工服务说明。",
    "当前版本先复刻视觉语气与交互结构，后续再接入真实企业素材即可。"
  ])
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

const createCardsMarkup = (products) =>
  products
    .map(
      (product) => `
        <article class="kiosk-card" data-product-card data-product-id="${product.id}" aria-label="${product.name}">
          <div class="kiosk-card__glow"></div>
          <div class="kiosk-card__art">${createProductArt(product.art)}</div>
        </article>
      `
    )
    .join("")

const artKindLabels = {
  sheath: "导入鞘",
  loop: "环形导丝",
  catheter: "导管",
  kit: "组合套件",
  balloon: "球囊器械",
  wire: "导丝",
  stent: "支架系统",
  coil: "线圈系统",
  arc: "弧形导管",
  "line-kit": "连接组件",
  connector: "连接阀组",
  ring: "环形组件"
}

const getArtKindLabel = (kind) => artKindLabels[kind] ?? kind

const buildProductSummaryLines = (category, product) => [
  `${product.name} 以 ${getArtKindLabel(product.art.kind)} 的轻量化轮廓作为主视觉，适合在 ${category.title} 中用于客户接待、培训讲解与触屏导览。`
]

const buildProductTranscript = (category, product) => [
  `${product.name} 是 ${category.title} 中的重点展示器械，详情页延续首页的浅蓝医疗氛围，以居中的主图呈现产品轮廓与结构节奏。`,
  `${getArtKindLabel(product.art.kind)} 示意图采用简洁的线性表达方式，强化器械路径、末端结构和整体比例关系，让浏览者在远距离观看时也能快速识别产品类型。`,
  "左侧详情区承接图文说明与讲解控制，右侧则保持当前展厅级语音讲解栏不变，让访问者在查看产品细节时仍能保留场馆级讲解上下文。"
]

const buildProductTags = (category, product) => [category.title, `${getArtKindLabel(product.art.kind)}示意图`, "图文讲解联动"]

const createWaveMarkup = (className = "kiosk-voice__wave") => `
  <div class="${className}" aria-hidden="true">
    <span></span><span></span><span></span><span></span><span></span><span></span>
  </div>
`

const createVoiceMarkup = (category) => `
  <aside class="kiosk-voice" data-active-category-id="${category.id}">
    <div class="kiosk-voice__header">
      <h2 class="kiosk-voice__title">${category.voiceTitle}</h2>
      ${createWaveMarkup()}
    </div>
    <div class="kiosk-voice__copy" data-voice-copy>
      ${category.voiceCopy.map((paragraph) => `<p>${paragraph}</p>`).join("")}
    </div>
  </aside>
`

const getMutedStateCopy = (state) => (state.isMuted ? "已静音" : "已开声")

const getSpeakingStateCopy = (state) => {
  if (state.isMuted && state.isSpeaking) {
    return "已静音，仅显示文字"
  }

  if (state.isMuted) {
    return "已静音，点击播放语音讲解"
  }

  if (state.speechStatus === "unsupported") {
    return "当前浏览器不支持语音讲解"
  }

  if (state.isSpeaking) {
    return "正在播放语音讲解"
  }

  return "点击播放语音讲解"
}

const createDetailMarkup = (category, product, state) => {
  const summaryLines = buildProductSummaryLines(category, product)
  const transcript = buildProductTranscript(category, product)
  const tags = buildProductTags(category, product)

  return `
    <section class="kiosk-detail" data-product-detail-id="${product.id}">
      <header class="kiosk-detail__header">
        <button class="kiosk-detail__back" type="button" data-back-to-gallery>返回展厅</button>
        <p class="kiosk-detail__state" data-speaking-state>${getSpeakingStateCopy(state)}</p>
      </header>
      <article class="kiosk-detail__hero">
        <div class="kiosk-detail__hero-stage">
          <div class="kiosk-detail__hero-glow"></div>
          <div class="kiosk-detail__art" data-product-hero-art>${createProductArt(product.art)}</div>
        </div>
        <div class="kiosk-detail__copy">
          <p class="kiosk-detail__eyebrow">产品详情 / ${category.title}</p>
          <h2 class="kiosk-detail__title" data-product-detail-title>${product.name}</h2>
          <div class="kiosk-detail__summary-block">
            ${summaryLines.map((line) => `<p class="kiosk-detail__summary">${line}</p>`).join("")}
          </div>
          <div class="kiosk-detail__tags" data-product-tags>
            ${tags
              .map(
                (tag, index) => `
                  <span class="kiosk-detail__tag" data-product-tag data-product-tag-index="${index}">
                    ${tag}
                  </span>
                `
              )
              .join("")}
          </div>
          <div class="kiosk-detail__controls">
            <button class="kiosk-detail__speak" type="button" data-speech-toggle>
              ${state.isSpeaking ? "停止讲解" : "播放讲解"}
            </button>
            <div class="kiosk-detail__audio-tools">
              <div class="kiosk-detail__audio-buttons">
                <button
                  class="kiosk-detail__audio-button${state.isMuted ? " is-active" : ""}"
                  type="button"
                  data-speech-mute
                  aria-pressed="${state.isMuted ? "true" : "false"}"
                >
                  静音
                </button>
                <button
                  class="kiosk-detail__audio-button${state.isMuted ? "" : " is-active"}"
                  type="button"
                  data-speech-unmute
                  aria-pressed="${state.isMuted ? "false" : "true"}"
                >
                  开声
                </button>
              </div>
              <p class="kiosk-detail__mute-state" data-muted-state>${getMutedStateCopy(state)}</p>
            </div>
          </div>
        </div>
      </article>
      <section class="kiosk-detail__description" data-product-description-panel>
        <div class="kiosk-detail__description-header">
          <h3 class="kiosk-detail__description-title" data-product-description-title>产品描述</h3>
          ${createWaveMarkup("kiosk-voice__wave kiosk-detail__wave")}
        </div>
        <div class="kiosk-detail__description-copy">
          ${transcript
            .map((line) => `<p data-product-description-line data-transcript-line>${line}</p>`)
            .join("")}
        </div>
      </section>
    </section>
  `
}

const createMarkup = (categories, state) => {
  const activeCategory = categories.find((category) => category.id === state.activeCategoryId) ?? categories[0]
  const activeProduct = activeCategory.products.find((product) => product.id === state.activeProductId) ?? null

  return `
    <div class="kiosk-shell" data-reference-layout="medical-kiosk" data-kiosk-screen="${activeProduct ? "detail" : "gallery"}">
      <header class="kiosk-header">
        <div class="kiosk-header__halo kiosk-header__halo--left"></div>
        <div class="kiosk-header__halo kiosk-header__halo--right"></div>
        <div
          class="kiosk-title-strip"
          data-swipe-header
          data-active-category-id="${activeCategory.id}"
          tabindex="0"
          role="group"
          aria-label="左右滑动或点击切换展厅"
        >
          <button
            class="kiosk-title-strip__nav kiosk-title-strip__nav--left"
            type="button"
            data-shift-category="-1"
            aria-label="切换到上一个展厅"
          >
            <span class="kiosk-title-strip__chevron kiosk-title-strip__chevron--left" aria-hidden="true"></span>
          </button>
          <p class="kiosk-title-strip__title" data-active-category-title>${activeCategory.title}</p>
          <button
            class="kiosk-title-strip__nav kiosk-title-strip__nav--right"
            type="button"
            data-shift-category="1"
            aria-label="切换到下一个展厅"
          >
            <span class="kiosk-title-strip__chevron kiosk-title-strip__chevron--right" aria-hidden="true"></span>
          </button>
        </div>
      </header>
      <main class="kiosk-content" data-responsive-layout="swipe-title landscape-sidebar portrait-bottom-panel">
        ${
          activeProduct
            ? createDetailMarkup(activeCategory, activeProduct, state)
            : `
              <section class="kiosk-gallery" data-gallery-scroll-region aria-label="${activeCategory.title}产品卡片区">
                <div class="kiosk-gallery__grid">
                  ${createCardsMarkup(activeCategory.products)}
                </div>
              </section>
            `
        }
        ${createVoiceMarkup(activeCategory)}
      </main>
    </div>
  `
}

const getWrappedIndex = (currentIndex, delta, total) => (currentIndex + delta + total) % total

const resolveSpeechRuntime = (root, options) => {
  const view = root.ownerDocument?.defaultView
  const injectedRuntime = view?.__MEDICAL_KIOSK_SPEECH_RUNTIME__ ?? null
  const synthesis = options.speechSynthesis ?? injectedRuntime?.speechSynthesis ?? view?.speechSynthesis ?? null
  const Utterance =
    options.SpeechSynthesisUtterance ?? injectedRuntime?.SpeechSynthesisUtterance ?? view?.SpeechSynthesisUtterance ?? null

  return {
    supported: Boolean(synthesis && typeof synthesis.speak === "function" && typeof Utterance === "function"),
    synthesis,
    Utterance
  }
}

const findClosestActionTarget = (event, selector) => {
  if (typeof event.composedPath === "function") {
    for (const node of event.composedPath()) {
      if (node instanceof Element) {
        const match = node.closest(selector)
        if (match) {
          return match
        }
      }
    }
  }

  if (event.target instanceof Element) {
    return event.target.closest(selector)
  }

  return event.target?.parentElement?.closest?.(selector) ?? null
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

  const speechRuntime = resolveSpeechRuntime(root, options)
  let narrationToken = 0

  const swipeState = {
    active: false,
    startX: 0,
    startY: 0,
    suppressClick: false
  }

  const state = {
    activeCategoryId: initialCategoryId,
    activeProductId: null,
    isMuted: false,
    isSpeaking: false,
    speechStatus: "idle"
  }

  const getActiveCategory = () => categories.find((category) => category.id === state.activeCategoryId) ?? categories[0]

  const getActiveProduct = () => getActiveCategory().products.find((product) => product.id === state.activeProductId) ?? null

  const getActiveIndex = () => categories.findIndex((category) => category.id === state.activeCategoryId)

  const render = () => {
    root.innerHTML = createMarkup(categories, state)
  }

  const invalidateNarration = () => {
    narrationToken += 1
    return narrationToken
  }

  const cancelSpeech = () => {
    if (speechRuntime.supported && typeof speechRuntime.synthesis.cancel === "function") {
      speechRuntime.synthesis.cancel()
    }
  }

  const resetNarration = () => {
    invalidateNarration()
    cancelSpeech()
    state.isSpeaking = false
    state.speechStatus = "idle"
  }

  const switchToTextOnlyNarration = () => {
    invalidateNarration()
    cancelSpeech()
    state.isSpeaking = true
    state.speechStatus = "idle"
  }

  const speakActiveTranscript = () => {
    const activeProduct = getActiveProduct()
    if (!activeProduct) {
      return false
    }

    if (!speechRuntime.supported) {
      state.isSpeaking = false
      state.speechStatus = "unsupported"
      return false
    }

    const token = invalidateNarration()
    const utterance = new speechRuntime.Utterance(buildProductTranscript(getActiveCategory(), activeProduct).join(" "))
    utterance.lang = "zh-CN"
    utterance.rate = 1
    utterance.pitch = 1
    utterance.onend = () => {
      if (token !== narrationToken) {
        return
      }

      state.isSpeaking = false
      state.speechStatus = "idle"
      render()
    }
    utterance.onerror = () => {
      if (token !== narrationToken) {
        return
      }

      state.isSpeaking = false
      state.speechStatus = "unsupported"
      render()
    }

    cancelSpeech()
    state.isSpeaking = true
    state.speechStatus = "idle"
    speechRuntime.synthesis.speak(utterance)
    return true
  }

  const shiftCategory = (delta) => {
    resetNarration()
    const nextIndex = getWrappedIndex(getActiveIndex(), delta, categories.length)
    state.activeCategoryId = categories[nextIndex].id
    state.activeProductId = null
    render()
  }

  const openProductDetail = (productId) => {
    const product = getActiveCategory().products.find((item) => item.id === productId)
    if (!product) {
      return
    }

    resetNarration()
    state.activeProductId = product.id
    render()
  }

  const toggleNarration = () => {
    const activeProduct = getActiveProduct()

    if (!activeProduct) {
      return
    }

    if (state.isSpeaking) {
      resetNarration()
      render()
      return
    }

    if (state.isMuted) {
      state.speechStatus = "idle"
      state.isSpeaking = true
      invalidateNarration()
      render()
      return
    }

    if (!speakActiveTranscript()) {
      render()
      return
    }

    render()
  }

  const muteNarration = () => {
    if (state.isMuted) {
      return
    }

    state.isMuted = true

    if (state.isSpeaking) {
      switchToTextOnlyNarration()
    }

    render()
  }

  const unmuteNarration = () => {
    if (!state.isMuted) {
      return
    }

    state.isMuted = false

    if (state.isSpeaking && !speakActiveTranscript()) {
      render()
      return
    }

    render()
  }

  const completeSwipe = (endX, endY) => {
    if (!swipeState.active) {
      return
    }

    const deltaX = endX - swipeState.startX
    const deltaY = endY - swipeState.startY

    swipeState.active = false
    swipeState.suppressClick = false

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return
    }

    swipeState.suppressClick = true
    shiftCategory(deltaX < 0 ? 1 : -1)
  }

  root.addEventListener("mousedown", (event) => {
    const swipeSurface = event.target instanceof Element ? event.target.closest("[data-swipe-header]") : null

    if (!swipeSurface) {
      return
    }

    swipeState.active = true
    swipeState.suppressClick = false
    swipeState.startX = event.clientX
    swipeState.startY = event.clientY
  })

  root.addEventListener("mouseup", (event) => {
    completeSwipe(event.clientX, event.clientY)
  })

  root.addEventListener("mouseleave", () => {
    swipeState.active = false
    swipeState.suppressClick = false
  })

  root.addEventListener("touchstart", (event) => {
    const swipeSurface = event.target instanceof Element ? event.target.closest("[data-swipe-header]") : null
    const firstTouch = event.touches[0]

    if (!swipeSurface || !firstTouch) {
      return
    }

    swipeState.active = true
    swipeState.suppressClick = false
    swipeState.startX = firstTouch.clientX
    swipeState.startY = firstTouch.clientY
  })

  root.addEventListener("touchend", (event) => {
    const firstTouch = event.changedTouches[0]

    if (!firstTouch) {
      swipeState.active = false
      swipeState.suppressClick = false
      return
    }

    completeSwipe(firstTouch.clientX, firstTouch.clientY)
  })

  root.addEventListener("keydown", (event) => {
    const swipeSurface = event.target instanceof Element ? event.target.closest("[data-swipe-header]") : null

    if (!swipeSurface) {
      return
    }

    if (event.key === "ArrowLeft") {
      shiftCategory(-1)
    }

    if (event.key === "ArrowRight") {
      shiftCategory(1)
    }
  })

  root.addEventListener("click", (event) => {
    if (swipeState.suppressClick) {
      swipeState.suppressClick = false
      return
    }

    const shiftButton = findClosestActionTarget(event, "[data-shift-category]")
    if (shiftButton instanceof HTMLElement) {
      const delta = Number(shiftButton.dataset.shiftCategory)

      if (!Number.isNaN(delta) && delta !== 0) {
        shiftCategory(delta)
      }
      return
    }

    const card = findClosestActionTarget(event, "[data-product-id]")
    if (card instanceof HTMLElement) {
      openProductDetail(card.dataset.productId)
      return
    }

    if (findClosestActionTarget(event, "[data-speech-toggle]")) {
      toggleNarration()
      return
    }

    if (findClosestActionTarget(event, "[data-speech-mute]")) {
      muteNarration()
      return
    }

    if (findClosestActionTarget(event, "[data-speech-unmute]")) {
      unmuteNarration()
      return
    }

    if (findClosestActionTarget(event, "[data-back-to-gallery]")) {
      resetNarration()
      state.activeProductId = null
      render()
    }
  })

  render()

  return {
    getActiveCategoryId: () => state.activeCategoryId,
    nextCategory: () => shiftCategory(1),
    previousCategory: () => shiftCategory(-1)
  }
}
