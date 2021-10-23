import parseUnit from '../utils/parseUnit'
import getStart from './getStart'
import getDistance from './getDistance'

const tweenConstruct = (ctlStore, tweenStore) => {
  const { timeline, offsets, data } = tweenStore.get()
  let { start, distance } = data
  timeline.progress(0)

  start = start
    ? parseUnit(start) + offsets.start
    : getStart(ctlStore, tweenStore)
  start = start < 0 ? 0 : start

  distance = distance
    ? parseUnit(distance) - offsets.total
    : getDistance(ctlStore, tweenStore)
  distance = distance > 0 ? distance : 0

  tweenStore.set('start', start)
  tweenStore.set('distance', distance)
}

export default tweenConstruct
