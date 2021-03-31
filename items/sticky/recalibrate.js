import update from './update'
import construct from './construct'

const stickyRecalibrate = (store, sticky) => {
  let { updateVars } = sticky
  const { inputData } = sticky
  const { el } = updateVars
  const { start, distance } = construct(store, el, inputData)

  updateVars = {
    ...updateVars,
    start,
    distance,
  }

  update(store, updateVars)

  return {
    ...sticky,
    updateVars,
  }
}

export default stickyRecalibrate
