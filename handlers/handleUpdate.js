const handleUpdate = (controllerVars) => {
  const { container, scrollbar, items, listeners, scroll } =
    controllerVars.get()

  if (scrollbar) scrollbar.update()
  container.update()
  items.forEach((item) => item.update())

  listeners.fire('scroll', scroll)
}

export default handleUpdate
