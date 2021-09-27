import getStart from './getStart'
import getDistance from './getDistance'

const stickyConstruct = (appStore, stickyStore) => {
  const { el } = stickyStore.get()
  el.style.transform = 'translate3d(0,0,0)'
  getStart(appStore, stickyStore)
  getDistance(appStore, stickyStore)
}

export default stickyConstruct
