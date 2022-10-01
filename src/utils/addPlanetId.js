const addPlanetId = (response, type = 'multiple') => {
  const setIdByUrl = (planet) => planet.url.at(-2)

  return type === 'multiple'
    ? ({
        results: response.results.map(planet => ({
          id: setIdByUrl(planet),
          ...planet
        }))
      })
    : ({
        id: setIdByUrl(response),
        ...response
      })
}

export default addPlanetId
