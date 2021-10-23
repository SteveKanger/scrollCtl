const handleResize = (ctlStore) => {
  const { container, scrollbar, items } = ctlStore.get()

  if (scrollbar) scrollbar.recalibrate()
  container.recalibrate()
  items.forEach((item) => item.recalibrate())
}

export default handleResize
