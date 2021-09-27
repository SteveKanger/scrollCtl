import isElement from '../utils/isElement'
import createId from '../utils/createId'
import parseOffsets from '../utils/parseOffsets'
import createStore from '../store/createStore'
import stickyState from '../store/stickyState'
import stickyUpdate from './stickyUpdate'
import stickyConstruct from './stickyConstruct'

const stickyCreate = (appStore, data) => {
  if (!data.el || !isElement(data.el))
    throw new Error(
      'You need to specify a valid dom node to add a tween to controller'
    )

  const { el, offsets } = data

  const id = createId()
  const stickyStore = createStore({ ...stickyState })
  stickyStore.set('el', el)
  stickyStore.set('offsets', parseOffsets(offsets))

  const construct = () => stickyConstruct(appStore, stickyStore)
  const update = () => stickyUpdate(appStore, stickyStore)
  const kill = () => {}
  const recalibrate = () => construct()

  construct()

  return {
    id,
    update,
    kill,
    recalibrate,
  }
}

export default stickyCreate
