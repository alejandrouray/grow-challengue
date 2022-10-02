import fetchData from '../utils/fetchData'
import { getFilms } from './films'
import { getVehicles } from './vehicles'

export const getResidentsByPlanet = async (residents = []) => {
  const promises = residents.map(resident => fetchData(resident))
  return await Promise.all(promises)
}

export const getResident = async (id) => {
  return await fetchData(`people/${id}`)
}

export const populateResident = async (id) => {
  const resident = await getResident(id)
  const films = await getFilms(resident?.films)
  const vehicles = await getVehicles(resident?.vehicles)

  return {
    ...resident,
    films,
    vehicles
  }
}
