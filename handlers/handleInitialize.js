import createContainer from '../helpers/createContainer'
import createScrollbar from '../helpers/createScrollbar'
import createOptions from '../helpers/createOptions'
import createListeners from '../helpers/createListeners'

const handleInitialize = (ctlStore, render, resize, opts) => {
  const { initialized } = ctlStore.get()

  if (!initialized) {
    ctlStore.set('initialized', true)
    ctlStore.set('options', createOptions(opts))
    ctlStore.set('container', createContainer(ctlStore, render))
    ctlStore.set('scrollbar', createScrollbar(ctlStore, render))
    ctlStore.set('listeners', createListeners())
    window.addEventListener('resize', resize)
  }
}

export default handleInitialize
