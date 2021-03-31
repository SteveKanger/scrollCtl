const getProgress = (start, distance, scroll) => {
  return Math.min(1, Math.max(0, (scroll - start) / distance))
}

export default getProgress
