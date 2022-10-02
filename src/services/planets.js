import fetchData from '../utils/fetchData'

export const getPlanets = async (resource) => {
  return await fetchData(resource || 'planets/')
}

export const getPlanet = async (id) => {
  return await fetchData(`planets/${id}`)
}
