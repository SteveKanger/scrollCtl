import parseUnit from '../../../utils/parseUnit'

const getStart = (store, inputData, elRect) => {
  const { scroll, options } = store.get()
  const { layoutHorizontal } = options
  const { offset = 0 } = inputData

  const elStartPosition = layoutHorizontal ? elRect.left : elRect.top
  const offsetStart = elStartPosition + scroll
  const parsedOffset = parseUnit(offset)

  return offsetStart - parsedOffset
}

export default getStart
