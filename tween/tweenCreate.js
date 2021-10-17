import createStore from '../helpers/createStore'
import createId from '../utils/createId'
import tweenConstruct from './tweenConstruct'
import tweenUpdate from './tweenUpdate'
import isElement from '../utils/isElement'
import setData from './setData'
import modifyData from './modifyData'

const tweenCreate = (appStore, data) => {
  if (!data.to)
    throw new Error('You need to specify a -- to -- object for tweening')

  if (!data.el || !isElement(data.el))
    throw new Error(
      'You need to specify a valid dom node to add a tween to controller'
    )

  const tweenStore = createStore({
    data: null,
    el: null,
    to: {},
    from: {},
    trigger: null,
    start: 0,
    distance: 0,
    timeline: () => {},
    peak: 1,
    ignoreInitialView: false,
    callback: () => {},
    offsets: {
      start: 0,
      end: 0,
      total: 0,
    },
  })

  const id = createId()
  setData(tweenStore, data)

  const construct = () => tweenConstruct(appStore, tweenStore)
  const update = () => tweenUpdate(appStore, tweenStore)

  const kill = () => {
    const { timeline } = tweenStore.get()
    timeline.kill()
  }

  const recalibrate = () => {
    construct()
    update()
  }

  const modify = (newData) => {
    modifyData(tweenStore, newData)
    construct()
    update()
  }

  construct()

  return {
    id,
    update,
    recalibrate,
    modify,
    kill,
  }
}

export default tweenCreate
