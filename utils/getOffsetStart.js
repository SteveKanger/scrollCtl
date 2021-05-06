const getOffsetStart = (el, container, layoutHorizontal) => {
  const elRect = el.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  return layoutHorizontal
    ? elRect.left - containerRect.left
    : elRect.top - containerRect.top
}

export default getOffsetStart
