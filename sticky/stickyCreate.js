import isElement from '../utils/isElement'
import createId from '../utils/createId'
import createStore from '../helpers/createStore'
import stickyUpdate from './stickyUpdate'
import stickyConstruct from './stickyConstruct'
import setData from './setData'
import modifyData from './modifyData'

const stickyCreate = (appStore, data) => {
  if (!data.el || !isElement(data.el))
    throw new Error(
      'You need to specify a valid dom node to add a tween to controller'
    )

  const stickyStore = createStore({
    el: null,
    start: 0,
    distance: 0,
    callback: () => {},
    ignoreBounds: false,
    offsets: null,
  })

  const id = createId()
  setData(stickyStore, data)

  const construct = () => stickyConstruct(appStore, stickyStore)
  const update = () => stickyUpdate(appStore, stickyStore)
  const kill = () => {}
  const recalibrate = () => construct()

  const modify = (newData) => {
    modifyData(stickyStore, newData)
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
