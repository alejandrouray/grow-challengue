const API_ENDPOINT = 'https://swapi.dev/api'

const fetchData = (resource, method) => {
  const finalUrl = `${API_ENDPOINT}/${resource}`
  return fetch(finalUrl, {
    method: method || 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json())
}

export const getPlanets = async (page = 1, prevPlanets = []) => {
  const planets = prevPlanets
  const response = await fetchData(`planets/?page=${page}`)

  console.log(response)
  // console.log(response.results, page)

  planets.push(...response.results)

  if (response.next) {
    return getPlanets(page + 1, planets)
  }

  console.log({ planets })

  return planets
}
