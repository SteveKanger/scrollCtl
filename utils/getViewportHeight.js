import isElement from './isElement'

const getViewportHeight = (viewport, layoutHorizontal) => {
  if (viewport) {
    if (!isElement(viewport))
      throw new Error('The viewport option needs to be a valid elememt')

    const rect = viewport.getBoundingClientRect()
    return layoutHorizontal ? rect.width : rect.height
  }

  return layoutHorizontal ? window.innerWidth : window.innerHeight
}

export default getViewportHeight
