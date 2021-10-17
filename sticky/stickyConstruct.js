import getStart from './getStart'
import getDistance from './getDistance'

const stickyConstruct = (controllerVars, stickyVars) => {
  const { el } = stickyVars.get()
  el.style.transform = 'translate3d(0,0,0)'
  getStart(controllerVars, stickyVars)
  getDistance(controllerVars, stickyVars)
}

export default stickyConstruct
