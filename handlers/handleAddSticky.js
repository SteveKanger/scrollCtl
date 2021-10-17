import stickyCreate from '../sticky/stickyCreate'

const handleAddSticky = (controllerVars, data) => {
  const { items } = controllerVars.get()
  const sticky = stickyCreate(controllerVars, data)
  items.push(sticky)
  return sticky.id
}

export default handleAddSticky
