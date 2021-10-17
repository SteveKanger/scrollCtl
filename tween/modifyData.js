import parseOffsets from '../utils/parseOffsets'

const modifyData = (tweenStore, data) => {
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

  tweenStore.set('data', data)
  if (el) tweenStore.set('el', el)
  if (to) tweenStore.set('to', to)
  if (from) tweenStore.set('from', from)
  if (start) tweenStore.set('start', start)
  if (distance) tweenStore.set('distance', distance)
  if (trigger) tweenStore.set('trigger', trigger)
  if (offsets) tweenStore.set('offsets', parseOffsets(offsets))
  if (ignoreInitialView !== undefined)
    tweenStore.set('ignoreIntialView', ignoreInitialView)
  if (peak) tweenStore.set('peak', peak)
  if (callback) tweenStore.set('callback', callback)

  if (to || from) {
    const { el, timeline, to, from } = tweenStore.get()
    timeline.progress(0).clear().fromTo(el, from, to)
  }
}

export default modifyData
