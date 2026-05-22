# Execution Log

- Task: `20260522-home-language-switch-flicker-analysis`
- Scope: `D:\ProjectPackage\Website\src\medical-kiosk.js`, `D:\ProjectPackage\Website\src\medical-kiosk.css`
- Mode: 只读分析，无生产代码变更

BDD: homepage language switch flicker analysis -> Given 首页已显示公司封面图 / When 用户点击中英文切换按钮 / Then 需要明确封面图闪烁与视觉拉升的代码级原因，并区分是资源切换、DOM 替换、布局变化还是样式计算差异

## Investigation Evidence

- Reproduction path:
  - 打开 `http://127.0.0.1:4173/`
  - 在首页点击 `data-language-toggle-button`
  - 观察首页封面闪烁与英文态更强的纵向拉伸

- Runtime measurement:
  - 中文态首页封面 `src` / `currentSrc`：
    - `/admin-api/infra/file/28/get/20260521/开园活动图-压缩版.jpg`
  - 英文态首页封面 `src` / `currentSrc`：
    - `/admin-api/infra/file/28/get/20260521/开园活动图-压缩版.jpg`
  - 中文态 `naturalWidth x naturalHeight`：`2343 x 1642`
  - 英文态 `naturalWidth x naturalHeight`：`2343 x 1642`
  - 中文态首页主图盒子高度约：`1817.92px`
  - 英文态首页主图盒子高度约：`3865.19px`
  - 当前图片样式：`width: 100%; height: 100%; object-fit: fill;`

## Root Cause

- 原因 1：语言切换时首页主区 DOM 被替换，导致封面图节点重建
  - `switchLanguage()` 调用 `render()`
  - `render()` 在 ready 态走 `syncReadyView()`
  - `syncReadyView()` 对首页主区执行 `screenRegion.innerHTML = createReadyScreenMarkup(...)`
  - 首页态 `createReadyScreenMarkup()` 会重新输出 `createHomeHeroMarkup()`，于是 `<img data-home-hero-image>` 整个被替换
  - 即使图片 URL 不变，浏览器仍会重新创建图片元素并重新绘制，产生闪烁感

- 原因 2：同一张图被 `object-fit: fill` 强制拉伸，而英文态容器高度显著变大
  - 首页左侧封面与右侧讲解卡片处于同一 CSS Grid 行
  - 英文态右侧讲解正文显著更长，把该行高度从约 `1818px` 顶到约 `3865px`
  - 左侧 `.kiosk-home-hero` / `.kiosk-gallery__hero-stage` 跟随同一行等高增长
  - `.kiosk-home-hero__image` 又配置了 `height: 100%; object-fit: fill;`
  - 结果是同一张 `2343x1642` 的图被强行拉进两种不同高度容器，所以英文态视觉上更像被拉长

## TDD

- N/A：本次按用户要求仅做只读分析，不进入代码修复或测试改造。
