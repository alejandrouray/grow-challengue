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

    const isLSEmpty = !Object.keys(cachedPlanets).length

    isLSEmpty && saveInLocalStorage({
      ...updatedPlanets,
      results: response.results
    })

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

  useEffect(() => {
    const hasRemaining = planets.count !== getTotalPlanets(planets.results, true)
    const { results: resultsLS } = cachedPlanets
    const { page } = globalStore.planets
    const isPageStored = resultsLS?.[page]

    if (hasRemaining) {
      setSearch(search)

      if (search && (planets.next && !fetching)) {
        getAllPlanets(planets.next)
      } else {
        if (isPageStored && !planets.results[page]) {
          setPlanets({
            ...cachedPlanets,
            nextPage: getPlanets,
            saveInLocalStorage
          })
        }

        if (!isPageStored && page === 1) {
          getPlanets()
            .then(response => setPlanetsFromAPI(response, search))
        }
      }
    }
  }, [search, planets])

  return planets
}

export default usePlanets
