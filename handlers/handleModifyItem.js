const handleModifyItem = (appStore, id, data) => {
  const { items } = appStore.get()
  const item = items.find((item) => item.id === id)
  if (item) item.modify(data)
}

export default handleModifyItem
