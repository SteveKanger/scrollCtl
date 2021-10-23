import stickyCreate from '../sticky/stickyCreate'

const handleAddSticky = (ctlStore, data) => {
  const { items } = ctlStore.get()
  const sticky = stickyCreate(ctlStore, data)
  items.push(sticky)
  return sticky.id
}

export default handleAddSticky
