import getOffsetStart from '../utils/getOffsetStart'

const getStart = (ctlStore, stickyStore) => {
  const { el, offsets } = stickyStore.get()
  const { container, layoutHorizontal } = ctlStore.get().options

  const offsetStart = getOffsetStart(el, container, layoutHorizontal)
  stickyStore.set('start', offsetStart - offsets.start)
}

export default getStart
