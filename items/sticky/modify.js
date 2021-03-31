import update from './update'
import construct from './construct'

const stickyModify = (store, sticky, newInputData) => {
  let { inputData } = sticky
  inputData = {
    ...inputData,
    ...newInputData,
  }

  let { updateVars } = sticky
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
    inputData,
  }
}

export default stickyModify
