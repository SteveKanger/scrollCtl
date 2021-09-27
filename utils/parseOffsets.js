import parseUnit from './parseUnit'

const parseOffsets = (offsets) => {
  if (!offsets) return { start: 0, end: 0, total: 0 }

  const start = offsets.start ? parseUnit(offsets.start) : 0
  const end = offsets.end ? parseUnit(offsets.end) : 0
  const total = start + end

  return {
    start,
    end,
    total,
  }
}

export default parseOffsets
