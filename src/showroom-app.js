import { fetchShowroomAppConfigPayload, mapShowroomAppConfig } from "./showroom-api.js"

const SHOWROOM_LANGUAGE_STORAGE_KEY = "showroom-language"
const SHOWROOM_LANGUAGES = new Set(["zh", "en"])

const SHOWROOM_COPY = {
  zh: {
    shellEyebrow: "Showroom App",
    runtimeEyebrow: "Showroom Runtime",
    loadingTitle: "\u6b63\u5728\u52a0\u8f7d\u516c\u53f8\u5c55\u5385\u6570\u636e",
    loadingBody: "\u5f53\u524d\u9875\u9762\u53ea\u63a5\u6536 IntRuoyi \u533f\u540d app-config \u6570\u636e\uff0c\u4e0d\u4f1a\u56de\u9000\u5230\u672c\u5730\u5047\u6570\u636e\u3002",
    errorTitle: "\u516c\u53f8\u5c55\u5385\u6570\u636e\u52a0\u8f7d\u5931\u8d25",
    retryLabel: "\u91cd\u65b0\u52a0\u8f7d",
    languageLabel: "\u8bed\u8a00\u5207\u6362",
    languageZh: "\u4e2d\u6587",
    languageEn: "English",
    landingCta: "\u70b9\u51fb\u8fdb\u5165\u516c\u53f8\u8be6\u60c5",
    headerBody: "\u516c\u5f00\u5165\u53e3\u4ec5\u5c55\u793a\u516c\u53f8\u4e3b\u89c6\u89c9\u3001\u516c\u53f8\u8be6\u60c5\u548c\u8bb2\u89e3\u64ad\u653e\u3002",
    detailEyebrow: "\u516c\u53f8\u8be6\u60c5",
    backLabel: "\u8fd4\u56de\u9996\u9875",
    playLabel: "\u64ad\u653e\u8bb2\u89e3",
    pauseLabel: "\u6682\u505c\u8bb2\u89e3",
    playbackIdle: "\u672a\u5f00\u59cb\u64ad\u653e",
    playbackPaused: "\u5df2\u6682\u505c",
    playbackPlaying: "\u6b63\u5728\u64ad\u653e\u4e2d\u6587\u8bb2\u89e3",
    playbackFailedPrefix: "\u64ad\u653e\u5931\u8d25\uff1a",
    emptyTitle: "\u6682\u65e0\u516c\u53f8\u516c\u5f00\u4fe1\u606f",
    emptyBody: "\u5f53\u524d\u516c\u53f8\u672a\u53d1\u5e03\u53ef\u5c55\u793a\u7684\u516c\u5f00\u5b57\u6bb5\u3002"
  },
  en: {
    shellEyebrow: "Showroom App",
    runtimeEyebrow: "Showroom Runtime",
    loadingTitle: "Loading company showroom data",
    loadingBody: "This page only accepts anonymous IntRuoyi app-config data and does not fall back to local mock data.",
    errorTitle: "Failed to load company showroom data",
    retryLabel: "Retry load",
    languageLabel: "Language",
    languageZh: "\u4e2d\u6587",
    languageEn: "English",
    landingCta: "View company profile",
    headerBody: "The public entry shows the company hero, company detail, and synchronized narration playback.",
    detailEyebrow: "Company Detail",
    backLabel: "Back to home",
    playLabel: "Play narration",
    pauseLabel: "Pause narration",
    playbackIdle: "Narration not started",
    playbackPaused: "Narration paused",
    playbackPlaying: "Playing English narration",
    playbackFailedPrefix: "Playback failed: ",
    emptyTitle: "No public company information",
    emptyBody: "The current company has not published any public fields."
  }
}

const isSupportedLanguage = (value) => SHOWROOM_LANGUAGES.has(value)

const getShowroomCopy = (language) => SHOWROOM_COPY[language] ?? SHOWROOM_COPY.zh

const getStorage = (root, options) => options.storage ?? root.ownerDocument?.defaultView?.localStorage ?? null

const readPersistedLanguage = (storage) => {
  const value = storage?.getItem(SHOWROOM_LANGUAGE_STORAGE_KEY) ?? "zh"
  return isSupportedLanguage(value) ? value : "zh"
}

const persistLanguage = (storage, language) => {
  storage?.setItem(SHOWROOM_LANGUAGE_STORAGE_KEY, language)
}

const getCompanyName = (company, language) => (language === "en" ? company.nameEn : company.name)
const getCompanySubtitle = (company, language) => (language === "en" ? company.subtitleEn : company.subtitleZh)
const getCompanyAudioSrc = (company, language) => (language === "en" ? company.audioEn : company.audioZh)

const getPlaybackMessage = (state) => {
  const copy = getShowroomCopy(state.language)

  if (state.playbackStatus === "playing") {
    return copy.playbackPlaying
  }

  if (state.playbackStatus === "paused") {
    return copy.playbackPaused
  }

  if (state.playbackStatus === "failed") {
    return `${copy.playbackFailedPrefix}${state.playbackErrorMessage}`
  }

  return copy.playbackIdle
}

const createLanguageToggleMarkup = (language) => {
  const copy = getShowroomCopy(language)

  return `
    <div class="showroom-language-toggle" data-language-toggle role="group" aria-label="${copy.languageLabel}">
      <button
        class="showroom-language-toggle__button"
        type="button"
        data-language-option="zh"
        aria-pressed="${language === "zh" ? "true" : "false"}"
      >
        ${copy.languageZh}
      </button>
      <button
        class="showroom-language-toggle__button"
        type="button"
        data-language-option="en"
        aria-pressed="${language === "en" ? "true" : "false"}"
      >
        ${copy.languageEn}
      </button>
    </div>
  `
}

const createLoadingMarkup = (language) => {
  const copy = getShowroomCopy(language)

  return `
    <section class="showroom-state showroom-state--loading" data-screen="showroom-loading">
      <p class="showroom-eyebrow">${copy.shellEyebrow}</p>
      <h2>${copy.loadingTitle}</h2>
      <p>${copy.loadingBody}</p>
    </section>
  `
}

const createErrorMarkup = (language, errorMessage) => {
  const copy = getShowroomCopy(language)

  return `
    <section class="showroom-state showroom-state--error" data-screen="showroom-error">
      <p class="showroom-eyebrow">${copy.shellEyebrow}</p>
      <h2>${copy.errorTitle}</h2>
      <p class="showroom-state__message" data-error-message>${errorMessage}</p>
      <button class="showroom-action" type="button" data-retry-load>${copy.retryLabel}</button>
    </section>
  `
}

const createLandingMarkup = (company, language) => {
  const copy = getShowroomCopy(language)
  const companyName = getCompanyName(company, language)

  return `
    <section class="showroom-screen showroom-screen--landing" data-screen="company-landing">
      <div class="showroom-landing">
        <button class="showroom-company-card" type="button" data-company-entry-card>
          <img
            class="showroom-company-card__image"
            data-company-entry-image
            src="${company.homeImage}"
            alt="${companyName}"
          />
          <span class="showroom-company-card__caption">
            <strong>${companyName}</strong>
            <span>${copy.landingCta}</span>
          </span>
        </button>
      </div>
    </section>
  `
}

const createCompanyFieldMarkup = (field, index) => `
  <div class="showroom-company-field" data-company-field data-company-field-index="${index}">
    <dt>${field.label}</dt>
    <dd>${field.value}</dd>
  </div>
`

const createDetailMarkup = (company, state) => {
  const copy = getShowroomCopy(state.language)
  const companyName = getCompanyName(company, state.language)
  const companySubtitle = getCompanySubtitle(company, state.language)

  return `
    <section class="showroom-screen showroom-screen--detail" data-screen="company-detail" data-company-detail>
      <div class="showroom-detail">
        <div class="showroom-detail__media">
          <img class="showroom-detail__image" src="${company.homeImage}" alt="${companyName}" />
        </div>
        <div class="showroom-detail__body">
          <header class="showroom-detail__header">
            <button class="showroom-back" type="button" data-company-back>${copy.backLabel}</button>
            <p class="showroom-eyebrow">${copy.detailEyebrow}</p>
            <h2 data-company-detail-title>${companyName}</h2>
            <p class="showroom-copy" data-company-detail-copy>${companySubtitle}</p>
          </header>

          <div class="showroom-detail__actions">
            <button class="showroom-play" type="button" data-company-play>
              ${state.playbackStatus === "playing" ? copy.pauseLabel : copy.playLabel}
            </button>
            <p class="showroom-play-state" data-company-play-state>${getPlaybackMessage(state)}</p>
          </div>

          ${
            company.publicFields.length > 0
              ? `
                <dl class="showroom-company-fields" data-company-fields>
                  ${company.publicFields.map((field, index) => createCompanyFieldMarkup(field, index)).join("")}
                </dl>
              `
              : `
                <section class="showroom-empty-state" data-company-empty-state>
                  <h3>${copy.emptyTitle}</h3>
                  <p>${copy.emptyBody}</p>
                </section>
              `
          }
        </div>
      </div>
    </section>
  `
}

const createReadyMarkup = (config, state) => {
  const copy = getShowroomCopy(state.language)
  const companyName = getCompanyName(config.company, state.language)

  return `
    <div class="showroom-ready">
      <header class="showroom-header">
        <div class="showroom-header__copy">
          <div class="showroom-header__topbar">
            <div class="showroom-header__text">
              <p class="showroom-eyebrow">${copy.runtimeEyebrow}</p>
              <h1>${companyName}</h1>
            </div>
            ${createLanguageToggleMarkup(state.language)}
          </div>
          <p class="showroom-copy">${copy.headerBody}</p>
        </div>
      </header>
      ${state.screen === "detail" ? createDetailMarkup(config.company, state) : createLandingMarkup(config.company, state.language)}
    </div>
  `
}

const createAppMarkup = (state) => `
  <div class="showroom-app" data-showroom-app data-load-state="${state.loadState}" data-language-current="${state.language}">
    ${
      state.loadState === "loading"
        ? createLoadingMarkup(state.language)
        : state.loadState === "error"
          ? createErrorMarkup(state.language, state.errorMessage)
          : createReadyMarkup(state.config, state)
    }
  </div>
`

const resolveAudioFactory = (options) => {
  const createAudio = options.createAudio ?? ((src) => new Audio(src))

  if (typeof createAudio !== "function") {
    throw new Error("Showroom app audio factory is required.")
  }

  return createAudio
}

export const createShowroomConsumerApp = (root, options = {}) => {
  if (!root) {
    throw new Error("Showroom app root element is required.")
  }

  const loadAppConfig =
    options.loadAppConfig ??
    (() =>
      fetchShowroomAppConfigPayload({
        endpoint: options.endpoint,
        fetchImpl: options.fetchImpl
      }))
  const createAudio = resolveAudioFactory(options)
  const storage = getStorage(root, options)

  const state = {
    loadState: "loading",
    errorMessage: "",
    config: null,
    screen: "landing",
    language: readPersistedLanguage(storage),
    playbackStatus: "idle",
    playbackErrorMessage: "",
    companyAudio: null
  }

  const resetPlaybackState = () => {
    state.playbackStatus = "idle"
    state.playbackErrorMessage = ""
  }

  const destroyCompanyAudio = () => {
    if (!state.companyAudio) {
      return
    }

    if (typeof state.companyAudio.pause === "function") {
      state.companyAudio.pause()
    }

    if ("currentTime" in state.companyAudio) {
      state.companyAudio.currentTime = 0
    }

    state.companyAudio = null
  }

  const render = () => {
    root.innerHTML = createAppMarkup(state)
  }

  const ensureCompanyAudio = () => {
    const desiredSrc = getCompanyAudioSrc(state.config.company, state.language)

    if (state.companyAudio?.src === desiredSrc) {
      return state.companyAudio
    }

    destroyCompanyAudio()
    const companyAudio = createAudio(desiredSrc)

    if (!companyAudio || typeof companyAudio.play !== "function" || typeof companyAudio.pause !== "function") {
      throw new Error("Showroom app audio controller is required.")
    }

    if ("src" in companyAudio && !companyAudio.src) {
      companyAudio.src = desiredSrc
    }

    state.companyAudio = companyAudio
    return companyAudio
  }

  const playCompanyAudio = async () => {
    try {
      const companyAudio = ensureCompanyAudio()
      await companyAudio.play()
      state.playbackStatus = "playing"
      state.playbackErrorMessage = ""
      render()
    } catch (error) {
      state.playbackStatus = "failed"
      state.playbackErrorMessage = error instanceof Error ? error.message : "unknown error."
      render()
    }
  }

  const setReadyState = (payload) => {
    destroyCompanyAudio()
    state.config = mapShowroomAppConfig(payload)
    state.loadState = "ready"
    state.errorMessage = ""
    state.screen = "landing"
    resetPlaybackState()
    render()
  }

  const setErrorState = (error) => {
    destroyCompanyAudio()
    state.loadState = "error"
    state.errorMessage = error instanceof Error ? error.message : "SHOWROOM_APP_CONFIG_UNAVAILABLE: unknown error."
    state.screen = "landing"
    resetPlaybackState()
    render()
  }

  const load = async () => {
    destroyCompanyAudio()
    state.loadState = "loading"
    state.errorMessage = ""
    state.screen = "landing"
    resetPlaybackState()
    render()

    try {
      setReadyState(await loadAppConfig())
    } catch (error) {
      setErrorState(error)
    }
  }

  const openCompanyDetail = () => {
    state.screen = "detail"
    render()
  }

  const returnToLanding = () => {
    destroyCompanyAudio()
    state.screen = "landing"
    resetPlaybackState()
    render()
  }

  const toggleCompanyAudio = async () => {
    if (state.playbackStatus === "playing") {
      destroyCompanyAudio()
      state.playbackStatus = "paused"
      state.playbackErrorMessage = ""
      render()
      return
    }

    await playCompanyAudio()
  }

  const switchLanguage = async (nextLanguage) => {
    if (!isSupportedLanguage(nextLanguage) || nextLanguage === state.language) {
      return
    }

    const resumeAudio = state.playbackStatus === "playing"
    const keepPaused = state.playbackStatus === "paused"

    destroyCompanyAudio()
    state.language = nextLanguage
    persistLanguage(storage, nextLanguage)

    if (resumeAudio && state.loadState === "ready" && state.config && state.screen === "detail") {
      state.playbackStatus = "playing"
      state.playbackErrorMessage = ""
      render()
      await playCompanyAudio()
      return
    }

    if (keepPaused) {
      state.playbackStatus = "paused"
      state.playbackErrorMessage = ""
    } else if (state.playbackStatus !== "failed") {
      resetPlaybackState()
    }

    render()
  }

  root.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null

    if (!target) {
      return
    }

    const languageButton = target.closest("[data-language-option]")
    if (languageButton instanceof HTMLElement) {
      void switchLanguage(languageButton.dataset.languageOption)
      return
    }

    if (target.closest("[data-retry-load]")) {
      void load()
      return
    }

    if (state.loadState !== "ready" || !state.config) {
      return
    }

    if (target.closest("[data-company-entry-card]")) {
      openCompanyDetail()
      return
    }

    if (target.closest("[data-company-back]")) {
      returnToLanding()
      return
    }

    if (target.closest("[data-company-play]")) {
      void toggleCompanyAudio()
    }
  })

  void load()

  return {
    reload: load
  }
}
