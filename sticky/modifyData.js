import parseOffsets from '../utils/parseOffsets'

const modifyData = (stickyVars, data) => {
  const { el, offsets, ignoreBounds, callback } = data

  if (el) stickyVars.set('el', el)
  if (offsets) stickyVars.set('offsets', parseOffsets(offsets))
  if (ignoreBounds !== undefined) stickyVars.set('ignoreBounds', ignoreBounds)
  if (callback) stickyVars.set('callback', callback)
}

export default modifyData
