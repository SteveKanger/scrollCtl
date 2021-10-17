import VirtualScroll from './VirtualScroll'
import createStore from './createStore'

const createScrollbar = (appStore, render) => {
  const { options } = appStore.get()
  if (!options.scrollbar) return

  const scrollbarStore = createStore({
    bar: null,
    track: null,
    trackRect: null,
  })

  const vs = VirtualScroll({
    ...options,
    container: options.scrollbar,
    preventKeyStep: true,
  })

  const isVertical = () => {
    const { trackRect } = scrollbarStore.get()
    return (
      trackRect.height > trackRect.width || trackRect.height === trackRect.width
    )
  }

  const preventSelect = (e) => e.preventDefault()

  const onMouseDown = (e) => {
    onMove(e)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('selectstart', preventSelect)
  }

  const onMouseUp = (e) => {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('selectstart', preventSelect)
  }

  const onMove = (e) => {
    e.stopPropagation()
    const { trackRect } = scrollbarStore.get()
    let { limit, delta } = appStore.get()

    let pos = 0
    let deltaY
    if (isVertical()) {
      pos = e.touches ? e.touches[0].pageY : e.clientY
      deltaY = (limit / trackRect.height) * (trackRect.top - pos) + delta
    } else {
      pos = e.touches ? e.touches[0].pageX : e.clientX
      deltaY = (limit / trackRect.width) * (trackRect.left - pos) + delta
    }

    render({ deltaY })
  }

  const init = () => {
    const track = document.createElement('div')
    track.classList = 'track'
    track.style.display = 'block'
    track.style.position = 'relative'
    track.style.width = '100%'
    track.style.height = '100%'
    track.style.overflow = 'hidden'
    options.scrollbar.appendChild(track)
    scrollbarStore.set('track', track)
    scrollbarStore.set('trackRect', track.getBoundingClientRect())

    const bar = document.createElement('span')
    bar.classList = 'bar'
    bar.style.display = 'block'
    bar.style.width = '100%'
    bar.style.height = '100%'
    bar.style.position = 'absolute'
    bar.style.right = isVertical() ? '0' : '100%'
    bar.style.bottom = isVertical() ? '100%' : '0'
    bar.style.pointerEvents = 'none'
    track.appendChild(bar)
    scrollbarStore.set('bar', bar)

    track.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    vs.on(render)
  }

  const kill = () => {
    const { track } = scrollbarStore.get()
    vs.off(render)
    track.removeEventListener('mousedown', onMouseDown)
    window.removeEventListener('mouseup', onMouseUp)
    track.remove()
  }

  const update = () => {
    const { scroll, limit } = appStore.get()
    const { bar, trackRect } = scrollbarStore.get()
    const scrollbarLimit = isVertical() ? trackRect.height : trackRect.width

    const pos = (scroll / limit) * scrollbarLimit
    bar.style.transform = isVertical()
      ? `translateY(${pos}px)`
      : `translateX(${pos}px)`
  }

  const recalibrate = () => {
    const { track, bar } = scrollbarStore.get()
    scrollbarStore.set('trackRect', track.getBoundingClientRect())

    bar.style.right = isVertical() ? '0' : '100%'
    bar.style.bottom = isVertical() ? '100%' : '0'
    update()
  }

  init()

  return {
    update,
    recalibrate,
    kill,
  }
}

export default createScrollbar
