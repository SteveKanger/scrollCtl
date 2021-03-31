import getStart from './helpers/getStart'
import getDistance from './helpers/getDistance'

const stickyConstruct = (store, el, inputData) => {
  el.style.transform = 'translate3d(0,0,0)'
  const elRect = el.getBoundingClientRect()
  const start = getStart(store, inputData, elRect)
  const distance = getDistance(store, el, inputData, elRect, start)

  return {
    start,
    distance,
  }
}

export default stickyConstruct
