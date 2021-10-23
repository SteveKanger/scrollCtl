import getViewportHeight from '../utils/getViewportHeight'
import getOffsetStart from '../utils/getOffsetStart'
import inInitialView from '../utils/inInitialView'

const getStart = (ctlStore, tweenStore) => {
  const { container, viewport, layoutHorizontal } = ctlStore.get().options
  const { trigger, offsets } = tweenStore.get()

  const viewportHeight = getViewportHeight(viewport, layoutHorizontal)
  const offsetStart = getOffsetStart(trigger, container, layoutHorizontal)

  return inInitialView(trigger, container, viewport, layoutHorizontal)
    ? 0 + offsets.start
    : offsetStart - viewportHeight + offsets.start
}

export default getStart
