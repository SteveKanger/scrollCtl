import getRems from './getRems'

const parseUnit = (v) => {
  if (typeof v === 'number') {
    return v
  } else if (typeof v === 'string') {
    const val = parseInt(v, 10) || 0

    if (v.includes('px')) return val
    else if (v.includes('rem')) return val * getRems()
    else if (v.includes('vh')) return (window.innerHeight * val) / 100
    else if (v.includes('vw')) return (window.innerWidth * val) / 100

    throw new Error(
      'Invalid unit passed to parse only px, rem, vh, and vw allowed'
    )
  } else {
    throw new Error('Valid number or string is required to parse unit')
  }
}

export default parseUnit
