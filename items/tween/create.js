import { gsap, Linear } from 'gsap'
import createId from '../../utils/createId'
import update from './update'
import recalibrate from './recalibrate'
import modify from './modify'
import construct from './construct'
import kill from './kill'

const tweenCreate = (store, el, inputData = {}) => {
  if (!inputData.to)
    throw new Error('You need to specify a -- to -- object for tweening')

  const { to, callback, peak = 1 } = inputData

  const id = createId()

  const timeline = gsap
    .timeline({ paused: true })
    .duration(1)
    .to(el, { ...to, ease: Linear.easeNone })
    .progress(0)

  const { start, distance } = construct(store, el, inputData, timeline)

  const updateVars = {
    el,
    timeline,
    start,
    distance,
    peak,
    callback,
  }

  update(store, updateVars)

  return {
    id,
    updateVars,
    inputData,
    update,
    modify,
    recalibrate,
    kill,
  }
}

export default tweenCreate
