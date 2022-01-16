const handleRecalibrate = (ctlStore) => {
  const { items, container, scrollbar } = ctlStore.get()
  container.recalibrate()
  if (scrollbar) scrollbar.recalibrate()
  items.forEach((item) => item.recalibrate())
}

export default handleRecalibrate
