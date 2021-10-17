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

const scrollController = (opts) => {
  if (!isElement(opts.container))
    throw new Error(
      'A valid container element is required to initialize the scroll controller'
    )

  const appStore = createStore({
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

  const update = () => handleUpdate(appStore)
  const render = (e) => handleRender(appStore, update, e)
  const resize = debounce(() => handleResize(appStore), 100)
  const initialize = () => handleInitialize(appStore, render, resize, opts)
  const recalibrate = () => handleRecalibrate(appStore)
  const getScroll = () => appStore.get().scroll
  const on = (e, fn) => appStore.get().listeners.on(e, fn)
  const off = (e, fn) => appStore.get().listeners.off(e, fn)
  const kill = () => handleKill(appStore, resize)
  const addTween = (data) => handleAddTween(appStore, data)
  const addSticky = (data) => handleAddSticky(appStore, data)
  const removeItem = (id) => handleRemoveItem(appStore, id)
  const modifyItem = (id, data) => handleModifyItem(appStore, id, data)
  const scrollTo = (position, useAnimation) =>
    handleScrollTo(appStore, update, render, position, useAnimation)
  const scrollToElement = (el, offset, useAnimation) =>
    handleScrollToElement(appStore, update, render, el, offset, useAnimation)

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

export default scrollController
