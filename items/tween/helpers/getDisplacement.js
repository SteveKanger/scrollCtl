const getDisplacement = (
  store,
  el,
  inputData,
  timeline,
  elRect,
  triggerRect
) => {
  const { trigger, peak } = inputData
  const { layoutHorizontal } = store.get().options

  if (trigger || peak < 1) {
    return layoutHorizontal
      ? triggerRect.width + window.innerWidth
      : triggerRect.height + window.innerHeight
  } else {
    timeline.progress(1)
    const elEndRect = el.getBoundingClientRect()
    timeline.progress(0)

    const added = layoutHorizontal
      ? elEndRect.left + elEndRect.width - (elRect.left + elRect.width)
      : elEndRect.top + elEndRect.height - (elRect.top + elRect.height)

    return layoutHorizontal
      ? elRect.width + window.innerWidth + added
      : elRect.height + window.innerHeight + added
  }
}

export default getDisplacement
