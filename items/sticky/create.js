import createId from '../../utils/createId'
import construct from './construct'
import update from './update'
import modify from './modify'
import recalibrate from './recalibrate'
import kill from './kill'

const stickyCreate = (store, el, inputData = {}) => {
  const id = createId()
  const { callback = null } = inputData
  const { start, distance } = construct(store, el, inputData)

  const updateVars = {
    el,
    start,
    distance,
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

export default stickyCreate
