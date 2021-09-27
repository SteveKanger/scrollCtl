const getElementHeight = (el, layoutHorizontal) => {
  const rect = el.getBoundingClientRect()
  return layoutHorizontal ? rect.width : rect.height
}

export default getElementHeight
