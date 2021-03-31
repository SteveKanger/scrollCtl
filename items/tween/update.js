import getProgress from '../../utils/getProgress'
import updateElementClass from '../../utils/updateElementClass'

const tweenUpdate = (store, updateVars) => {
  const { scroll } = store.get()
  const { el, timeline, start, distance, peak, callback } = updateVars

  const progress = getProgress(start, distance, scroll)

  let timelineProgress
  if (peak < 1) {
    if (progress > peak) {
      timelineProgress = peak * 2 - progress
    } else {
      timelineProgress = progress * (peak * 2)
    }
  } else {
    timelineProgress = progress
  }

  timeline.progress(timelineProgress)
  if (callback && typeof callback === 'function') callback(progress, scroll)

  updateElementClass(el, progress)
}

export default tweenUpdate
