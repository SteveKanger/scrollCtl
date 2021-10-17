import { gsap } from 'gsap'
import parseOffsets from '../utils/parseOffsets'

gsap.defaults({
  ease: 'none',
  duration: 1,
})

const setData = (tweenVars, data) => {
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

  tweenVars.set('data', data)
  tweenVars.set('timeline', timeline)
  tweenVars.set('to', to)
  tweenVars.set('from', from)
  tweenVars.set('start', start)
  tweenVars.set('distance', distance)
  tweenVars.set('el', el)
  tweenVars.set('trigger', trigger || el)
  tweenVars.set('offsets', parseOffsets(offsets))
  tweenVars.set('ignoreIntialView', ignoreInitialView)
  tweenVars.set('peak', peak)
  tweenVars.set('callback', callback)
}

export default setData
