import checkInitialView from '../../../utils/checkInitialView'
import parseUnit from '../../../utils/parseUnit'

const getStart = (store, inputData, triggerRect, parsedOffsets) => {
  let { start } = inputData

  if (start) {
    start = parseUnit(start) + parsedOffsets.start
  } else {
    const { options, scroll } = store.get()
    const { layoutHorizontal } = options

    const screen = layoutHorizontal ? window.innerWidth : window.innerHeight
    const offsetStart = layoutHorizontal
      ? triggerRect.left + scroll
      : triggerRect.top + scroll

    start = checkInitialView(triggerRect, offsetStart, layoutHorizontal)
      ? 0 + parsedOffsets.start
      : offsetStart - screen + parsedOffsets.start
  }

  return start < 0 ? 0 : start
}

export default getStart
