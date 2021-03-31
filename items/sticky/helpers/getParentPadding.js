const getParentPadding = (el) => {
  const parent = el.parentNode
  const parentStyle = window.getComputedStyle(parent)
  const parentPaddingTop = parseFloat(parentStyle.paddingTop)
  const parentPaddingBottom = parseFloat(parentStyle.paddingBottom)

  return parentPaddingTop + parentPaddingBottom
}

export default getParentPadding
