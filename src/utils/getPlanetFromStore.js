import getTotalPlanets from './getTotalPlanets'

const getPlanetFromStore = (planets = {}, setPlanet, planetId) => {
  const planetsResults = getTotalPlanets(planets.results)
  const planet = planetsResults.find(planet => planet.id === planetId)

  planet && setPlanet(planet)

  return planet
}

export default getPlanetFromStore
