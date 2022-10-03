import { useEffect, useState } from 'react'
import { getPlanets } from '../services/planets'
import { useGlobalStore } from '../store/context'
import getTotalPlanets from '../utils/getTotalPlanets'
import addEntityId from '../utils/addEntityId'
import useLocalStorage from '../hooks/useLocalStorage'

const usePlanets = ({ search = false } = {}) => {
  const globalStore = useGlobalStore()
  const [cachedPlanets, saveInLocalStorage] = useLocalStorage('planets', {})
  const [fetching, setFetching] = useState(false)

  const { planets, setPlanets, setSearch } = globalStore

  const setPlanetsFromAPI = (response, withPage) => {
    const updatedPlanets = setPlanets({
      nextPage: getPlanets,
      ...response,
      ...addEntityId(response.results),
      ...(withPage && { page: globalStore.planets.page + 1 }),
      saveInLocalStorage
    })

    const isCacheEmpty = !Object.keys(cachedPlanets).length
    isCacheEmpty && saveInLocalStorage(updatedPlanets)

    return updatedPlanets
  }

  const getAllPlanets = async (next) => {
    setFetching(true)
    const response = await getPlanets(next)
    const updatedPlanets = setPlanetsFromAPI(response, search)

    saveInLocalStorage(updatedPlanets)

    if (response.next) {
      return getAllPlanets(response.next)
    }

    setFetching(false)
  }

  const getPlanetsWithPagination = (cachedResults, page) => {
    const isPageCached = cachedResults?.[page]
    const isPageStored = planets.results[page]
    const isFirstPage = page === 1

    return isPageCached
      ? !isPageStored &&
        setPlanets({
          ...cachedPlanets,
          nextPage: getPlanets,
          saveInLocalStorage
        })
      : isFirstPage &&
        getPlanets().then(setPlanetsFromAPI)
  }

  useEffect(() => {
    const hasRemaining = planets.count !== getTotalPlanets(planets.results, true)
    const { results: cachedResults } = cachedPlanets
    const { page } = globalStore.planets

    if (hasRemaining) {
      setSearch(search)

      search && (planets.next && !fetching)
        ? getAllPlanets(planets.next)
        : getPlanetsWithPagination(cachedResults, page)
    }
  }, [search, planets])

  return planets
}

export default usePlanets
