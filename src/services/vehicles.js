import fetchData from '../utils/fetchData'

export const getVehicles = async (vehicles = []) => {
  const promises = vehicles.map(film => fetchData(film))
  return await Promise.all(promises)
}
