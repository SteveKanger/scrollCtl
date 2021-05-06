import { gsap, CSSPlugin } from 'gsap'
import debounce from './utils/debounce'
import isElement from './utils/isElement'
import lerp from './utils/lerp'
import createStore from './store/createStore'
import reducer from './store/reducer'
import initialState from './store/initialState'
import listen from './helpers/listen'
import assignOptions from './helpers/assignOptions'
import createScrollContainer from './helpers/createScrollContainer'
import createScrollbar from './helpers/createScrollbar'
import createTween from './items/tween/create'
import createSticky from './items/sticky/create'

gsap.registerPlugin(CSSPlugin)

const controller = (props) => {
  if (!isElement(props.container))
    throw new Error(
      'A valid container element is required to initiate scroll controller'
    )

  let aF = null
  let initialized = false
  let scrollContainer = null
  let scrollbar = null
  const store = createStore(reducer, initialState)
  const listeners = listen()

  const update = () => {
    const { items } = store.get()
    items.forEach((item) => item.update(store, item.updateVars))
    if (scrollbar) scrollbar.update()
    if (scrollContainer) scrollContainer.update()
  }

  const run = (newDelta) => {
    let { delta, limit, scroll } = store.get()
    delta -= newDelta
    if (delta < 0) delta = 0
    if (delta > limit) delta = limit
    if (delta === scroll) return
    store.dispatch({ type: 'SET_DELTA', payload: delta })
    if (!aF) aF = requestAnimationFrame(animate)
  }

  const animate = () => {
    let { delta, scroll, options } = store.get()
    const diff = delta - scroll
    if (Math.abs(diff) > 0.2) {
      scroll = lerp(scroll, delta, options.ease)
      aF = requestAnimationFrame(animate)
    } else {
      if (aF) cancelAnimationFrame(aF)
      scroll = delta
      aF = null
    }
    store.dispatch({ type: 'SET_SCROLL', payload: scroll })
    listeners.fire('scroll', scroll)
    update()
  }

  const init = () => {
    if (!initialized) {
      store.dispatch({ type: 'SET_OPTIONS', payload: assignOptions(props) })
      if (!scrollContainer) scrollContainer = createScrollContainer(store, run)
      if (!scrollbar) scrollbar = createScrollbar(store, run)
      window.addEventListener('resize', resize)
      initialized = true
    }
  }

  const kill = () => {
    if (initialized) {
      const { items } = store.get()
      items.forEach((item) => item.kill(item.updateVars))
      if (scrollContainer) scrollContainer.kill()
      if (scrollbar) scrollbar.kill()
      scrollContainer = null
      scrollbar = null
      window.removeEventListener('resize', resize)
      store.dispatch({ type: 'CLEAR' })
      initialized = false
    }
  }

  const resize = debounce(() => {
    const { scroll } = store.get()
    recalibrate()
    listeners.fire('resize', scroll)
  }, 50)

  const recalibrate = () => {
    const { items } = store.get()
    const recalibratedItems = items.map((item) => item.recalibrate(store, item))
    store.dispatch({ type: 'SET_ITEMS', payload: recalibratedItems })
    if (scrollContainer) scrollContainer.recalibrate()
    if (scrollbar) scrollbar.recalibrate()
  }

  const addTween = (el, inputData) => {
    const { items } = store.get()
    const tween = createTween(store, el, inputData)
    store.dispatch({ type: 'SET_ITEMS', payload: [...items, tween] })
    return tween.id
  }

  const addSticky = (el, inputData) => {
    const { items } = store.get()
    const sticky = createSticky(store, el, inputData)
    store.dispatch({ type: 'SET_ITEMS', payload: [...items, sticky] })
    return sticky.id
  }

  const removeItem = (id) => {
    if (!id) throw new Error('Id is required to remove from controller')
    const { items } = store.get()
    const idx = items.findIndex((item) => item.id === id)
    if (idx > -1) {
      items[idx].kill(items[idx].updateVars)
      items.splice(idx, 1)
      store.dispatch({ type: 'SET_ITEMS', payload: items })
    }
  }

  const modifyItem = (id, inputData) => {
    if (!id) throw new Error('Id is required to modify item')
    const { items } = store.get()
    const idx = items.findIndex((item) => item.id === id)
    if (idx > -1) {
      items[idx] = items[idx].modify(store, items[idx], inputData)
      store.dispatch({ type: 'SET_ITEMS', payload: items })
    }
  }

  const scrollTo = (position, useAnimation = true) => {
    const { limit, delta } = store.get()
    if (useAnimation) {
      const newDelta = position - delta
      run(-newDelta)
    } else {
      if (position > limit) position = limit
      else if (position < 0) position = 0
      store.dispatch({ type: 'SET_SCROLL', payload: position })
      store.dispatch({ type: 'SET_DELTA', payload: position })
      update()
    }
  }

  const scrollToElement = (el, offset = 0, useAnimation = true) => {
    let element
    if (isElement(el)) element = el
    else if (document.querySelector(el)) element = document.querySelector(el)
    else throw new Error('The element your trying to scroll to does not exist')
    const { options, scroll } = store.get()
    const { layoutHorizontal } = options
    let elStart = layoutHorizontal
      ? element.getBoundingClientRect().left
      : element.getBoundingClientRect().top
    let position = elStart + scroll - offset
    scrollTo(position, useAnimation)
  }

  const on = (e, fn) => listeners.on(e, fn)
  const off = (e, fn) => listeners.off(e, fn)
  const getScroll = () => store.get().scroll

  init()
  return {
    addSticky,
    addTween,
    getScroll,
    init,
    kill,
    modifyItem,
    on,
    off,
    removeItem,
    recalibrate,
    scrollTo,
    scrollToElement,
    update,
  }
}

export default controller
