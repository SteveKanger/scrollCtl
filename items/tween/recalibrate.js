import update from './update'
import construct from './construct'

const tweenRecalibrate = (store, tween) => {
  let { updateVars } = tween
  const { inputData } = tween
  const { el, timeline } = updateVars
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
  }
}

export default tweenRecalibrate
