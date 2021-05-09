const getContainerHeight = (container, layoutHorizontal) => {
  const containerRect = container.getBoundingClientRect()
  const containerBeginning = layoutHorizontal
    ? containerRect.left
    : containerRect.top
  const containerEnd = layoutHorizontal
    ? containerRect.right
    : containerRect.bottom

  return Math.round(Math.abs(containerBeginning) + containerEnd)
}

export default getContainerHeight
