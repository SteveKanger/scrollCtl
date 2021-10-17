const handleModifyItem = (controllerVars, id, data) => {
  const { items } = controllerVars.get()
  const item = items.find((item) => item.id === id)
  if (item) item.modify(data)
}

export default handleModifyItem
