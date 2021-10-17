import parseOffsets from '../utils/parseOffsets'

const setData = (stickyStore, data) => {
  const { el, offsets, ignoreBounds = false, callback = () => {} } = data

  stickyStore.set('el', el)
  stickyStore.set('offsets', parseOffsets(offsets))
  stickyStore.set('ignoreBounds', ignoreBounds)
  stickyStore.set('callback', callback)
}

export default setData
