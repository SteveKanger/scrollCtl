const transform = (el, value) => {
  el.style.webkitTransform = value
  el.style.msTransform = value
  el.style.transform = value
}

export default transform
