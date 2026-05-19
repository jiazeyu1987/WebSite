const iconMap = {
  home: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 22.5 24 10l16 12.5" />
      <path d="M14 20.5V38h20V20.5" />
    </svg>
  `,
  heart: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 38c-8.5-5.2-14-11.2-14-18 0-5 3.4-8.5 8.1-8.5 2.7 0 4.6 1 5.9 3 1.3-2 3.2-3 5.9-3 4.7 0 8.1 3.5 8.1 8.5 0 6.8-5.5 12.8-14 18Z" />
      <path d="M16 24h6l2.2-5 3.2 10 2.8-5H34" />
    </svg>
  `,
  brain: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M17 15.5c0-4 3.1-7 7-7 2.2 0 4.1.8 5.5 2.4A6.7 6.7 0 0 1 38 17c0 1.8-.5 3.3-1.6 4.8 1.5 1.4 2.3 3.3 2.3 5.6 0 4.6-3.5 8.1-8.2 8.1H19.5c-5.1 0-8.7-3.6-8.7-8.5 0-2.2.8-4.1 2.3-5.5-1-1.3-1.6-2.9-1.6-4.7 0-4.1 3.2-7.3 7.3-7.3 1 0 2 .2 3 .5" />
      <path d="M24 13v21" />
      <path d="M18.5 17.5c2 0 3.5 1.4 3.5 3.3" />
      <path d="M29.5 15.5c-2 0-3.5 1.4-3.5 3.3" />
      <path d="M18.5 25.5c2 0 3.5 1.4 3.5 3.2" />
      <path d="M29.5 23.7c-2 0-3.5 1.4-3.5 3.2" />
    </svg>
  `,
  profile: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M18 10c8.3 0 14 5.8 14 13.8 0 4.1-1.5 7.6-4.7 10.2l3.2 7.5-8.3-4.4h-3.8c-7.2 0-12.4-5.2-12.4-12.3C6 15.8 11 10 18 10Z" />
      <path d="M20.5 17.2c2.8 1.3 4.6 4 4.6 7.1 0 2.8-1.4 5.4-3.7 6.9" />
    </svg>
  `,
  bone: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M15 17a5.5 5.5 0 1 1-4.8-8.2c2.4 0 4.1 1.2 5 3l17.6 4.2a5.6 5.6 0 1 1 0 16L15 36.2c-.9 1.9-2.6 3-5 3A5.5 5.5 0 1 1 15 31l18-4.1" />
    </svg>
  `,
  kidney: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M18 11c-5 0-8.4 4.4-8.4 10.4 0 8.2 4.1 14.6 10.3 14.6 2.6 0 4.8-.9 6.1-2.6V20.6c0-5.7-3.3-9.6-8-9.6Z" />
      <path d="M30 11c5 0 8.4 4.4 8.4 10.4 0 8.2-4.1 14.6-10.3 14.6-2.6 0-4.8-.9-6.1-2.6V20.6c0-5.7 3.3-9.6 8-9.6Z" />
      <path d="M24 18v19" />
    </svg>
  `,
  bulb: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 10c6.8 0 12 5 12 11.8 0 4.4-2.4 8.1-5.8 10.2-1.8 1.1-2.8 3-2.8 5H20.5c0-2-1.1-3.9-3-5.1-3.3-2.1-5.5-5.8-5.5-10.1C12 15 17.2 10 24 10Z" />
      <path d="M20.5 37h7" />
      <path d="M19 41h10" />
      <path d="M24 16v7" />
      <path d="M20 23.5h8" />
    </svg>
  `,
  microscope: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M20 11 28 19" />
      <path d="M15 17 29 31" />
      <path d="M26 11c3.2 0 5.5 2.3 5.5 5.5v2" />
      <path d="M20 29.5a8.5 8.5 0 1 0 17 0v-3.1" />
      <path d="M9 39h30" />
      <path d="M25.5 33H14" />
      <path d="M28.5 19.5 35 13" />
    </svg>
  `
}

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
    <svg class="product-art" viewBox="0 0 248 152" aria-hidden="true" role="img">
      ${artMap[kind] ?? artMap.sheath}
    </svg>
  `
}

const createTabsMarkup = (categories, activeId) =>
  categories
    .map(
      (category) => `
        <button
          class="demo-tab${category.id === activeId ? " is-active" : ""}"
          type="button"
          data-tab-id="${category.id}"
          aria-pressed="${category.id === activeId ? "true" : "false"}"
        >
          <span class="demo-tab__icon">${iconMap[category.icon]}</span>
          <span class="demo-tab__label">${category.label}</span>
        </button>
      `
    )
    .join("")

const createCardsMarkup = (category) =>
  category.products
    .map(
      (product) => `
        <article class="product-card" data-product-card>
          <div class="product-card__glow"></div>
          <div class="product-card__art">${createProductArt(product.art)}</div>
          <div class="product-card__meta">
            <span class="product-card__name">${product.name}</span>
            <span class="product-card__code">${product.code}</span>
          </div>
        </article>
      `
    )
    .join("")

const createVoiceMarkup = (category) => {
  const paragraphs = category.voiceCopy
    .map((copy) => `<p>${copy}</p>`)
    .join("")

  return `
    <aside class="voice-panel" aria-label="${category.label}讲解面板">
      <div class="voice-panel__header">
        <div>
          <p class="voice-panel__eyebrow" data-active-category>${category.label}</p>
          <h2 class="voice-panel__title">${category.voiceTitle}</h2>
        </div>
        <div class="voice-panel__wave" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
      <div class="voice-panel__copy" data-voice-copy>
        ${paragraphs}
      </div>
    </aside>
  `
}

const createSceneMarkup = (categories, activeId) => {
  const activeCategory = categories.find((category) => category.id === activeId) ?? categories[0]

  return `
    <div class="demo-shell">
      <header class="demo-header">
        <div class="demo-header__halo demo-header__halo--left"></div>
        <div class="demo-header__halo demo-header__halo--right"></div>
        <nav class="demo-tabs" aria-label="产品分类切换">
          ${createTabsMarkup(categories, activeId)}
        </nav>
      </header>

      <main class="demo-content">
        <section class="demo-gallery" aria-label="${activeCategory.label}产品列表">
          <div class="demo-gallery__header">
            <div>
              <p class="demo-gallery__kicker">${activeCategory.heroTag}</p>
              <h1>${activeCategory.label}</h1>
            </div>
            <p class="demo-gallery__hint">点击顶部分类可切换左侧器械阵列与右侧讲解内容</p>
          </div>
          <div class="demo-gallery__grid">
            ${createCardsMarkup(activeCategory)}
          </div>
        </section>
        ${createVoiceMarkup(activeCategory)}
      </main>
    </div>
  `
}

export const createDemoApp = (root, categories, initialCategoryId) => {
  if (!root) {
    throw new Error("Demo root element is required.")
  }

  if (!Array.isArray(categories) || categories.length === 0) {
    throw new Error("At least one category is required to render the demo.")
  }

  const initialId = categories.some((category) => category.id === initialCategoryId)
    ? initialCategoryId
    : categories[0].id

  const state = {
    activeCategoryId: initialId
  }

  const render = () => {
    root.innerHTML = createSceneMarkup(categories, state.activeCategoryId)
  }

  const selectCategory = (categoryId) => {
    if (!categories.some((category) => category.id === categoryId)) {
      return
    }

    state.activeCategoryId = categoryId
    render()
  }

  root.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-tab-id]")

    if (!tab) {
      return
    }

    selectCategory(tab.dataset.tabId)
  })

  render()

  return {
    getActiveCategory: () => state.activeCategoryId,
    selectCategory
  }
}
