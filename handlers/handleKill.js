const handleKill = (controllerVars, resize) => {
  const { listeners, container, scrollbar, items } = controllerVars.get()

  if (scrollbar) scrollbar.kill()
  container.kill()
  listeners.kill()
  items.forEach((item) => item.kill())
  window.removeEventListener('resize', resize)
}

export default handleKill
