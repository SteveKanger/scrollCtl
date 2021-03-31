const getOffsetTop = (el, container) => {
  const elRect = rect(el)
  const containerRect = rect(container)
  return Math.abs(containerRect.top) + elRect.top
}

export default getOffsetTop
