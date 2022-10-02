import fetchData from '../utils/fetchData'

export const getFilms = async (films = []) => {
  const promises = films.map(film => fetchData(film))
  return await Promise.all(promises)
}
