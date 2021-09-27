import VirtualScroll from './VirtualScroll'
import getElementHeight from '../utils/getElementHeight'
import getViewportHeight from '../utils/getViewportHeight'

const createContainer = (appStore, render) => {
  const { options } = appStore.get()
  const vs = VirtualScroll(options)

  const setLimit = () => {
    let { scroll, limit, delta } = appStore.get()
    const { viewport, container, layoutHorizontal } = options

    const containerHeight = getElementHeight(container, layoutHorizontal)
    const viewportHeight = getViewportHeight(viewport, layoutHorizontal)
    limit = containerHeight - viewportHeight

    if (containerHeight < viewportHeight) {
      limit = delta = scroll = 0
    } else if (scroll > limit) {
      delta = scroll = limit
    }

    appStore.set('limit', limit)
    appStore.set('delta', delta)
    appStore.set('scroll', scroll)

    update()
  }

  const update = () => {
    const { scroll, options } = appStore.get()
    const { layoutHorizontal } = options

    options.container.style.transform = layoutHorizontal
      ? `translateX(${-scroll}px)`
      : `translateY(${-scroll}px)`
  }

  const recalibrate = () => setLimit()

  const kill = () => {
    vs.off(render)
  }

  vs.on(render)
  setLimit()

  return {
    update,
    recalibrate,
    kill,
  }
}

export default createContainer
