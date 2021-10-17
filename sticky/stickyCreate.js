import isElement from '../utils/isElement'
import createId from '../utils/createId'
import createVars from '../helpers/createVars'
import stickyUpdate from './stickyUpdate'
import stickyConstruct from './stickyConstruct'
import setData from './setData'
import modifyData from './modifyData'

const stickyCreate = (controllerVars, data) => {
  if (!data.el || !isElement(data.el))
    throw new Error(
      'You need to specify a valid dom node to add a tween to controller'
    )

  const stickyVars = createVars({
    el: null,
    start: 0,
    distance: 0,
    callback: () => {},
    ignoreBounds: false,
    offsets: null,
  })

  const id = createId()
  setData(stickyVars, data)

  const construct = () => stickyConstruct(controllerVars, stickyVars)
  const update = () => stickyUpdate(controllerVars, stickyVars)
  const kill = () => {}
  const recalibrate = () => construct()

  const modify = (newData) => {
    modifyData(stickyVars, newData)
    construct()
    update()
  }

  construct()

  return {
    id,
    update,
    kill,
    recalibrate,
    modify,
  }
}

export default stickyCreate
