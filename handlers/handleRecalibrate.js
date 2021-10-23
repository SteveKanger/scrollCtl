const handleRecalibrate = (ctlStore) => {
  const { items, container, scrollbar } = ctlStore.get()
  const recalibratedItems = items.map((item) => item.recalibrate())
  ctlStore.set('items', recalibratedItems)

  container.recalibrate()
  if (scrollbar) scrollbar.recalibrate()
}

export default handleRecalibrate
