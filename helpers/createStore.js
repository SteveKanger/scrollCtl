const createStore = (initialStore) => {
  let store = initialStore

  const set = (key, value) => (store[key] = value)
  const get = () => store

  return {
    get,
    set,
  }
}

export default createStore
