import isElement from '../utils/isElement'
import handleScrollTo from './handleScrollTo'

const handleScrollToElement = (
  controllerVars,
  update,
  render,
  el,
  offset = 0,
  useAnimation = true
) => {
  const { options, scroll } = controllerVars.get()
  const { layoutHorizontal, viewport } = options

  let viewportTop
  if (isElement(viewport)) {
    const viewportRect = viewport.getBoundingClientRect()
    viewportTop = layoutHorizontal ? viewportRect.left : viewportRect.top
  } else viewportTop = 0

  const rect = el.getBoundingClientRect()
  let elOffset = layoutHorizontal ? rect.left : rect.top
  let position = elOffset + scroll - offset - viewportTop

  handleScrollTo(controllerVars, update, render, position, useAnimation)
}

export default handleScrollToElement
