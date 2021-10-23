const handleScrollTo = (
  ctlStore,
  update,
  render,
  position,
  useAnimation = true
) => {
  const { limit, delta } = ctlStore.get()
  if (useAnimation) {
    const deltaY = -(position - delta)
    render({ deltaY })
  } else {
    if (position > limit) position = limit
    else if (position < 0) position = 0
    ctlStore.set('scroll', position)
    ctlStore.set('delta', position)
    update()
  }
}

export default handleScrollTo
