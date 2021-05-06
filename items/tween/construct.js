import parseUnit from '../../utils/parseUnit'
import parseOffsets from './helpers/parseOffests'
import getStart from './helpers/getStart'
import getDistance from './helpers/getDistance'

const tweenConstruct = (store, el, inputData, timeline) => {
  let { offsets, start, distance } = inputData

  timeline.progress(0)
  const parsedOffsets = parseOffsets(offsets)

  start = start
    ? parseUnit(start) + parsedOffsets.start
    : getStart(store, el, inputData, parsedOffsets)
  start = start < 0 ? 0 : start

  distance = distance
    ? parseUnit(distance) - parsedOffsets.total
    : getDistance(store, el, inputData, timeline, parsedOffsets)
  distance = distance > 0 ? distance : 0

  console.log(start)

  return {
    start,
    distance,
  }
}

export default tweenConstruct
