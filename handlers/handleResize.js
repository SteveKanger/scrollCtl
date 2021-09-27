const handleResize = (appStore) => {
  const { container, scrollbar, items } = appStore.get()

  if (scrollbar) scrollbar.recalibrate()
  container.recalibrate()
  items.forEach((item) => item.recalibrate())
}

export default handleResize
