import isElement from '../utils/isElement'

const createScrollbar = (store, run) => {
  const { options } = store.get()
  if (!isElement(options.scrollbar)) return null

  const hasWheelEvent = 'onwheel' in document
  const hasMouseWheelEvent = 'onmousewheel' in document
  const isFirefox = navigator.userAgent.indexOf('Firefox') > -1

  const track = options.scrollbar
  let trackRect = track.getBoundingClientRect()
  let isVertical =
    trackRect.height > trackRect.width || trackRect.height === trackRect.width

  const bar = document.createElement('span')
  bar.classList = 'bar'
  bar.style.display = 'block'
  bar.style.width = '100%'
  bar.style.height = '100%'
  bar.style.position = 'absolute'
  bar.style.right = isVertical ? '0' : '100%'
  bar.style.bottom = isVertical ? '100%' : '0'
  bar.style.pointerEvents = 'none'

  track.appendChild(bar)

  const startDrag = (e) => {
    onDrag(e)
    if (e.type === 'mousedown')
      window.addEventListener('mousemove', onDrag, { passive: false })
    if (e.type === 'touchstart')
      window.addEventListener('touchmove', onDrag, { passive: false })
  }

  const endDrag = (e) => {
    if (e.type === 'mouseup')
      window.removeEventListener('mousemove', onDrag, { passive: false })
    if (e.type === 'touchend')
      window.removeEventListener('touchmove', onDrag, { passive: false })
  }

  const onDrag = (e) => {
    e.preventDefault()
    let { limit, delta } = store.get()
    let pos = 0
    if (isVertical) {
      pos = e.touches ? e.touches[0].pageY : e.clientY
      delta = (limit / trackRect.height) * (trackRect.top - pos) + delta
    } else {
      pos = e.touches ? e.touches[0].pageX : e.clientX
      delta = (limit / trackRect.width) * (trackRect.left - pos) + delta
    }
    run(delta)
  }

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

  const update = () => {
    const { scroll, limit } = store.get()
    const scrollbarLimit = isVertical ? trackRect.height : trackRect.width
    const pos = (scroll / limit) * scrollbarLimit
    bar.style.transform = isVertical
      ? `translate3d(0,${pos}px,0)`
      : `translate3d(${pos}px,0,0)`
  }

  const init = () => {
    if (hasWheelEvent) track.addEventListener('wheel', onWheel)
    if (hasMouseWheelEvent) track.addEventListener('mousewheel', onMouseWheel)
    track.addEventListener('touchstart', startDrag)
    window.addEventListener('touchend', endDrag)
    track.addEventListener('mousedown', startDrag)
    window.addEventListener('mouseup', endDrag)
    update()
  }

  const kill = () => {
    bar.remove()
    if (hasWheelEvent) track.removeEventListener('wheel', onWheel)
    if (hasMouseWheelEvent)
      track.removeEventListener('mousewheel', onMouseWheel)
    track.removeEventListener('touchstart', startDrag)
    window.removeEventListener('touchend', endDrag)
    track.removeEventListener('mousedown', startDrag)
    window.removeEventListener('mouseup', endDrag)
  }

  const recalibrate = () => {
    trackRect = track.getBoundingClientRect()
    isVertical =
      trackRect.height > trackRect.width || trackRect.height === trackRect.width
    bar.style.right = isVertical ? '0' : '100%'
    bar.style.bottom = isVertical ? '100%' : '0'
  }

  init()

  return {
    update,
    recalibrate,
    kill,
  }
}

export default createScrollbar
