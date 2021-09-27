const handleRecalibrate = (appStore) => {
  const { items, container, scrollbar } = appStore.get()
  const recalibratedItems = items.map((item) => item.recalibrate())
  appStore.set('items', recalibratedItems)

  container.recalibrate()
  if (scrollbar) scrollbar.recalibrate()
}

export default handleRecalibrate
