import createStore from './helpers/createStore'
import handleRender from './handlers/handleRender'
import handleUpdate from './handlers/handleUpdate'
import handleInitialize from './handlers/handleInitialize'
import handleKill from './handlers/handleKill'
import handleResize from './handlers/handleResize'
import handleRecalibrate from './handlers/handleRecalibrate'
import handleAddTween from './handlers/handleAddTween'
import handleAddSticky from './handlers/handleAddSticky'
import handleRemoveItem from './handlers/handleRemoveItem'
import handleModifyItem from './handlers/handleModifyItem'
import handleScrollTo from './handlers/handleScrollTo'
import handleScrollToElement from './handlers/handleScrollToElement'
import debounce from './utils/debounce'
import isElement from './utils/isElement'

const controller = (opts) => {
  if (!isElement(opts.container))
    throw new Error(
      'A valid container element is required to initialize the scroll controller'
    )

  const ctlStore = createStore({
    initialized: false,
    listeners: null,
    scrollbar: null,
    container: null,
    aF: null,
    limit: 0,
    delta: 0,
    scroll: 0,
    items: [],
    options: {
      layoutHorizontal: false,
      viewport: null,
      container: null,
      scrollbar: null,
      keyStep: 120,
      firefoxMult: 25,
      touchMult: 2,
      mouseMult: 1,
      ease: 0.06,
    },
  })

  const on = (e, fn) => ctlStore.get().listeners.on(e, fn)
  const off = (e, fn) => ctlStore.get().listeners.off(e, fn)
  const update = () => handleUpdate(ctlStore)
  const render = (e) => handleRender(ctlStore, update, e)
  const resize = debounce(() => handleResize(ctlStore), 100)
  const initialize = () => handleInitialize(ctlStore, render, resize, opts)
  const recalibrate = () => handleRecalibrate(ctlStore)
  const getScroll = () => ctlStore.get().scroll
  const kill = () => handleKill(ctlStore, resize)
  const addTween = (data) => handleAddTween(ctlStore, data)
  const addSticky = (data) => handleAddSticky(ctlStore, data)
  const removeItem = (id) => handleRemoveItem(ctlStore, id)
  const modifyItem = (id, data) => handleModifyItem(ctlStore, id, data)
  const scrollTo = (position, useAnimation) =>
    handleScrollTo(ctlStore, update, render, position, useAnimation)
  const scrollToElement = (el, offset, useAnimation) =>
    handleScrollToElement(ctlStore, update, render, el, offset, useAnimation)

  initialize()

  return {
    initialize,
    update,
    addTween,
    addSticky,
    removeItem,
    modifyItem,
    kill,
    recalibrate,
    on,
    off,
    getScroll,
    scrollTo,
    scrollToElement,
  }
}

export default controller
