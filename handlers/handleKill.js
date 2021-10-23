const handleKill = (ctlStore, resize) => {
  const { listeners, container, scrollbar, items } = ctlStore.get()

  if (scrollbar) scrollbar.kill()
  container.kill()
  listeners.kill()
  items.forEach((item) => item.kill())
  window.removeEventListener('resize', resize)
}

export default handleKill
