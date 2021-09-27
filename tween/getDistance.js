import getDisplacement from './getDisplacement'
import getOffsetStart from '../utils/getOffsetStart'
import inInitialView from '../utils/inInitialView'
import getViewportHeight from '../utils/getViewportHeight'

const getDistance = (appStore, tweenStore) => {
  const { container, viewport, layoutHorizontal } = appStore.get().options
  const { trigger, ignoreIntialView, offsets } = tweenStore.get()

  const displacement = getDisplacement(appStore, tweenStore)
  const offsetStart = getOffsetStart(trigger, container, layoutHorizontal)

  if (
    inInitialView(trigger, container, viewport, layoutHorizontal) &&
    !ignoreIntialView
  ) {
    const viewportHeight = getViewportHeight(viewport, layoutHorizontal)
    return offsetStart + displacement - viewportHeight - offsets.total
  }

  return displacement - offsets.total
}

export default getDistance
