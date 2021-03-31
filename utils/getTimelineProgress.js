const getTimelineProgress = (progress, peak) => {
  if (peak < 1) {
    let timelineProgress = progress * (peak * 2)
    if (progress > peak) {
      timelineProgress = peak * 2 - progress
    }
    return timelineProgress
  }

  return progress
}

export default getTimelineProgress
