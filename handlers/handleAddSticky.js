import stickyCreate from '../sticky/stickyCreate'

const handleAddSticky = (appStore, data) => {
  const { items } = appStore.get()
  const sticky = stickyCreate(appStore, data)
  items.push(sticky)
  return sticky.id
}

export default handleAddSticky
