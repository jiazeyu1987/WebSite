import { createAdminConsoleMarkup } from "./admin-console.js"
import { validateRuntimeConfig } from "./config-schema.js"
import { createWorkbookBinary as createWorkbookBinaryDefault, parseWorkbookBinary as parseWorkbookBinaryDefault } from "./config-workbook.js"

const workbookFileName = "showroom-config.xlsx"

const createDownloadHandler = () => (bytes, fileName) => {
  const blob = new Blob([bytes], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")

  anchor.href = url
  anchor.download = fileName
  anchor.click()

  URL.revokeObjectURL(url)
}

const getInitialShowroomId = (config) => config.showrooms[0]?.id ?? null

const getInitialProductId = (config, showroomId) =>
  config.showrooms.find((showroom) => showroom.id === showroomId)?.products[0]?.id ?? null

const getShowroomById = (config, showroomId) => config.showrooms.find((showroom) => showroom.id === showroomId) ?? null

const getProductById = (showroom, productId) => showroom?.products.find((product) => product.id === productId) ?? null

const createNavigationMarkup = (config, state) => `
  <nav class="view-switcher" aria-label="frontend-views">
    <button
      class="nav-button${state.view === "company" ? " is-active" : ""}"
      type="button"
      data-view-id="company"
    >
      公司主页
    </button>
    ${config.showrooms
      .map(
        (showroom) => `
          <button
            class="nav-button${state.view === "showroom" && state.activeShowroomId === showroom.id ? " is-active" : ""}"
            type="button"
            data-view-showroom-id="${showroom.id}"
          >
            ${showroom.name}
          </button>
        `
      )
      .join("")}
    <button
      class="nav-button nav-button--console${state.view === "admin" ? " is-active" : ""}"
      type="button"
      data-view-id="admin"
    >
      控制台
    </button>
  </nav>
`

const createAudioCard = (title, src, subtitle, language) => `
  <article class="audio-card">
    <p class="audio-card__label">${title}</p>
    <audio controls preload="none" src="${src}" data-audio-language="${language}"></audio>
    <p class="audio-card__subtitle">${subtitle}</p>
  </article>
`

const createCompanyMarkup = (company) => `
  <section class="screen screen--company" data-screen="company-home">
    <div class="hero-card">
      <div class="hero-card__image-wrap">
        <img class="hero-card__image" src="${company.homeImage}" alt="${company.name}" />
      </div>
      <div class="hero-card__content">
        <p class="eyebrow">配置驱动主页</p>
        <h2>${company.name}</h2>
        <p class="lead-copy">${company.subtitleZh}</p>
        <p class="lead-copy lead-copy--secondary">${company.subtitleEn}</p>
        <div class="audio-grid">
          ${createAudioCard("中文语音", company.audioZh, company.subtitleZh, "zh")}
          ${createAudioCard("English Audio", company.audioEn, company.subtitleEn, "en")}
        </div>
      </div>
    </div>
  </section>
`

const createProductCardsMarkup = (showroom, activeProductId) =>
  showroom.products
    .map(
      (product) => `
        <button
          class="product-card${product.id === activeProductId ? " is-active" : ""}"
          type="button"
          data-product-id="${product.id}"
          aria-pressed="${product.id === activeProductId ? "true" : "false"}"
        >
          <img class="product-card__image" src="${product.image}" alt="${product.name}" />
          <span class="product-card__name">${product.name}</span>
        </button>
      `
    )
    .join("")

const createShowroomMarkup = (config, state) => {
  const showroom = getShowroomById(config, state.activeShowroomId) ?? config.showrooms[0]
  const product =
    getProductById(showroom, state.activeProductId) ??
    showroom.products[0]

  return `
    <section class="screen screen--showroom" data-screen="showroom" data-screen-showroom-id="${showroom.id}">
      <div class="showroom-stage">
        <article class="showroom-summary">
          <div class="showroom-summary__image-wrap">
            <img class="showroom-summary__image" src="${showroom.image}" alt="${showroom.name}" />
          </div>
          <div class="showroom-summary__copy">
            <p class="eyebrow">展厅页面</p>
            <h2>${showroom.name}</h2>
            <p>当前展厅由配置表驱动，产品卡片、图片、语音和字幕全部来自工作簿。</p>
          </div>
        </article>

        <div class="showroom-layout">
          <div class="product-grid" data-product-grid>
            ${createProductCardsMarkup(showroom, product.id)}
          </div>

          <aside class="product-detail" data-product-detail data-product-detail-id="${product.id}">
            <img class="product-detail__image" src="${product.image}" alt="${product.name}" />
            <div class="product-detail__content">
              <p class="eyebrow">产品详情</p>
              <h3>${product.name}</h3>
              <p class="detail-copy">${product.subtitleZh}</p>
              <p class="detail-copy detail-copy--secondary">${product.subtitleEn}</p>
              <div class="audio-grid audio-grid--stacked">
                ${createAudioCard("中文语音", product.audioZh, product.subtitleZh, "zh")}
                ${createAudioCard("English Audio", product.audioEn, product.subtitleEn, "en")}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `
}

const createAppMarkup = (config, state) => `
  <div class="app-shell" data-active-view="${state.view}">
    <header class="app-header">
      <div class="brand-block">
        <p class="eyebrow">Medical Experience Console</p>
        <h1>${config.company.name}</h1>
        <p class="brand-copy">通过工作簿同步主页、展厅和产品内容。</p>
      </div>
      ${createNavigationMarkup(config, state)}
    </header>
    <main class="app-main">
      ${state.view === "company"
        ? createCompanyMarkup(config.company)
        : state.view === "showroom"
          ? createShowroomMarkup(config, state)
          : createAdminConsoleMarkup({
              statusMessage: state.statusMessage,
              errorMessage: state.errorMessage,
              selectedFileName: state.selectedFileName,
              config
            })}
    </main>
  </div>
`

export const createShowroomApp = (root, options = {}) => {
  if (!root) {
    throw new Error("App root element is required.")
  }

  const initialConfig = validateRuntimeConfig(options.initialConfig)
  const parseWorkbookBinary = options.parseWorkbookBinary ?? parseWorkbookBinaryDefault
  const createWorkbookBinary = options.createWorkbookBinary ?? createWorkbookBinaryDefault
  const downloadWorkbook = options.downloadWorkbook ?? createDownloadHandler()

  const state = {
    config: initialConfig,
    view: "company",
    activeShowroomId: getInitialShowroomId(initialConfig),
    activeProductId: getInitialProductId(initialConfig, getInitialShowroomId(initialConfig)),
    selectedFile: null,
    selectedFileName: "",
    statusMessage: "",
    errorMessage: ""
  }

  const render = () => {
    root.innerHTML = createAppMarkup(state.config, state)
  }

  const setCompanyView = () => {
    state.view = "company"
    render()
  }

  const setAdminView = () => {
    state.view = "admin"
    render()
  }

  const setShowroomView = (showroomId) => {
    const showroom = getShowroomById(state.config, showroomId)

    if (!showroom) {
      return
    }

    state.view = "showroom"
    state.activeShowroomId = showroom.id
    state.activeProductId = getProductById(showroom, state.activeProductId)?.id ?? showroom.products[0].id
    render()
  }

  const setActiveProduct = (productId) => {
    const showroom = getShowroomById(state.config, state.activeShowroomId)

    if (!showroom || !getProductById(showroom, productId)) {
      return
    }

    state.activeProductId = productId
    render()
  }

  const applyImportedConfig = (config, fileName) => {
    const normalized = validateRuntimeConfig(config)
    const firstShowroomId = getInitialShowroomId(normalized)

    state.config = normalized
    state.activeShowroomId = firstShowroomId
    state.activeProductId = getInitialProductId(normalized, firstShowroomId)
    state.view = "company"
    state.selectedFile = null
    state.selectedFileName = ""
    state.errorMessage = ""
    state.statusMessage = `已导入 ${fileName}。`

    render()
  }

  const importSelectedWorkbook = async () => {
    if (!state.selectedFile) {
      state.errorMessage = "请选择一个 `.xlsx` 配置表。"
      state.statusMessage = ""
      render()
      return
    }

    try {
      const binary = await state.selectedFile.arrayBuffer()
      const nextConfig = await parseWorkbookBinary(binary)
      applyImportedConfig(nextConfig, state.selectedFile.name)
    } catch (error) {
      state.errorMessage = error instanceof Error ? error.message : "配置表导入失败。"
      state.statusMessage = ""
      render()
    }
  }

  const exportCurrentWorkbook = async () => {
    try {
      const binary = await createWorkbookBinary(state.config)
      await downloadWorkbook(binary, workbookFileName)
      state.errorMessage = ""
      state.statusMessage = `已导出 ${workbookFileName}。`
      render()
    } catch (error) {
      state.errorMessage = error instanceof Error ? error.message : "配置表导出失败。"
      state.statusMessage = ""
      render()
    }
  }

  root.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null

    if (!target) {
      return
    }

    const companyButton = target.closest("[data-view-id='company']")
    if (companyButton) {
      setCompanyView()
      return
    }

    const adminButton = target.closest("[data-view-id='admin']")
    if (adminButton) {
      setAdminView()
      return
    }

    const showroomButton = target.closest("[data-view-showroom-id]")
    if (showroomButton instanceof HTMLElement) {
      setShowroomView(showroomButton.dataset.viewShowroomId)
      return
    }

    const productButton = target.closest("[data-product-id]")
    if (productButton instanceof HTMLElement) {
      setActiveProduct(productButton.dataset.productId)
      return
    }

    const importButton = target.closest("[data-action='import-workbook']")
    if (importButton) {
      void importSelectedWorkbook()
      return
    }

    const exportButton = target.closest("[data-action='export-workbook']")
    if (exportButton) {
      void exportCurrentWorkbook()
    }
  })

  root.addEventListener("change", (event) => {
    const input = event.target

    if (!(input instanceof HTMLInputElement) || input.dataset.configFileInput === undefined) {
      return
    }

    state.selectedFile = input.files?.[0] ?? null
    state.selectedFileName = state.selectedFile?.name ?? ""
    state.errorMessage = ""
    state.statusMessage = state.selectedFile ? "文件已选择，点击“一键导入”开始应用。" : ""
    render()
  })

  render()

  return {
    getConfig: () => state.config,
    importSelectedWorkbook,
    exportCurrentWorkbook,
    setCompanyView,
    setAdminView,
    setShowroomView,
    setActiveProduct
  }
}

