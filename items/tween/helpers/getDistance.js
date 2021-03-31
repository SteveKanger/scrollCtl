import checkInitialView from '../../../utils/checkInitialView'
import parseUnit from '../../../utils/parseUnit'
import getDisplacement from './getDisplacement'

const getDistance = (
  store,
  el,
  inputData,
  timeline,
  parsedOffsets,
  elRect,
  triggerRect
) => {
  let { ignoreIntialView, distance } = inputData

  if (distance) distance = parseUnit(distance) - parsedOffsets.total
  else {
    const { options, scroll } = store.get()
    const { layoutHorizontal } = options
    const displacement = getDisplacement(
      store,
      el,
      inputData,
      timeline,
      elRect,
      triggerRect
    )

    const offsetStart = layoutHorizontal
      ? triggerRect.left + scroll
      : triggerRect.top + scroll

    const isInIntialView = checkInitialView(
      triggerRect,
      offsetStart,
      layoutHorizontal
    )

    if (isInIntialView && !ignoreIntialView) {
      const screen = layoutHorizontal ? window.innerWidth : window.innerHeight
      distance = offsetStart + displacement - screen - parsedOffsets.total
    } else {
      distance = displacement - parsedOffsets.total
    }
  }

  return distance > 0 ? distance : 0
}

export default getDistance
