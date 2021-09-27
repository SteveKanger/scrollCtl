import getOffsetStart from './getOffsetStart'
import getViewportHeight from './getViewportHeight'

const inInitialView = (el, container, viewport, layoutHorizontal) => {
  const elRect = el.getBoundingClientRect()
  const offsetStart = getOffsetStart(el, container, layoutHorizontal)
  const viewportHeight = getViewportHeight(viewport, layoutHorizontal)
  const elHeight = layoutHorizontal ? elRect.width : elRect.height
  const elEnd = offsetStart + elHeight

  return offsetStart < viewportHeight && elEnd <= viewportHeight ? true : false
}

export default inInitialView
