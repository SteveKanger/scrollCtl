import getDisplacement from './getDisplacement'
import getOffsetStart from '../utils/getOffsetStart'
import inInitialView from '../utils/inInitialView'
import getViewportHeight from '../utils/getViewportHeight'

const getDistance = (controllerVars, tweenVars) => {
  const { container, viewport, layoutHorizontal } = controllerVars.get().options
  const { trigger, ignoreIntialView, offsets } = tweenVars.get()

  const displacement = getDisplacement(controllerVars, tweenVars)
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
