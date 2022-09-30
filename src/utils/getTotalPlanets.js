const getTotalPlanets = (planets = {}, length) => {
  const total = Object.values(planets).flat()

  return length
    ? total.length
    : total
}

export default getTotalPlanets
