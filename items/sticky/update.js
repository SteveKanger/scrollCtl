import getProgress from '../../utils/getProgress'
import updateElementClass from '../../utils/updateElementClass'

const stickyUpdate = (store, updateVars) => {
  const { options, scroll } = store.get()
  const { layoutHorizontal } = options
  const { el, start, distance, callback } = updateVars
  const progress = getProgress(start, distance, scroll)

  const pos = Math.min(distance, Math.max(0, scroll - start))
  el.style.transform = layoutHorizontal
    ? `translate3d(${pos}px,0,0)`
    : `translate3d(0,${pos}px,0)`

  if (callback && typeof callback === 'function') callback(progress, scroll)

  updateElementClass(el, progress)
}

export default stickyUpdate
