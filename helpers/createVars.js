const createVars = (initialVars) => {
  let vars = initialVars

  const set = (key, value) => (vars[key] = value)
  const get = () => vars

  return {
    get,
    set,
  }
}

export default createVars
