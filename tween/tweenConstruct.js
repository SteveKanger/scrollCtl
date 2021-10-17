import parseUnit from '../utils/parseUnit'
import getStart from './getStart'
import getDistance from './getDistance'

const tweenConstruct = (controllerVars, tweenVars) => {
  const { timeline, offsets, data } = tweenVars.get()
  let { start, distance } = data
  timeline.progress(0)

  start = start
    ? parseUnit(start) + offsets.start
    : getStart(controllerVars, tweenVars)
  start = start < 0 ? 0 : start

  distance = distance
    ? parseUnit(distance) - offsets.total
    : getDistance(controllerVars, tweenVars)
  distance = distance > 0 ? distance : 0

  tweenVars.set('start', start)
  tweenVars.set('distance', distance)
}

export default tweenConstruct
