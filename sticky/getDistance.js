import getParentPadding from '../utils/getParentPadding'
import getElementMargin from '../utils/getElementMargin'

const getDistance = (controllerVars, stickyVars) => {
  const { options, limit } = controllerVars.get()
  const { layoutHorizontal } = options
  const { el, offsets, start, ignoreBounds } = stickyVars.get()

  if (ignoreBounds) {
    stickyVars.set('distance', limit - start - offsets.end)
    return
  }

  const elRect = el.getBoundingClientRect()
  const parentPadding = getParentPadding(el)
  const elMargin = getElementMargin(el)
  const parentRect = el.parentNode.getBoundingClientRect()
  const parentAspect = layoutHorizontal ? parentRect.width : parentRect.height
  const selfAspect = layoutHorizontal ? elRect.width : elRect.height

  stickyVars.set(
    'distance',
    parentAspect - selfAspect - parentPadding - elMargin - offsets.end
  )
}

export default getDistance
