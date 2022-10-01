const addPlanetId = (response, type = 'multiple') => {
  const setIdByUrl = (planet) => planet.url.at(-2)

  return type === 'multiple'
    ? ({
        results: response.results.map(planet => ({
          ...planet,
          id: setIdByUrl(planet)
        }))
      })
    : ({
        ...response,
        id: setIdByUrl(response)
      })
}

export default addPlanetId
