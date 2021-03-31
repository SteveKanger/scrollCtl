const getRems = () => {
  const fontSize = window.getComputedStyle(document.documentElement).fontSize
  return parseInt(fontSize, 10)
}

export default getRems
