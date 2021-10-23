const handleModifyItem = (ctlStore, id, data) => {
  const { items } = ctlStore.get()
  const item = items.find((item) => item.id === id)
  if (item) item.modify(data)
}

export default handleModifyItem
