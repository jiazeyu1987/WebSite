import { fetchShowroomAppConfig, fetchShowroomProductDetail } from "./showroom-api.js"

const KIOSK_LANGUAGE_STORAGE_KEY = "medical-kiosk-language"
const KIOSK_LANGUAGES = new Set(["zh", "en"])

const SHOWROOM_TITLE_ICON_BY_HALL_CODE = {
  cardiology: "/kiosk-hall-icons/cardiology.svg",
  neurology: "/kiosk-hall-icons/neurology.svg",
  peripheral: "/kiosk-hall-icons/peripheral.svg",
  orthopedic: "/kiosk-hall-icons/orthopedic.svg",
  urology: "/kiosk-hall-icons/urology.svg",
  nonvascular: "/kiosk-hall-icons/nonvascular.svg",
  prefabrication: "/kiosk-hall-icons/prefabrication.svg"
}

const KIOSK_COPY = {
  zh: {
    languageLabel: "语言切换",
    languageZh: "中文",
    languageEn: "English",
    homeTitle: "首页",
    homeHeroAria: "打开公司详情",
    swipeHeaderAria: "左右滑动或点击切换展厅",
    swipeHeaderHint: "左右滑动或点击切换展厅",
    previousHallAria: "切换到上一个展厅",
    nextHallAria: "切换到下一个展厅",
    loadingTitle: "正在加载展厅数据",
    loadingBody: "当前页面只从 IntRuoyi 读取公开展示数据，不使用本地业务假数据。",
    errorTitle: "展厅数据加载失败",
    retryLabel: "重新加载",
    companyDetailEyebrow: "公司详情",
    companyDetailBack: "返回首页",
    companyDetailEmptyTitle: "暂无公司公开信息",
    companyDetailEmptyBody: "当前公司未发布可展示的公开字段。",
    voiceTitle: "公开讲解",
    voiceMuteLabel: "静音",
    voiceUnmuteLabel: "开声",
    voicePlayLabel: "播放讲解",
    voicePauseLabel: "暂停讲解",
    voiceIdle: "点击播放语音讲解",
    voicePlaying: "正在播放语音讲解",
    voicePaused: "已暂停",
    voiceFailedPrefix: "播放失败：",
    voiceUnavailable: "当前页面没有可播放的公开语音。",
    hallEmptyBody: "当前展厅未发布公开描述。",
    productLoadingTitle: "正在加载产品详情",
    productErrorTitle: "产品详情加载失败",
    productBackLabel: "返回展厅",
    productSummaryEyebrow: "产品详情",
    productFieldsTitle: "产品详细信息",
    productFieldsEmpty: "当前产品未发布公开详细字段。",
    companyTagLabel: "公司展示",
    productCodeLabel: "产品编码"
  },
  en: {
    languageLabel: "Language toggle",
    languageZh: "中文",
    languageEn: "English",
    homeTitle: "Home",
    homeHeroAria: "Open company detail",
    swipeHeaderAria: "Swipe or click to switch halls",
    swipeHeaderHint: "Swipe or click to switch halls",
    previousHallAria: "Switch to previous hall",
    nextHallAria: "Switch to next hall",
    loadingTitle: "Loading showroom data",
    loadingBody: "This page reads public showroom data from IntRuoyi only and does not use local business placeholders.",
    errorTitle: "Failed to load showroom data",
    retryLabel: "Reload",
    companyDetailEyebrow: "Company Detail",
    companyDetailBack: "Back to home",
    companyDetailEmptyTitle: "No public company information",
    companyDetailEmptyBody: "The current company has not published any public fields.",
    voiceTitle: "Public narration",
    voiceMuteLabel: "Mute audio",
    voiceUnmuteLabel: "Unmute audio",
    voicePlayLabel: "Play narration",
    voicePauseLabel: "Pause narration",
    voiceIdle: "Press to play narration",
    voicePlaying: "Playing narration",
    voicePaused: "Paused",
    voiceFailedPrefix: "Playback failed: ",
    voiceUnavailable: "No public narration audio is available for this screen.",
    hallEmptyBody: "No public hall description has been published.",
    productLoadingTitle: "Loading product detail",
    productErrorTitle: "Failed to load product detail",
    productBackLabel: "Back to hall",
    productSummaryEyebrow: "Product Detail",
    productFieldsTitle: "Product Details",
    productFieldsEmpty: "No public product detail fields have been published.",
    companyTagLabel: "Company display",
    productCodeLabel: "Product code"
  }
}

const resolveLanguage = (value) => (KIOSK_LANGUAGES.has(value) ? value : "zh")
const isEnglish = (language) => language === "en"
const getUiCopy = (language) => KIOSK_COPY[language] ?? KIOSK_COPY.zh

const readPersistedLanguage = (storage) => resolveLanguage(storage?.getItem(KIOSK_LANGUAGE_STORAGE_KEY) ?? "zh")
const persistLanguage = (storage, language) => storage?.setItem(KIOSK_LANGUAGE_STORAGE_KEY, language)

const getCompanyName = (company, language) => (isEnglish(language) ? company.nameEn : company.name)
const getCompanySubtitle = (company, language) => (isEnglish(language) ? company.subtitleEn : company.subtitleZh)
const getCompanyAudioSrc = (company, language) => (isEnglish(language) ? company.audioEn : company.audioZh)
const getHallName = (hall, language) => (isEnglish(language) ? hall.nameEn : hall.name)
const getHallDescription = (hall, language) => (isEnglish(language) ? hall.descriptionEn : hall.description)
const getProductName = (product, language) => (isEnglish(language) ? product.nameEn : product.nameCn)
const getProductSubtitle = (product, language) => (isEnglish(language) ? product.subtitleEn : product.subtitleZh)
const getProductAudioSrc = (product, language) => (isEnglish(language) ? product.audioEn : product.audioZh)

const getHallIconSrc = (hall) => {
  const hallCode = typeof hall?.code === "string" ? hall.code.trim().toLowerCase() : ""
  return SHOWROOM_TITLE_ICON_BY_HALL_CODE[hallCode] ?? null
}

const getActiveCategoryId = (hall) => {
  if (!hall) {
    return "home"
  }

  const hallCode = typeof hall.code === "string" ? hall.code.trim().toLowerCase() : ""
  return hallCode !== "" ? hallCode : String(hall.id)
}

const splitParagraphs = (text) => {
  if (typeof text !== "string") {
    return []
  }

  return text
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter((line) => line !== "")
}

const createWaveMarkup = (isActive) => `
  <div class="kiosk-voice__wave" data-wave-active="${isActive ? "true" : "false"}" aria-hidden="true">
    <span></span><span></span><span></span><span></span><span></span><span></span>
  </div>
`

const createLanguageIconMarkup = (language) => {
  if (language === "en") {
    return `
      <svg class="kiosk-icon-button__icon kiosk-icon-button__icon--language" viewBox="0 0 48 48" aria-hidden="true">
        <circle class="kiosk-language-icon__disc" cx="24" cy="24" r="17" />
        <path class="kiosk-language-icon__orbit" d="M12 25c5-6 19-8 27-3" />
        <path class="kiosk-language-icon__orbit" d="M16 34c7 3 17 2 24-4" />
        <path class="kiosk-language-icon__spark" d="M35 11l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" />
        <text x="24" y="28.5" text-anchor="middle" class="kiosk-language-icon__text kiosk-language-icon__text--en">EN</text>
      </svg>
    `
  }

  return `
    <svg class="kiosk-icon-button__icon kiosk-icon-button__icon--language" viewBox="0 0 48 48" aria-hidden="true">
      <circle class="kiosk-language-icon__disc" cx="24" cy="24" r="17" />
      <path class="kiosk-language-icon__orbit" d="M12 25c5-6 19-8 27-3" />
      <path class="kiosk-language-icon__orbit" d="M16 34c7 3 17 2 24-4" />
      <path class="kiosk-language-icon__spark" d="M35 11l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" />
      <path
        class="kiosk-language-icon__glyph"
        d="M17 18h14M24 14v22M18 26h12M20 26c1 4 3 7 4 9M28 26c-1 4-3 7-4 9"
      />
    </svg>
  `
}

const createSpeakerIconMarkup = (isMuted) => {
  if (isMuted) {
    return `
      <svg class="kiosk-icon-button__icon" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 20h8l10-8v24l-10-8h-8z" fill="currentColor" />
        <path d="M34 18l8 12M42 18l-8 12" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      </svg>
    `
  }

  return `
    <svg class="kiosk-icon-button__icon" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M10 20h8l10-8v24l-10-8h-8z" fill="currentColor" />
      <path d="M34 18c3 3 3 9 0 12M39 13c6 6 6 16 0 22" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
    </svg>
  `
}

const createLanguageToggleMarkup = (language) => {
  const copy = getUiCopy(language)
  const nextLanguage = language === "zh" ? "en" : "zh"

  return `
    <button
      class="kiosk-icon-button kiosk-icon-button--language"
      type="button"
      data-language-toggle-button
      data-language-option="${nextLanguage}"
      data-language-current="${language}"
      aria-label="${copy.languageLabel}"
      title="${copy.languageLabel}"
    >
      ${createLanguageIconMarkup(language)}
    </button>
  `
}

const createActiveCategoryTitleMarkup = (title, iconSrc) => {
  if (!iconSrc) {
    return `<span class="kiosk-title-strip__title-copy">${title}</span>`
  }

  return `
    <span class="kiosk-title-strip__title-badge">
      <img
        class="kiosk-title-strip__icon"
        data-active-category-icon
        src="${iconSrc}"
        alt=""
        aria-hidden="true"
      />
      <span class="kiosk-title-strip__title-copy">${title}</span>
    </span>
  `
}

const createHomeHeroMarkup = (company, language, copy) => `
  <section class="kiosk-gallery kiosk-gallery--home-hero" data-gallery-scroll-region aria-label="${getCompanyName(company, language)}">
    <div class="kiosk-gallery__hero-stage">
      <button class="kiosk-home-hero" type="button" data-home-company-entry-card aria-label="${copy.homeHeroAria}">
        <img
          class="kiosk-home-hero__image"
          data-home-hero-image
          src="${company.homeImage}"
          alt="${getCompanyName(company, language)}"
        />
      </button>
    </div>
  </section>
`

const createCompanyFieldMarkup = (field, index) => `
  <div class="kiosk-company-detail__field" data-company-detail-field data-company-detail-field-index="${index}">
    <dt>${field.label}</dt>
    <dd>${field.value}</dd>
  </div>
`

const createCompanyDetailMarkup = (company, state) => {
  const copy = getUiCopy(state.language)
  const companyName = getCompanyName(company, state.language)
  const companySubtitle = getCompanySubtitle(company, state.language)

  return `
    <section class="kiosk-company-detail" data-company-detail-panel>
      <header class="kiosk-company-detail__header">
        <button class="kiosk-company-detail__back" type="button" data-company-back>${copy.companyDetailBack}</button>
        <p class="kiosk-detail__eyebrow">${copy.companyDetailEyebrow}</p>
        <h2 class="kiosk-company-detail__title" data-company-detail-title>${companyName}</h2>
        <p class="kiosk-company-detail__copy" data-company-detail-copy>${companySubtitle}</p>
      </header>
      <div class="kiosk-company-detail__image-wrap">
        <img class="kiosk-company-detail__image" src="${company.homeImage}" alt="${companyName}" />
      </div>
      ${
        company.publicFields.length > 0
          ? `
            <dl class="kiosk-company-detail__fields" data-company-detail-fields>
              ${company.publicFields.map((field, index) => createCompanyFieldMarkup(field, index)).join("")}
            </dl>
          `
          : `
            <section class="kiosk-company-detail__empty" data-company-detail-empty>
              <h3>${copy.companyDetailEmptyTitle}</h3>
              <p>${copy.companyDetailEmptyBody}</p>
            </section>
          `
      }
    </section>
  `
}

const createProductCardMarkup = (product, language) => `
  <article class="kiosk-card" data-product-card data-product-id="${product.id}" aria-label="${getProductName(product, language)}">
    <div class="kiosk-card__glow"></div>
    <div class="kiosk-card__art">
      <img class="kiosk-card__image" src="${product.previewImageUrl}" alt="${getProductName(product, language)}" />
    </div>
    <span class="kiosk-card__label" data-product-card-label>${getProductName(product, language)}</span>
  </article>
`

const createGalleryMarkup = (hall, language) => `
  <section class="kiosk-gallery" data-gallery-scroll-region aria-label="${getHallName(hall, language)}">
    <div class="kiosk-gallery__grid">
      ${hall.products.map((product) => createProductCardMarkup(product, language)).join("")}
    </div>
  </section>
`

const createProductDescriptionLines = (detail, copy) => {
  if (!detail || detail.publicFields.length === 0) {
    return `<p data-product-description-line>${copy.productFieldsEmpty}</p>`
  }

  return detail.publicFields
    .map(
      (field, index) => `
        <p data-product-description-line data-product-field-index="${index}">
          <strong>${field.label}</strong>: ${field.value}
        </p>
      `
    )
    .join("")
}

const createProductDetailMarkup = (hall, product, state) => {
  const copy = getUiCopy(state.language)
  const detail = state.productDetailData
  const productName = getProductName(product, state.language)
  const productSubtitle = getProductSubtitle(product, state.language)
  const hallTitle = getHallName(hall, state.language)

  if (state.productDetailLoadState === "loading") {
    return `
      <section class="kiosk-detail" data-product-detail-loading>
        <header class="kiosk-detail__header">
          <button class="kiosk-detail__back" type="button" data-back-to-gallery>${copy.productBackLabel}</button>
        </header>
        <article class="kiosk-detail__hero">
          <div class="kiosk-detail__copy">
            <p class="kiosk-detail__eyebrow">${copy.productSummaryEyebrow}</p>
            <h2 class="kiosk-detail__title">${copy.productLoadingTitle}</h2>
          </div>
        </article>
      </section>
    `
  }

  if (state.productDetailLoadState === "error") {
    return `
      <section class="kiosk-detail" data-product-detail-error>
        <header class="kiosk-detail__header">
          <button class="kiosk-detail__back" type="button" data-back-to-gallery>${copy.productBackLabel}</button>
          <p class="kiosk-detail__state">${state.productDetailErrorMessage}</p>
        </header>
        <article class="kiosk-detail__hero">
          <div class="kiosk-detail__copy">
            <p class="kiosk-detail__eyebrow">${copy.productSummaryEyebrow}</p>
            <h2 class="kiosk-detail__title">${copy.productErrorTitle}</h2>
          </div>
        </article>
      </section>
    `
  }

  return `
    <section class="kiosk-detail" data-product-detail-id="${product.id}">
      <header class="kiosk-detail__header">
        <button class="kiosk-detail__back" type="button" data-back-to-gallery>${copy.productBackLabel}</button>
        <p class="kiosk-detail__state" data-speaking-state>${state.playbackMessage}</p>
      </header>
      <article class="kiosk-detail__hero">
        <div class="kiosk-detail__hero-stage">
          <div class="kiosk-detail__hero-glow"></div>
          <div class="kiosk-detail__art">
            <img class="kiosk-detail__hero-image" src="${product.previewImageUrl}" alt="${productName}" />
          </div>
        </div>
        <div class="kiosk-detail__copy">
          <p class="kiosk-detail__eyebrow">${copy.productSummaryEyebrow} / ${hallTitle}</p>
          <h2 class="kiosk-detail__title" data-product-detail-title>${productName}</h2>
          <div class="kiosk-detail__summary-block">
            <p class="kiosk-detail__summary">${productSubtitle}</p>
          </div>
          <div class="kiosk-detail__tags" data-product-tags>
            <span class="kiosk-detail__tag" data-product-tag>${hallTitle}</span>
            <span class="kiosk-detail__tag" data-product-tag>${copy.productCodeLabel}: ${product.code}</span>
          </div>
        </div>
      </article>
      <section class="kiosk-detail__description" data-product-description-panel>
        <div class="kiosk-detail__description-header">
          <h3 class="kiosk-detail__description-title" data-product-description-title>${copy.productFieldsTitle}</h3>
          ${createWaveMarkup(state.playbackStatus === "playing" && !state.isMuted)}
        </div>
        <div class="kiosk-detail__description-copy">
          ${createProductDescriptionLines(detail, copy)}
        </div>
      </section>
    </section>
  `
}

const createVoicePanelMarkup = (state, lines, hasAudio) => {
  const copy = getUiCopy(state.language)

  return `
    <aside class="kiosk-voice" data-active-category-id="${state.activeCategoryId}">
      <div class="kiosk-voice__header">
        <h2 class="kiosk-voice__title">${copy.voiceTitle}</h2>
        <div class="kiosk-voice__header-tools">
          ${createLanguageToggleMarkup(state.language)}
          ${
            hasAudio
              ? `
                <button
                  class="kiosk-icon-button kiosk-icon-button--audio ${state.isMuted ? "is-muted" : "is-unmuted"}"
                  type="button"
                  data-speech-mute-toggle
                  data-audio-state="${state.isMuted ? "muted" : "unmuted"}"
                  aria-label="${state.isMuted ? copy.voiceUnmuteLabel : copy.voiceMuteLabel}"
                  title="${state.isMuted ? copy.voiceUnmuteLabel : copy.voiceMuteLabel}"
                >
                  ${createSpeakerIconMarkup(state.isMuted)}
                </button>
              `
              : ""
          }
          ${hasAudio ? createWaveMarkup(state.playbackStatus === "playing" && !state.isMuted) : ""}
        </div>
      </div>
      <div class="kiosk-voice__copy" data-voice-copy>
        ${lines.map((line) => `<p>${line}</p>`).join("")}
      </div>
      ${
        hasAudio
          ? `
            <button class="kiosk-detail__speak" type="button" data-speech-toggle>
              ${state.playbackStatus === "playing" ? copy.voicePauseLabel : copy.voicePlayLabel}
            </button>
          `
          : ""
      }
    </aside>
  `
}

const createSwipeProgressMarkup = (copy, currentSlot, totalSlots) => `
  <div class="kiosk-title-strip__meta">
    <span class="kiosk-title-strip__hint" data-swipe-hint>${copy.swipeHeaderHint}</span>
    <span
      class="kiosk-title-strip__progress"
      data-swipe-progress
      data-current-slot="${currentSlot}"
      data-total-slots="${totalSlots}"
    >
      ${currentSlot} / ${totalSlots}
    </span>
  </div>
`

const createLoadingMarkup = (language) => {
  const copy = getUiCopy(language)

  return `
    <section class="kiosk-company-detail" data-screen="kiosk-loading">
      <header class="kiosk-company-detail__header">
        <p class="kiosk-detail__eyebrow">Showroom Runtime</p>
        <h2 class="kiosk-company-detail__title">${copy.loadingTitle}</h2>
        <p class="kiosk-company-detail__copy">${copy.loadingBody}</p>
      </header>
    </section>
  `
}

const createErrorMarkup = (language, errorMessage) => {
  const copy = getUiCopy(language)

  return `
    <section class="kiosk-company-detail" data-screen="kiosk-error">
      <header class="kiosk-company-detail__header">
        <p class="kiosk-detail__eyebrow">Showroom Runtime</p>
        <h2 class="kiosk-company-detail__title">${copy.errorTitle}</h2>
        <p class="kiosk-company-detail__copy" data-kiosk-error-message>${errorMessage}</p>
      </header>
      <button class="kiosk-company-detail__retry" type="button" data-retry-load>${copy.retryLabel}</button>
    </section>
  `
}

const createReadyMarkup = (state) => {
  const copy = getUiCopy(state.language)
  const company = state.config.company
  const hall = state.activeHallSlot === 0 ? null : state.config.showrooms[state.activeHallSlot - 1]
  const product = hall?.products.find((item) => item.id === state.selectedProductId) ?? null
  const activeCategoryTitle = hall ? getHallName(hall, state.language) : copy.homeTitle
  const activeIconSrc = hall ? getHallIconSrc(hall) : null
  const totalSlots = state.config.showrooms.length + 1
  const currentSlot = state.activeHallSlot + 1
  const currentVoiceLines = hall
    ? state.screen === "product"
      ? splitParagraphs(getProductSubtitle(product, state.language))
      : splitParagraphs(getHallDescription(hall, state.language))
    : splitParagraphs(getCompanySubtitle(company, state.language))
  const voiceLines =
    currentVoiceLines.length > 0 ? currentVoiceLines : hall ? [copy.hallEmptyBody] : [getCompanySubtitle(company, state.language)]
  const hasAudio = state.audioSource !== ""
  const kioskScreen = state.screen === "product" ? "detail" : "gallery"

  return `
    <div class="kiosk-shell" data-reference-layout="medical-kiosk" data-kiosk-screen="${kioskScreen}">
      <header class="kiosk-header">
        <div class="kiosk-header__halo kiosk-header__halo--left"></div>
        <div class="kiosk-header__halo kiosk-header__halo--right"></div>
        <div
          class="kiosk-title-strip"
          data-swipe-header
          data-active-category-id="${state.activeCategoryId}"
          tabindex="0"
          role="group"
          aria-label="${copy.swipeHeaderAria}"
        >
          <button
            class="kiosk-title-strip__nav kiosk-title-strip__nav--left"
            type="button"
            data-shift-category="-1"
            aria-label="${copy.previousHallAria}"
          >
            <span class="kiosk-title-strip__chevron kiosk-title-strip__chevron--left" aria-hidden="true"></span>
          </button>
          <div class="kiosk-title-strip__center">
            <p class="kiosk-title-strip__title" data-active-category-title>${createActiveCategoryTitleMarkup(activeCategoryTitle, activeIconSrc)}</p>
            ${createSwipeProgressMarkup(copy, currentSlot, totalSlots)}
          </div>
          <button
            class="kiosk-title-strip__nav kiosk-title-strip__nav--right"
            type="button"
            data-shift-category="1"
            aria-label="${copy.nextHallAria}"
          >
            <span class="kiosk-title-strip__chevron kiosk-title-strip__chevron--right" aria-hidden="true"></span>
          </button>
        </div>
      </header>
      <main class="kiosk-content" data-responsive-layout="swipe-title landscape-sidebar portrait-bottom-panel">
        ${
          state.screen === "company"
            ? createCompanyDetailMarkup(company, state)
            : state.screen === "product" && hall && product
              ? createProductDetailMarkup(hall, product, state)
              : hall
                ? createGalleryMarkup(hall, state.language)
                : createHomeHeroMarkup(company, state.language, copy)
        }
        <section>
          <div style="display:grid; gap:16px;">
            ${createVoicePanelMarkup(state, voiceLines, hasAudio)}
          </div>
        </section>
      </main>
    </div>
  `
}

const createAppMarkup = (state) => `
  <div class="kiosk-app" data-load-state="${state.loadState}" data-language-current="${state.language}">
    ${
      state.loadState === "loading"
        ? createLoadingMarkup(state.language)
        : state.loadState === "error"
          ? createErrorMarkup(state.language, state.errorMessage)
          : createReadyMarkup(state)
    }
  </div>
`

const resolveAudioFactory = (options) => {
  const createAudio = options.createAudio ?? ((src) => new Audio(src))

  if (typeof createAudio !== "function") {
    throw new Error("Kiosk audio factory is required.")
  }

  return createAudio
}

export const createMedicalKioskApp = (root, options = {}) => {
  if (!root) {
    throw new Error("Kiosk root element is required.")
  }

  const storage = options.storage ?? root.ownerDocument?.defaultView?.localStorage ?? null
  const createAudio = resolveAudioFactory(options)
  const loadAppConfig =
    options.loadAppConfig ??
    (() =>
      fetchShowroomAppConfig({
        endpoint: options.appConfigEndpoint,
        fetchImpl: options.fetchImpl
      }))
  const loadProductDetail =
    options.loadProductDetail ??
    ((productId) =>
      fetchShowroomProductDetail({
        productId,
        fetchImpl: options.fetchImpl
      }))

  const swipeState = {
    active: false,
    startX: 0,
    startY: 0,
    suppressClick: false
  }
  const browseScrollPositions = new Map()

  const state = {
    loadState: "loading",
    errorMessage: "",
    config: null,
    language: readPersistedLanguage(storage),
    activeHallSlot: 0,
    activeCategoryId: "home",
    screen: "home",
    selectedProductId: null,
    productDetailLoadState: "idle",
    productDetailErrorMessage: "",
    productDetailData: null,
    isMuted: false,
    playbackStatus: "idle",
    playbackErrorMessage: "",
    playbackMessage: getUiCopy(readPersistedLanguage(storage)).voiceIdle,
    audioSource: "",
    activeAudio: null
  }

  const destroyAudio = () => {
    if (!state.activeAudio) {
      return
    }

    if (typeof state.activeAudio.pause === "function") {
      state.activeAudio.pause()
    }

    if ("currentTime" in state.activeAudio) {
      state.activeAudio.currentTime = 0
    }

    state.activeAudio = null
  }

  const resetPlaybackState = () => {
    state.playbackStatus = "idle"
    state.playbackErrorMessage = ""
  }


  const getActiveHall = () => {
    if (!state.config || state.activeHallSlot === 0) {
      return null
    }

    return state.config.showrooms[state.activeHallSlot - 1] ?? null
  }

  const getSelectedProduct = () => getActiveHall()?.products.find((item) => item.id === state.selectedProductId) ?? null

  const resolveAudioSource = () => {
    if (!state.config) {
      return ""
    }

    if (state.screen === "product") {
      const product = getSelectedProduct()
      return product ? getProductAudioSrc(product, state.language) : ""
    }

    if (state.screen === "home" || state.screen === "company") {
      return getCompanyAudioSrc(state.config.company, state.language)
    }

    return ""
  }

  const updateDerivedState = () => {
    const hall = getActiveHall()
    state.activeCategoryId = getActiveCategoryId(hall)
    state.audioSource = resolveAudioSource()

    const copy = getUiCopy(state.language)

    if (state.audioSource === "") {
      state.playbackMessage = copy.voiceUnavailable
      return
    }

    if (state.playbackStatus === "playing") {
      state.playbackMessage = copy.voicePlaying
      return
    }

    if (state.playbackStatus === "paused") {
      state.playbackMessage = copy.voicePaused
      return
    }

    if (state.playbackStatus === "failed") {
      state.playbackMessage = `${copy.voiceFailedPrefix}${state.playbackErrorMessage}`
      return
    }

    state.playbackMessage = copy.voiceIdle
  }

  const render = () => {
    updateDerivedState()
    root.innerHTML = createAppMarkup(state)
  }

  const getBrowseScrollTarget = () => {
    const view = root.ownerDocument?.defaultView ?? null
    const gallery = root.querySelector("[data-gallery-scroll-region]")
    const scrollingElement = root.ownerDocument?.scrollingElement ?? root.ownerDocument?.documentElement ?? null

    if (!view || !(gallery instanceof HTMLElement) || !scrollingElement) {
      return {
        kind: "document",
        target: scrollingElement,
        top: scrollingElement?.scrollTop ?? 0
      }
    }

    const overflowY = view.getComputedStyle(gallery).overflowY
    if (overflowY === "auto" || overflowY === "scroll") {
      return {
        kind: "element",
        target: gallery,
        top: gallery.scrollTop
      }
    }

    return {
      kind: "document",
      target: scrollingElement,
      top: scrollingElement.scrollTop
    }
  }

  const saveBrowseScrollPosition = () => {
    if (state.loadState !== "ready" || (state.screen !== "home" && state.screen !== "gallery")) {
      return
    }

    const { top } = getBrowseScrollTarget()
    browseScrollPositions.set(state.activeCategoryId, top)
  }

  const restoreBrowseScrollPosition = () => {
    if (state.loadState !== "ready" || (state.screen !== "home" && state.screen !== "gallery")) {
      return
    }

    const savedTop = browseScrollPositions.get(state.activeCategoryId)
    if (typeof savedTop !== "number") {
      return
    }

    const view = root.ownerDocument?.defaultView ?? null
    const { kind, target } = getBrowseScrollTarget()

    if (kind === "element" && target instanceof HTMLElement) {
      target.scrollTop = savedTop
      return
    }

    if (target instanceof HTMLElement) {
      target.scrollTop = savedTop
    }

    if (view && typeof view.scrollTo === "function") {
      view.scrollTo(0, savedTop)
    }
  }

  const ensureAudio = () => {
    const desiredSrc = resolveAudioSource()

    if (!desiredSrc) {
      throw new Error("KIOSK_AUDIO_UNAVAILABLE: no backend audio source is available for the current screen.")
    }

    if (state.activeAudio?.src === desiredSrc) {
      if ("muted" in state.activeAudio) {
        state.activeAudio.muted = state.isMuted
      }
      return state.activeAudio
    }

    destroyAudio()
    const audio = createAudio(desiredSrc)

    if (!audio || typeof audio.play !== "function" || typeof audio.pause !== "function") {
      throw new Error("Kiosk audio controller is required.")
    }

    if ("src" in audio && !audio.src) {
      audio.src = desiredSrc
    }

    if ("muted" in audio) {
      audio.muted = state.isMuted
    }

    state.activeAudio = audio
    return audio
  }

  const stopPlayback = (nextStatus = "paused") => {
    destroyAudio()
    state.playbackStatus = nextStatus
    state.playbackErrorMessage = ""
    render()
  }

  const playAudio = async () => {
    try {
      const audio = ensureAudio()
      await audio.play()
      state.playbackStatus = "playing"
      state.playbackErrorMessage = ""
      render()
    } catch (error) {
      state.playbackStatus = "failed"
      state.playbackErrorMessage = error instanceof Error ? error.message : "unknown error."
      render()
    }
  }

  const resetInteractiveState = () => {
    destroyAudio()
    resetPlaybackState()
    state.selectedProductId = null
    state.productDetailLoadState = "idle"
    state.productDetailErrorMessage = ""
    state.productDetailData = null
  }

  const load = async () => {
    destroyAudio()
    state.loadState = "loading"
    state.errorMessage = ""
    state.activeHallSlot = 0
    state.screen = "home"
    resetInteractiveState()
    render()

    try {
      state.config = await loadAppConfig()
      state.loadState = "ready"
      render()
    } catch (error) {
      state.loadState = "error"
      state.errorMessage = error instanceof Error ? error.message : "SHOWROOM_APP_CONFIG_UNAVAILABLE: unknown error."
      render()
    }
  }

  const shiftCategory = (delta) => {
    if (state.loadState !== "ready" || !state.config) {
      return
    }

    const totalSlots = state.config.showrooms.length + 1
    state.activeHallSlot = (state.activeHallSlot + delta + totalSlots) % totalSlots
    state.screen = state.activeHallSlot === 0 ? "home" : "gallery"
    resetInteractiveState()
    render()
  }

  const openCompanyDetail = () => {
    if (state.loadState !== "ready" || !state.config) {
      return
    }

    saveBrowseScrollPosition()
    destroyAudio()
    resetPlaybackState()
    state.screen = "company"
    render()
    restoreBrowseScrollPosition()
  }

  const openProductDetail = async (productId) => {
    if (state.loadState !== "ready" || !state.config) {
      return
    }

    const hall = getActiveHall()
    const product = hall?.products.find((item) => item.id === productId)

    if (!product) {
      return
    }

    saveBrowseScrollPosition()
    destroyAudio()
    resetPlaybackState()
    state.screen = "product"
    state.selectedProductId = product.id
    state.productDetailLoadState = "loading"
    state.productDetailErrorMessage = ""
    state.productDetailData = null
    render()

    try {
      state.productDetailData = await loadProductDetail(product.id)
      state.productDetailLoadState = "ready"
      render()
    } catch (error) {
      state.productDetailLoadState = "error"
      state.productDetailErrorMessage =
        error instanceof Error ? error.message : "SHOWROOM_PRODUCT_DETAIL_UNAVAILABLE: unknown error."
      render()
    }
  }

  const backToGallery = () => {
    if (state.loadState !== "ready") {
      return
    }

    destroyAudio()
    resetPlaybackState()
    state.screen = state.activeHallSlot === 0 ? "home" : "gallery"
    state.selectedProductId = null
    state.productDetailLoadState = "idle"
    state.productDetailErrorMessage = ""
    state.productDetailData = null
    render()
    restoreBrowseScrollPosition()
  }

  const togglePlayback = async () => {
    if (state.audioSource === "") {
      return
    }

    if (state.playbackStatus === "playing") {
      stopPlayback("paused")
      return
    }

    await playAudio()
  }

  const toggleMute = () => {
    state.isMuted = !state.isMuted

    if (state.activeAudio && "muted" in state.activeAudio) {
      state.activeAudio.muted = state.isMuted
    }

    render()
  }

  const switchLanguage = (nextLanguage) => {
    const resolvedLanguage = resolveLanguage(nextLanguage)

    if (resolvedLanguage === state.language) {
      return
    }

    destroyAudio()
    resetPlaybackState()
    state.language = resolvedLanguage
    persistLanguage(storage, resolvedLanguage)
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

    const target = event.target instanceof Element ? event.target : null

    if (!target) {
      return
    }

    const languageButton = target.closest("[data-language-option]")
    if (languageButton instanceof HTMLElement) {
      switchLanguage(languageButton.dataset.languageOption)
      return
    }


    if (target.closest("[data-retry-load]")) {
      void load()
      return
    }

    if (target.closest("[data-shift-category='-1']")) {
      shiftCategory(-1)
      return
    }

    if (target.closest("[data-shift-category='1']")) {
      shiftCategory(1)
      return
    }

    if (target.closest("[data-home-company-entry-card]")) {
      openCompanyDetail()
      return
    }

    if (target.closest("[data-company-back]")) {
      backToGallery()
      return
    }

    const productCard = target.closest("[data-product-id]")
    if (productCard instanceof HTMLElement && productCard.dataset.productId) {
      void openProductDetail(productCard.dataset.productId)
      return
    }

    if (target.closest("[data-back-to-gallery]")) {
      backToGallery()
      return
    }

    if (target.closest("[data-speech-toggle]")) {
      void togglePlayback()
      return
    }

    if (target.closest("[data-speech-mute-toggle]")) {
      toggleMute()
    }
  })

  void load()

  return {
    reload: load
  }
}
