const createStore = (initialState) => {
  const state = initialState

  const set = (key, value) => (state[key] = value)
  const get = () => state

  return {
    get,
    set,
  }
}

export default createStore
