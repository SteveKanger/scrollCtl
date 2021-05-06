import getParentPadding from './getParentPadding'
import getElementMargin from './getElementMargin'
import parseUnit from '../../../utils/parseUnit'

const getDistance = (store, el, inputData, start) => {
  const { options, limit } = store.get()
  const { layoutHorizontal } = options
  const { distance, ignoreBounds } = inputData
  if (distance) return parseUnit(distance)

  if (ignoreBounds) {
    return limit - start
  }

  const elRect = el.getBoundingClientRect()
  const parentPadding = getParentPadding(el)
  const elMargin = getElementMargin(el)
  const parentRect = el.parentNode.getBoundingClientRect()
  const parentAspect = layoutHorizontal ? parentRect.width : parentRect.height
  const selfAspect = layoutHorizontal ? elRect.width : elRect.height

  return parentAspect - selfAspect - parentPadding - elMargin
}

export default getDistance
