import parseOffsets from '../utils/parseOffsets'

const modifyData = (tweenVars, data) => {
  const {
    el,
    to,
    from,
    start,
    distance,
    trigger,
    offsets,
    ignoreInitialView,
    peak,
    callback,
  } = data

  tweenVars.set('data', data)
  if (el) tweenVars.set('el', el)
  if (to) tweenVars.set('to', to)
  if (from) tweenVars.set('from', from)
  if (start) tweenVars.set('start', start)
  if (distance) tweenVars.set('distance', distance)
  if (trigger) tweenVars.set('trigger', trigger)
  if (offsets) tweenVars.set('offsets', parseOffsets(offsets))
  if (ignoreInitialView !== undefined)
    tweenVars.set('ignoreIntialView', ignoreInitialView)
  if (peak) tweenVars.set('peak', peak)
  if (callback) tweenVars.set('callback', callback)

  if (to || from) {
    const { el, timeline, to, from } = tweenVars.get()
    timeline.progress(0).clear().fromTo(el, from, to)
  }
}

export default modifyData
