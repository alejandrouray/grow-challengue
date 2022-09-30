const getMaxSurfaceWater = (results = {}) => {
  const collection = Object.values(results).flat()
  const surfaceWaters = collection
    .map(({ surface_water: surfaceWater }) => {
      const isUnknown = isNaN(Number(surfaceWater))
      return isUnknown ? 0 : surfaceWater
    }) || []

  return Math.max(...surfaceWaters)
}

export default getMaxSurfaceWater
