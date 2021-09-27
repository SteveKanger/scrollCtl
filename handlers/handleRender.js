import lerp from '../utils/lerp'

const render = (appStore, update, { deltaY }) => {
  const animate = () => {
    let { scroll, delta, aF, options } = appStore.get()
    const diff = delta - scroll

    if (Math.abs(diff) > 0.2) {
      scroll = lerp(scroll, delta, options.ease)
      appStore.set('aF', requestAnimationFrame(animate))
    } else {
      if (aF) cancelAnimationFrame(aF)
      scroll = delta
      appStore.set('aF', null)
    }

    appStore.set('scroll', scroll)
    appStore.set('delta', delta)
    update()
  }

  let { scroll, delta, limit, aF } = appStore.get()
  delta -= deltaY

  if (delta < 0) delta = 0
  if (delta > limit) delta = limit
  appStore.set('delta', delta)

  if (delta !== scroll && !aF)
    appStore.set('aF', requestAnimationFrame(animate))
}

export default render
