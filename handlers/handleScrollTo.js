const handleScrollTo = (
  controllerVars,
  update,
  render,
  position,
  useAnimation = true
) => {
  const { limit, delta } = controllerVars.get()
  if (useAnimation) {
    const deltaY = -(position - delta)
    render({ deltaY })
  } else {
    if (position > limit) position = limit
    else if (position < 0) position = 0
    controllerVars.set('scroll', position)
    controllerVars.set('delta', position)
    update()
  }
}

export default handleScrollTo
