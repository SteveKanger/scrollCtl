const getElementMargin = (el) => {
  const elStyle = window.getComputedStyle(el)
  const marginTop = parseFloat(elStyle.marginTop)
  const marginBottom = parseFloat(elStyle.marginBottom)

  return marginTop + marginBottom
}

export default getElementMargin
