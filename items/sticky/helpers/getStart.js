import parseUnit from '../../../utils/parseUnit'
import getOffsetStart from '../../../utils/getOffsetStart'

const getStart = (store, el, inputData) => {
  const { offset = 0 } = inputData
  const { container, layoutHorizontal } = store.get().options

  const offsetStart = getOffsetStart(el, container, layoutHorizontal)
  const parsedOffset = parseUnit(offset)

  return offsetStart - parsedOffset
}

export default getStart
