const handleKill = (controllerVars, resize) => {
  const { listeners, container, scrollbar } = controllerVars.get()

  if (scrollbar) scrollbar.kill()
  container.kill()
  listeners.kill()
  window.removeEventListener('resize', resize)
}

export default handleKill
