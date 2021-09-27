import getParentPadding from '../utils/getParentPadding'
import getElementMargin from '../utils/getElementMargin'
import parseUnit from '../utils/parseUnit'

const getDistance = (appStore, stickyStore) => {
  const { options, limit } = appStore.get()
  const { layoutHorizontal } = options
  const { el, offsets, start, ignoreBounds } = stickyStore.get()

  if (ignoreBounds) {
    return limit - start
  }

  const elRect = el.getBoundingClientRect()
  const parentPadding = getParentPadding(el)
  const elMargin = getElementMargin(el)
  const parentRect = el.parentNode.getBoundingClientRect()
  const parentAspect = layoutHorizontal ? parentRect.width : parentRect.height
  const selfAspect = layoutHorizontal ? elRect.width : elRect.height

  stickyStore.set(
    'distance',
    parentAspect - selfAspect - parentPadding - elMargin - offsets.end
  )
}

export default getDistance
