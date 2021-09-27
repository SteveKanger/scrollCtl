import isElement from '../utils/isElement'
import handleScrollTo from './handleScrollTo'

const handleScrollToElement = (
  appStore,
  update,
  render,
  el,
  offset = 0,
  useAnimation = true
) => {
  const { options, scroll } = appStore.get()
  const { layoutHorizontal, viewport } = options

  let viewportTop
  if (isElement(viewport)) {
    const viewportRect = viewport.getBoundingClientRect()
    viewportTop = layoutHorizontal ? viewportRect.left : viewportRect.top
  } else viewportTop = 0

  const rect = el.getBoundingClientRect()
  let elOffset = layoutHorizontal ? rect.left : rect.top
  let position = elOffset + scroll - offset - viewportTop

  handleScrollTo(appStore, update, render, position, useAnimation)
}

export default handleScrollToElement
