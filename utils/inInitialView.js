import getOffsetStart from './getOffsetStart'
import getViewportHeight from './getViewportHeight'

const inInitialView = (el, container, viewport, layoutHorizontal) => {
  const elRect = el.getBoundingClientRect()
  const offsetStart = getOffsetStart(el, container, layoutHorizontal)
  const viewportHeight = getViewportHeight(viewport, layoutHorizontal)
  const elEnd = layoutHorizontal ? elRect.right : elRect.bottom
  const elHeight = layoutHorizontal ? elRect.width : elRect.height

  return offsetStart < viewportHeight && elEnd <= viewportHeight + elHeight
    ? true
    : false
}

export default inInitialView
