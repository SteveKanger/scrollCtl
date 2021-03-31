const createStore = (reducer, initialState) => {
  let state = initialState

  const dispatch = (action) => {
    state = reducer(action, state)
  }

  const get = () => state

  return {
    get,
    dispatch,
  }
}

export default createStore
