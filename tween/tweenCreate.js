import { gsap, Linear } from 'gsap'
import tweenState from '../store/tweenState'
import createStore from '../store/createStore'
import createId from '../utils/createId'
import tweenConstruct from './tweenConstruct'
import tweenUpdate from './tweenUpdate'
import parseOffsets from '../utils/parseOffsets'
import isElement from '../utils/isElement'

const tweenCreate = (appStore, data) => {
  if (!data.to)
    throw new Error(
      'You need to specify a -- to -- object for tweening and a valid dom node'
    )
  if (!data.el || !isElement(data.el))
    throw new Error(
      'You need to specify a valid dom node to add a tween to controller'
    )

  const { el, to, trigger, offsets, ignoreInitialView, peak, callback } = data

  const id = createId()
  const tweenStore = createStore({ ...tweenState })

  const timeline = gsap
    .timeline({ paused: true })
    .duration(1)
    .to(el, { ...to, ease: Linear.easeNone })
    .progress(0)

  tweenStore.set('timeline', timeline)
  tweenStore.set('el', el)
  tweenStore.set('trigger', trigger || el)
  tweenStore.set('offsets', parseOffsets(offsets))
  if (ignoreInitialView) tweenStore.set('ignoreIntialView', ignoreInitialView)
  if (peak) tweenStore.set('peak', peak)
  if (callback) tweenStore.set('callback', callback)

  const construct = () => tweenConstruct(appStore, tweenStore, data)
  const update = () => tweenUpdate(appStore, tweenStore)
  const kill = () => timeline.kill()
  const recalibrate = () => {
    tweenConstruct(appStore, tweenStore, data)
    update()
  }

  construct()

  return {
    id,
    update,
    recalibrate,
    kill,
  }
}

export default tweenCreate
