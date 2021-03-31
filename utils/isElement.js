const isElement = (element) => {
  return element instanceof Element || element instanceof HTMLDocument
}

export default isElement
