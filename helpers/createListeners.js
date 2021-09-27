const listen = (events = {}) => {
  const on = (e, fn) => {
    events[e] = events[e] || []
    events[e].push(fn)
  }

  const off = (e, fn) => {
    if (events[e]) {
      for (let i = 0; i < events[e].length; i++) {
        if (events[e][i] === fn) {
          events[e].splice(i, 1)
          break
        }
      }
    }
  }

  const fire = (e, data) => {
    if (events[e]) {
      events[e].forEach((fn) => fn(data))
    }
  }

  const kill = () => (events = {})

  return {
    on,
    off,
    fire,
    kill,
  }
}

export default listen
