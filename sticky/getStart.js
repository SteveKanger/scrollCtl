import getOffsetStart from '../utils/getOffsetStart'

const getStart = (controllerVars, stickyVars) => {
  const { el, offsets } = stickyVars.get()
  const { container, layoutHorizontal } = controllerVars.get().options

  const offsetStart = getOffsetStart(el, container, layoutHorizontal)
  stickyVars.set('start', offsetStart - offsets.start)
}

export default getStart
