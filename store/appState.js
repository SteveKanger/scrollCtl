const initialState = {
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
}

export default initialState
