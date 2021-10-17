import createVars from '../helpers/createVars'
import createId from '../utils/createId'
import tweenConstruct from './tweenConstruct'
import tweenUpdate from './tweenUpdate'
import isElement from '../utils/isElement'
import setData from './setData'
import modifyData from './modifyData'

const tweenCreate = (controllerVars, data) => {
  if (!data.to)
    throw new Error('You need to specify a -- to -- object for tweening')

  if (!data.el || !isElement(data.el))
    throw new Error(
      'You need to specify a valid dom node to add a tween to controller'
    )

  const tweenVars = createVars({
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
  setData(tweenVars, data)

  const construct = () => tweenConstruct(controllerVars, tweenVars)
  const update = () => tweenUpdate(controllerVars, tweenVars)

  const kill = () => {
    const { timeline } = tweenVars.get()
    timeline.kill()
  }

  const recalibrate = () => {
    construct()
    update()
  }

  const modify = (newData) => {
    modifyData(tweenVars, newData)
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
