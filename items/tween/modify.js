import { Linear } from 'gsap'
import update from './update'
import construct from './construct'

const tweenModify = (store, tween, newInputData) => {
  let { inputData } = tween
  inputData = {
    ...inputData,
    ...newInputData,
  }

  let { to } = inputData
  let { updateVars } = tween
  const { el, timeline } = updateVars

  if (to) {
    timeline
      .progress(0)
      .clear()
      .duration(1)
      .to(el, { ...to, ease: Linear.easeNone })
  }

  const { start, distance } = construct(store, el, inputData, timeline)

  updateVars = {
    ...updateVars,
    start,
    distance,
  }

  update(store, updateVars)

  return {
    ...tween,
    updateVars,
    inputData,
  }
}

export default tweenModify
