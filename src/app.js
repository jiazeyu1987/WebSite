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
          <span class="demo-tab__icon" data-icon-style="outline">${iconMap[category.icon]}</span>
          <span class="demo-tab__label">${category.label}</span>
        </button>
      `
    )
    .join("")

const createCardsMarkup = (category) =>
  category.products
    .map(
      (product) => `
        <article class="product-card" data-product-card aria-label="${product.name}">
          <div class="product-card__glow"></div>
          <div class="product-card__art">${createProductArt(product.art)}</div>
        </article>
      `
    )
    .join("")

const createVoiceMarkup = (category) => {
  const paragraphs = category.voiceCopy
    .map((copy) => `<p>${copy}</p>`)
    .join("")

  return `
    <aside class="voice-panel" data-active-category-id="${category.id}" aria-label="${category.id}-voice-panel">
      <div class="voice-panel__header">
        <h2 class="voice-panel__title">${category.voiceTitle}</h2>
        <div class="voice-panel__wave" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span><span></span>
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
    <div class="demo-shell" data-layout="full-bleed">
      <header class="demo-header">
        <div class="demo-header__halo demo-header__halo--left"></div>
        <div class="demo-header__halo demo-header__halo--right"></div>
        <nav class="demo-tabs" aria-label="category-switcher">
          ${createTabsMarkup(categories, activeId)}
        </nav>
      </header>
      <main class="demo-content">
        <section class="demo-gallery" aria-label="${activeCategory.id}-gallery">
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
