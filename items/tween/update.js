import getProgress from '../../utils/getProgress'
import updateElementClass from '../../utils/updateElementClass'

const tweenUpdate = (store, updateVars) => {
  const { scroll } = store.get()
  const { el, timeline, start, distance, peak, callback } = updateVars

  const progress = getProgress(start, distance, scroll)

  if (peak) {
    timeline.progress(
      progress > 0.5 ? 0.5 * 2 - progress : progress * (0.5 * 2)
    )
  } else {
    timeline.progress(progress)
  }

  if (callback && typeof callback === 'function') callback(progress, scroll)

  updateElementClass(el, progress)
}

export default tweenUpdate
