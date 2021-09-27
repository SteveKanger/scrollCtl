import createContainer from '../helpers/createContainer'
import createScrollbar from '../helpers/createScrollbar'
import createOptions from '../helpers/createOptions'
import createListeners from '../helpers/createListeners'

const handleInitialize = (appStore, render, resize, opts) => {
  const { initialized } = appStore.get()

  if (!initialized) {
    appStore.set('initialized', true)
    appStore.set('options', createOptions(opts))
    appStore.set('container', createContainer(appStore, render))
    appStore.set('scrollbar', createScrollbar(appStore, render))
    appStore.set('listeners', createListeners())
    window.addEventListener('resize', resize)
  }
}

export default handleInitialize
