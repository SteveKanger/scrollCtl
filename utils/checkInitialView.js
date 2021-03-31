const inInitialView = (rect, offsetStart, layoutHorizontal) => {
  const screen = layoutHorizontal ? window.innerWidth : window.innerHeight
  const endOfElement = layoutHorizontal ? rect.right : rect.bottom
  const elementDimension = layoutHorizontal ? rect.width : rect.height

  return offsetStart < screen && endOfElement <= screen + elementDimension
    ? true
    : false
}

export default inInitialView
