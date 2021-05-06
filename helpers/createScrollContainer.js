import getContainerHeight from '../utils/getContainerHeight'
import getViewportHeight from '../utils/getViewportHeight'

const createScrollContainer = (store, run) => {
  let touchStartY
  let bodyTouchAction
  const hasWheelEvent = 'onwheel' in document
  const hasMouseWheelEvent = 'onmousewheel' in document
  const hasTouch = 'ontouchstart' in document
  const hasTouchWin =
    navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1
  const hasPointer = !!window.navigator.msPointerEnabled
  const hasKeyDown = 'onkeydown' in document
  const isFirefox = navigator.userAgent.indexOf('Firefox') > -1

  const onWheel = (e) => {
    const { options } = store.get()
    let delta = e.wheelDeltaY || e.deltaY * -1
    if (isFirefox && e.deltaMode === 1) delta *= options.firefoxMult
    delta *= options.mouseMult
    run(delta)
  }

  const onMouseWheel = (e) => {
    let delta = e.wheelDeltaY ? e.wheelDeltaY : e.wheelDelta
    run(delta)
  }

  const onTouchStart = (e) => {
    const t = e.targetTouches ? e.targetTouches[0] : e
    touchStartY = t.pageY
  }

  const onTouchMove = (e) => {
    const { options } = store.get()
    const t = e.targetTouches ? e.targetTouches[0] : e
    let delta = (t.pageY - touchStartY) * options.touchMult
    touchStartY = t.pageY
    run(delta)
  }

  const onKeyDown = (e) => {
    const { options } = store.get()
    let delta = 0
    const codes = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      SPACE: 32,
      TAB: 9,
      PAGEUP: 33,
      PAGEDOWN: 34,
      HOME: 36,
      END: 35,
    }
    switch (e.keyCode) {
      case codes.UP:
        delta = options.keyStep
        break
      case codes.DOWN:
        delta = -options.keyStep
        break
      case codes.PAGEUP:
        delta += window.innerHeight
        break
      case codes.PAGEDOWN:
        delta -= window.innerHeight
        break
      case codes.HOME:
        delta += options.container.clientHeight - window.innerHeight
        break
      case codes.END:
        delta -= options.container.clientHeight - window.innerHeight
        break
      case codes.SPACE:
        if (
          !(document.activeElement instanceof HTMLInputElement) &&
          !(document.activeElement instanceof HTMLTextAreaElement)
        ) {
          if (e.shiftKey) {
            delta -= window.innerHeight
          } else {
            delta += window.innerHeight
          }
        }
        break
      default:
        return
    }

    run(delta)
  }

  const setLimit = () => {
    let { options, scroll, limit, delta } = store.get()
    const { viewport, container, layoutHorizontal } = options
    const containerHeight = getContainerHeight(container, layoutHorizontal)
    const viewportHeight = getViewportHeight(viewport, layoutHorizontal)
    limit = containerHeight - viewportHeight
    if (containerHeight < viewportHeight) {
      limit = delta = scroll = 0
    } else if (scroll > limit) {
      delta = scroll = limit
    }
    store.dispatch({ type: 'SET_LIMIT', payload: limit })
    store.dispatch({ type: 'SET_DELTA', payload: delta })
    store.dispatch({ type: 'SET_SCROLL', payload: scroll })
    update()
  }

  const update = () => {
    const { scroll, options } = store.get()
    options.container.style.transform = options.layoutHorizontal
      ? `matrix3d(
      1,0,0,0,
      0,1,0,0,
      0,0,1,0,
      ${-scroll},0,0,1
    )`
      : `matrix3d(
      1,0,0,0,
      0,1,0,0,
      0,0,1,0,
      0,${-scroll},0,1
    )`
  }

  const init = () => {
    const { options } = store.get()
    const scrollTrigger = options.scrollTrigger || options.container
    if (hasKeyDown) document.addEventListener('keydown', onKeyDown)
    if (hasWheelEvent) scrollTrigger.addEventListener('wheel', onWheel)
    if (hasMouseWheelEvent)
      scrollTrigger.addEventListener('mousewheel', onMouseWheel)
    if (hasTouch) {
      scrollTrigger.addEventListener('touchstart', onTouchStart)
      scrollTrigger.addEventListener('touchmove', onTouchMove)
    }
    if (hasPointer && hasTouchWin) {
      bodyTouchAction = document.body.style.msTouchAction
      document.body.style.msTouchAction = 'none'
      scrollTrigger.addEventListener('MSPointerDown', onTouchStart, true)
      scrollTrigger.addEventListener('MSPointerMove', onTouchMove, true)
    }
    setLimit()
  }

  const kill = () => {
    const { options } = store.get()
    const scrollTrigger = options.scrollTrigger || options.container
    if (hasKeyDown) document.removeEventListener('keydown', onKeyDown)
    if (hasWheelEvent) options.container.removeEventListener('wheel', onWheel)
    if (hasMouseWheelEvent)
      scrollTrigger.removeEventListener('mousewheel', onMouseWheel)
    if (hasTouch) {
      scrollTrigger.removeEventListener('touchstart', onTouchStart)
      scrollTrigger.removeEventListener('touchmove', onTouchMove)
    }
    if (hasPointer && hasTouchWin) {
      document.body.style.msTouchAction = bodyTouchAction
      scrollTrigger.removeEventListener('MSPointerDown', onTouchStart, true)
      scrollTrigger.removeEventListener('MSPointerMove', onTouchMove, true)
    }
  }

  const recalibrate = () => setLimit()

  init()

  return {
    update,
    recalibrate,
    kill,
  }
}

export default createScrollContainer
