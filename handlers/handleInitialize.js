import createContainer from '../helpers/createContainer'
import createScrollbar from '../helpers/createScrollbar'
import createOptions from '../helpers/createOptions'
import createListeners from '../helpers/createListeners'

const handleInitialize = (controllerVars, render, resize, opts) => {
  const { initialized } = controllerVars.get()

  if (!initialized) {
    controllerVars.set('initialized', true)
    controllerVars.set('options', createOptions(opts))
    controllerVars.set('container', createContainer(controllerVars, render))
    controllerVars.set('scrollbar', createScrollbar(controllerVars, render))
    controllerVars.set('listeners', createListeners())
    window.addEventListener('resize', resize)
  }
}

export default handleInitialize
