import getProgress from '../utils/getProgress'
import updateElementClass from '../utils/updateElementClass'

const tweenUpdate = (appStore, tweenStore) => {
  const { scroll } = appStore.get()
  const { el, timeline, start, distance, peak, callback } = tweenStore.get()

  const progress = getProgress(start, distance, scroll)

  if (peak) {
    timeline.progress(
      progress > 0.5 ? 0.5 * 2 - progress : progress * (0.5 * 2)
    )
  } else {
    timeline.progress(progress)
  }

  updateElementClass(el, progress)
  callback(progress, scroll)
}

export default tweenUpdate
