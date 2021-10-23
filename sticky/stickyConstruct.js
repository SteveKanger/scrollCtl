import getStart from './getStart'
import getDistance from './getDistance'

const stickyConstruct = (ctlStore, stickyStore) => {
  const { el } = stickyStore.get()
  el.style.transform = 'translate3d(0,0,0)'
  getStart(ctlStore, stickyStore)
  getDistance(ctlStore, stickyStore)
}

export default stickyConstruct
