import getStart from './helpers/getStart'
import getDistance from './helpers/getDistance'

const stickyConstruct = (store, el, inputData) => {
  el.style.transform = 'translate3d(0,0,0)'
  const start = getStart(store, el, inputData)
  const distance = getDistance(store, el, inputData, start)

  return {
    start,
    distance,
  }
}

export default stickyConstruct
