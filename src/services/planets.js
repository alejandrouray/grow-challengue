const API_ENDPOINT = 'https://swapi.dev/api'

const fetchData = (resource, method) => {
  const hasHttps = resource.includes('https')
  const finalUrl = hasHttps ? resource : `${API_ENDPOINT}/${resource}`

  return fetch(finalUrl, {
    method: method || 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json())
}

export const getPlanets = async (resource) => {
  return await fetchData(resource || 'planets/')
}

export const getPlanet = async (id) => {
  return await fetchData(`planets/${id}`)
}
