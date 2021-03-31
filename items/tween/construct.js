import parseOffsets from './helpers/parseOffests'
import getStart from './helpers/getStart'
import getDistance from './helpers/getDistance'

const tweenConstruct = (store, el, inputData, timeline) => {
  const { trigger, offsets } = inputData

  timeline.progress(0)
  const elRect = el.getBoundingClientRect()
  const triggerRect = trigger ? trigger.getBoundingClientRect() : elRect
  const parsedOffsets = parseOffsets(offsets)
  const start = getStart(store, inputData, triggerRect, parsedOffsets)
  const distance = getDistance(
    store,
    el,
    inputData,
    timeline,
    parsedOffsets,
    elRect,
    triggerRect
  )

  return {
    start,
    distance,
  }
}

export default tweenConstruct
