import parseOffsets from '../utils/parseOffsets'

const modifyData = (stickyStore, data) => {
  const { el, offsets, ignoreBounds, callback } = data

  if (el) stickyStore.set('el', el)
  if (offsets) stickyStore.set('offsets', parseOffsets(offsets))
  if (ignoreBounds !== undefined) stickyStore.set('ignoreBounds', ignoreBounds)
  if (callback) stickyStore.set('callback', callback)
}

export default modifyData
