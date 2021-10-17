import parseOffsets from '../utils/parseOffsets'

const setData = (stickyVars, data) => {
  const { el, offsets, ignoreBounds = false, callback = () => {} } = data

  stickyVars.set('el', el)
  stickyVars.set('offsets', parseOffsets(offsets))
  stickyVars.set('ignoreBounds', ignoreBounds)
  stickyVars.set('callback', callback)
}

export default setData
