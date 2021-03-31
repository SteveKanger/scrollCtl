const setProgressClass = (el, progress) => {
  if (progress === 0) el.classList.add('before-progress')
  else el.classList.remove('before-progress')

  if (progress === 1) el.classList.add('after-progress')
  else el.classList.remove('after-progress')

  if (progress > 0 && progress < 1) el.classList.add('in-progress')
  else el.classList.remove('in-progress')
}

export default setProgressClass
