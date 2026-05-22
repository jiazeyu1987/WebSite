# Task: 分析首页中英文切换时的封面闪烁与拉升原因

## Goal

只读分析 `D:\ProjectPackage\Website` 首页点击中英文切换按钮时出现的闪烁现象，重点明确：

- 为什么中英文切换时首页封面图会跟着切换并造成闪烁；
- 为什么两边看起来使用的是同一张封面图，但其中一边视觉上更像被拉升；
- 在不修改生产代码的前提下，给出代码级根因归因。

## Scope

- `D:\ProjectPackage\Website\doc\tasks\20260522-home-language-switch-flicker-analysis\**`
- `D:\ProjectPackage\Website\src\medical-kiosk.js`
- `D:\ProjectPackage\Website\src\medical-kiosk.css`
- 必要时只读查看相关测试

## Non-Scope

- 不修改生产代码
- 不新增 fallback、兼容分支或测试专用 UI
- 不调整首页布局、图片资源或语言切换交互

## Dependencies

- 本地源码可读
- 必要时本地页面可打开用于只读复现
- UTF-8 方式读取中文任务文档与源码

## Milestones

1. 建立任务记录并确认上一任务状态不阻塞本次分析。
2. 复核首页语言切换相关渲染逻辑与封面图渲染逻辑。
3. 归因闪烁与“拉升感”的具体原因。
4. 更新任务状态与验证结论。

## Expected Verification

- `rg -n "data-home-hero-image|data-language-toggle-button|createHomeHeroMarkup|createReadyScreenMarkup|syncReadyView|kiosk-home-hero|kiosk-home-hero__image" src/medical-kiosk.js src/medical-kiosk.css`
- 只读核对对应源码片段与截图现象

## Current Status

- Status: Completed
- Completed work:
  - 已确认上一任务 `20260522-public-voice-card-local-update` 已完成，不阻塞本次只读分析。
  - 已定位首页封面图渲染位于 `createHomeHeroMarkup()`，其 `src` 仅来自单一字段 `company.homeImage`，并不存在中英文双图切换。
  - 已定位语言切换走 `switchLanguage() -> render() -> syncReadyView()`，其中首页主区会执行 `screenRegion.innerHTML = createReadyScreenMarkup(...)`，导致首页 `<img data-home-hero-image>` 在切换语言时被整个替换。
  - 已确认首页主图样式为 `width: 100%; height: 100%; object-fit: fill;`，会强制图片跟随容器尺寸拉伸，不保留原始宽高比。
  - 已通过本地运行时测量确认：中英文切换前后主图 `src` 与 `currentSrc` 完全一致，但首页主图容器高度由中文态约 `1818px` 增长到英文态约 `3865px`，因此同一张图被拉成两种不同纵横比。
- Final verification result:
  - 结论为两个原因叠加：
    1. 语言切换时首页主区 DOM 被重建，封面图节点被替换，造成闪烁；
    2. 英文态右侧讲解文案更长，撑高整行网格高度；左侧封面图跟随同一行等高拉长，再叠加 `object-fit: fill`，造成“同图被拉升”的视觉差异。
