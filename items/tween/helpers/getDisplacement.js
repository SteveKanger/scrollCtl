import getViewportHeight from '../../../utils/getViewportHeight'

const getDisplacement = (store, el, inputData, timeline) => {
  const { trigger = el, peak } = inputData
  const { viewport, layoutHorizontal } = store.get().options
  const viewportHeight = getViewportHeight(viewport, layoutHorizontal)

  if (trigger !== el || peak) {
    const triggerRect = trigger.getBoundingClientRect()
    const triggerHeight = layoutHorizontal
      ? triggerRect.width
      : triggerRect.height
    return triggerHeight + viewportHeight
  }

  const elRect = el.getBoundingClientRect()
  timeline.progress(1)
  const elEndRect = el.getBoundingClientRect()
  timeline.progress(0)

  const elHeight = layoutHorizontal ? elRect.width : elRect.height

  const addedHeight = layoutHorizontal
    ? elEndRect.left + elEndRect.width - (elRect.left + elRect.width)
    : elEndRect.top + elEndRect.height - (elRect.top + elRect.height)

  return elHeight + viewportHeight + addedHeight
}

export default getDisplacement
