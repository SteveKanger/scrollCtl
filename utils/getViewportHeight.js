import isElement from './isElement'

const getViewportHeight = (viewport, layoutHorizontal) => {
  if (viewport) {
    if (!isElement(viewport))
      throw new Error('The viewport option needs to be a valid elememt')

    const rect = viewport.getBoundingClientRect()
    const elStart = layoutHorizontal ? rect.left : rect.top
    const elEnd = layoutHorizontal ? rect.right : rect.bottom

    return elEnd - elStart
  }

  return layoutHorizontal ? window.innerWidth : window.innerHeight
}

export default getViewportHeight
