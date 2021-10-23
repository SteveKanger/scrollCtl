import lerp from '../utils/lerp'

const render = (ctlStore, update, { deltaY }) => {
  const animate = () => {
    let { scroll, delta, aF, options } = ctlStore.get()
    const diff = delta - scroll

    if (Math.abs(diff) > 0.2) {
      scroll = lerp(scroll, delta, options.ease)
      ctlStore.set('aF', requestAnimationFrame(animate))
    } else {
      if (aF) cancelAnimationFrame(aF)
      scroll = delta
      ctlStore.set('aF', null)
    }

    ctlStore.set('scroll', scroll)
    ctlStore.set('delta', delta)
    update()
  }

  let { scroll, delta, limit, aF } = ctlStore.get()
  delta -= deltaY

  if (delta < 0) delta = 0
  if (delta > limit) delta = limit
  ctlStore.set('delta', delta)

  if (delta !== scroll && !aF)
    ctlStore.set('aF', requestAnimationFrame(animate))
}

export default render
