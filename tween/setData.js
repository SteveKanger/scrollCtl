import { gsap } from 'gsap'
import parseOffsets from '../utils/parseOffsets'

gsap.defaults({
  ease: 'none',
  duration: 1,
})

const setData = (tweenStore, data) => {
  const {
    el,
    to,
    from = {},
    start = 0,
    distance = 0,
    trigger,
    offsets,
    ignoreInitialView = false,
    peak = 1,
    callback = () => {},
  } = data

  const timeline = gsap
    .timeline({ paused: true })
    .fromTo(data.el, from, to)
    .progress(0)

  tweenStore.set('data', data)
  tweenStore.set('timeline', timeline)
  tweenStore.set('to', to)
  tweenStore.set('from', from)
  tweenStore.set('start', start)
  tweenStore.set('distance', distance)
  tweenStore.set('el', el)
  tweenStore.set('trigger', trigger || el)
  tweenStore.set('offsets', parseOffsets(offsets))
  tweenStore.set('ignoreIntialView', ignoreInitialView)
  tweenStore.set('peak', peak)
  tweenStore.set('callback', callback)
}

export default setData
