const VirtualScroll = (initialOpts) => {
  let listeners = []
  let initialized = false
  let touchStartX
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

  const opts = Object.assign(
    {
      container: window,
      keyStep: 120,
      preventKeyStep: false,
      firefoxMult: 15,
      touchMult: 2,
      mouseMult: 1,
      preventClass: 'vs-prevent',
    },
    initialOpts
  )

  const event = {
    y: 0,
    x: 0,
    deltaX: 0,
    deltaY: 0,
    originalEvent: null,
  }

  const notify = (e) => {
    event.x += event.deltaX
    event.y += event.deltaY
    event.originalEvent = e

    for (var i = 0; i < listeners.length; i++) {
      listeners[i](event)
    }
  }

  const hasPreventClass = (target) => {
    while (target) {
      if (target.classList.contains(opts.preventClass)) return true
      target = target.parentElement
    }
    return false
  }

  const onWheel = (e) => {
    if (hasPreventClass(e.target)) return

    event.deltaX = e.wheelDeltaX || e.deltaX * -1
    event.deltaY = e.wheelDeltaY || e.deltaY * -1

    if (isFirefox && e.deltaMode === 1) {
      event.deltaX *= opts.firefoxMult
      event.deltaY *= opts.firefoxMult
    }

    event.deltaX *= opts.mouseMult
    event.deltaY *= opts.mouseMult

    notify(e)
  }

  const onMouseWheel = (e) => {
    if (hasPreventClass(e.target)) return

    event.deltaX = e.wheelDeltaX ? e.wheelDeltaX : 0
    event.deltaY = e.wheelDeltaY ? e.wheelDeltaY : e.wheelDelta

    notify(e)
  }

  const onTouchStart = (e) => {
    if (hasPreventClass(e.target)) return

    const t = e.targetTouches ? e.targetTouches[0] : e
    touchStartX = t.pageX
    touchStartY = t.pageY
  }

  const onTouchMove = (e) => {
    if (hasPreventClass(e.target)) return

    const t = e.targetTouches ? e.targetTouches[0] : e
    event.deltaX = (t.pageX - touchStartX) * opts.touchMult
    event.deltaY = (t.pageY - touchStartY) * opts.touchMult
    touchStartX = t.pageX
    touchStartY = t.pageY

    notify(e)
  }

  const onKeyDown = (e) => {
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

    event.deltaX = event.deltaY = 0

    switch (e.keyCode) {
      case codes.LEFT:
        event.deltaX = -opts.keyStep
        break
      case codes.UP:
        event.deltaY = opts.keyStep
        break
      case codes.RIGHT:
        event.deltaX = opts.keyStep
        break
      case codes.DOWN:
        event.deltaY = -opts.keyStep
        break
      case codes.PAGEUP:
        event.deltaY += window.innerHeight
        break
      case codes.PAGEDOWN:
        event.deltaY -= window.innerHeight
        break
      case codes.HOME:
        event.deltaY += opts.container.clientHeight - window.innerHeight
        break
      case codes.END:
        event.deltaY -= opts.container.clientHeight - window.innerHeight
        break
      case codes.SPACE:
        if (
          !(document.activeElement instanceof HTMLInputElement) &&
          !(document.activeElement instanceof HTMLTextAreaElement)
        ) {
          if (e.shiftKey) {
            event.deltaY -= window.innerHeight
          } else {
            event.deltaY += window.innerHeight
          }
        }
        break
      default:
        return
    }

    notify(e)
  }

  const initListeners = () => {
    if (hasKeyDown && !opts.preventKeyStep)
      document.addEventListener('keydown', onKeyDown)
    if (hasWheelEvent) opts.container.addEventListener('wheel', onWheel)
    if (hasMouseWheelEvent)
      opts.container.addEventListener('mousewheel', onMouseWheel)
    if (hasTouch) {
      opts.container.addEventListener('touchstart', onTouchStart)
      opts.container.addEventListener('touchmove', onTouchMove)
    }
    if (hasPointer && hasTouchWin) {
      bodyTouchAction = document.body.style.msTouchAction
      document.body.style.msTouchAction = 'none'
      opts.container.addEventListener('MSPointerDown', onTouchStart, true)
      opts.container.addEventListener('MSPointerMove', onTouchMove, true)
    }

    initialized = true
  }

  const destroyListeners = () => {
    if (hasKeyDown && !opts.preventKeyStep)
      document.removeEventListener('keydown', onKeyDown)
    if (hasWheelEvent) opts.container.removeEventListener('wheel', onWheel)
    if (hasMouseWheelEvent)
      opts.container.removeEventListener('mousewheel', onMouseWheel)
    if (hasTouch) {
      opts.container.removeEventListener('touchstart', onTouchStart)
      opts.container.removeEventListener('touchmove', onTouchMove)
    }
    if (hasPointer && hasTouchWin) {
      document.body.style.msTouchAction = bodyTouchAction
      opts.container.removeEventListener('MSPointerDown', onTouchStart, true)
      opts.container.removeEventListener('MSPointerMove', onTouchMove, true)
    }

    initialized = false
  }

  const on = (fn) => {
    if (!initialized) initListeners()
    listeners.push(fn)
  }

  const off = (fn) => {
    listeners.splice(fn, 1)
    if (listeners.length <= 0) destroyListeners()
  }

  return {
    on,
    off,
  }
}

export default VirtualScroll
