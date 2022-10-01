const formatPopulation = (population) => {
  return population !== 'unknown'
    ? new Intl.NumberFormat('en-US').format(Number(population))
    : population
}

export default formatPopulation
