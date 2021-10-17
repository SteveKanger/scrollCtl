const handleRecalibrate = (controllerVars) => {
  const { items, container, scrollbar } = controllerVars.get()
  const recalibratedItems = items.map((item) => item.recalibrate())
  controllerVars.set('items', recalibratedItems)

  container.recalibrate()
  if (scrollbar) scrollbar.recalibrate()
}

export default handleRecalibrate
