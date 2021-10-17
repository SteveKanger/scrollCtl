const handleResize = (controllerVars) => {
  const { container, scrollbar, items } = controllerVars.get()

  if (scrollbar) scrollbar.recalibrate()
  container.recalibrate()
  items.forEach((item) => item.recalibrate())
}

export default handleResize
