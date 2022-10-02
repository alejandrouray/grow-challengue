import fetchData from '../utils/fetchData'

export const getResidentsByPlanet = async (residents = []) => {
  const promises = residents.map(resident => fetchData(resident))
  return await Promise.all(promises)
}
