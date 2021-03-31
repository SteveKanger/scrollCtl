const assignOptions = (props) => {
  const assigned = Object.assign(
    {
      layoutHorizontal: false,
      container: null,
      scrollbar: null,
      keyStep: 120,
      firefoxMult: 25,
      touchMult: 2,
      mouseMult: 1,
      ease: 0.08,
    },
    props
  )

  return assigned
}

export default assignOptions
