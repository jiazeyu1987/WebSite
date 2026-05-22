const escapeAttribute = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")

const serializeAttributes = (attributes = {}) =>
  Object.entries(attributes)
    .filter(([, value]) => value !== false && value !== null && value !== undefined)
    .map(([name, value]) => (value === true ? name : `${name}="${escapeAttribute(value)}"`))
    .join(" ")

export const createRuntimePlaybackIconMarkup = (isPlaying, extraAttributes = {}) => {
  const attributes = serializeAttributes({
    "data-playback-icon": true,
    "data-icon-state": isPlaying ? "pause" : "play",
    ...extraAttributes
  })

  if (isPlaying) {
    return `
      <svg class="runtime-playback-button__icon" viewBox="0 0 48 48" aria-hidden="true" ${attributes}>
        <rect x="13" y="11" width="8" height="26" rx="3.5" fill="currentColor" />
        <rect x="27" y="11" width="8" height="26" rx="3.5" fill="currentColor" />
      </svg>
    `
  }

  return `
    <svg class="runtime-playback-button__icon" viewBox="0 0 48 48" aria-hidden="true" ${attributes}>
      <path d="M18 14.5l16 9.5-16 9.5z" fill="currentColor" />
    </svg>
  `
}

export const createRuntimePlaybackButtonMarkup = ({
  isPlaying,
  label,
  className = "",
  size = "panel",
  buttonAttributes = {},
  iconAttributes = {}
}) => {
  const buttonClasses = ["runtime-playback-button", `runtime-playback-button--${size}`, className].filter(Boolean).join(" ")
  const attributes = serializeAttributes({
    type: "button",
    "aria-label": label,
    title: label,
    ...buttonAttributes
  })

  return `
    <button class="${buttonClasses}" ${attributes}>
      <span class="runtime-playback-button__icon-wrap" aria-hidden="true">
        ${createRuntimePlaybackIconMarkup(isPlaying, iconAttributes)}
      </span>
    </button>
  `
}
