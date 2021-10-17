import lerp from '../utils/lerp'

const render = (controllerVars, update, { deltaY }) => {
  const animate = () => {
    let { scroll, delta, aF, options } = controllerVars.get()
    const diff = delta - scroll

    if (Math.abs(diff) > 0.2) {
      scroll = lerp(scroll, delta, options.ease)
      controllerVars.set('aF', requestAnimationFrame(animate))
    } else {
      if (aF) cancelAnimationFrame(aF)
      scroll = delta
      controllerVars.set('aF', null)
    }

    controllerVars.set('scroll', scroll)
    controllerVars.set('delta', delta)
    update()
  }

  let { scroll, delta, limit, aF } = controllerVars.get()
  delta -= deltaY

  if (delta < 0) delta = 0
  if (delta > limit) delta = limit
  controllerVars.set('delta', delta)

  if (delta !== scroll && !aF)
    controllerVars.set('aF', requestAnimationFrame(animate))
}

export default render
