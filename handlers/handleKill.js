const handleKill = (appStore, resize) => {
  const { listeners, container, scrollbar } = appStore.get()

  if (scrollbar) scrollbar.kill()
  container.kill()
  listeners.kill()
  window.removeEventListener('resize', resize)
}

export default handleKill
