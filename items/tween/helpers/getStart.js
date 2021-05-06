import inInitialView from '../../../utils/inInitialView'
import getOffsetStart from '../../../utils/getOffsetStart'
import getViewportHeight from '../../../utils/getViewportHeight'

const getStart = (store, el, inputData, parsedOffsets) => {
  let { trigger = el } = inputData
  const { container, viewport, layoutHorizontal } = store.get().options

  const viewportHeight = getViewportHeight(viewport, layoutHorizontal)
  const offsetStart = getOffsetStart(trigger, container, layoutHorizontal)

  return inInitialView(trigger, container, viewport, layoutHorizontal)
    ? 0 + parsedOffsets.start
    : offsetStart - viewportHeight + parsedOffsets.start
}

export default getStart
