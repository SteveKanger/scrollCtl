const handleScrollTo = (
  appStore,
  update,
  render,
  position,
  useAnimation = true
) => {
  const { limit, delta } = appStore.get()
  if (useAnimation) {
    const deltaY = -(position - delta)
    render({ deltaY })
  } else {
    if (position > limit) position = limit
    else if (position < 0) position = 0
    appStore.set('scroll', position)
    appStore.set('delta', position)
    update()
  }
}

export default handleScrollTo
