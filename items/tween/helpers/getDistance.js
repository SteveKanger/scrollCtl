import inInitialView from '../../../utils/inInitialView'
import getDisplacement from './getDisplacement'
import getOffsetStart from '../../../utils/getOffsetStart'
import getViewportHeight from '../../../utils/getViewportHeight'

const getDistance = (store, el, inputData, timeline, parsedOffsets) => {
  let { ignoreIntialView, trigger = el } = inputData
  const { container, viewport, layoutHorizontal } = store.get().options

  const displacement = getDisplacement(store, el, inputData, timeline)
  const offsetStart = getOffsetStart(trigger, container, layoutHorizontal)

  if (
    inInitialView(trigger, container, viewport, layoutHorizontal) &&
    !ignoreIntialView
  ) {
    const viewportHeight = getViewportHeight(viewport, layoutHorizontal)
    return offsetStart + displacement - viewportHeight - parsedOffsets.total
  }

  return displacement - parsedOffsets.total
}

export default getDistance
