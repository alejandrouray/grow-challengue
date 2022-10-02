import { useEffect } from 'react'
import { getPlanets } from '../services/planets'
import { useGlobalStore } from '../store/context'
import getTotalPlanets from '../utils/getTotalPlanets'
import addEntityId from '../utils/addEntityId'

const usePlanets = ({ getAll = false, active = true, search = false } = {}) => {
  const globalStore = useGlobalStore()
  const { planets, setPlanets, setSearch } = globalStore

  const setPlanetsFromAPI = (response, withPage) => {
    setPlanets({
      nextPage: getPlanets,
      ...response,
      ...addEntityId(response.results),
      ...(withPage && { page: globalStore.planets.page + 1 })
    })
  }

  const getAllPlanets = async (next) => {
    const response = await getPlanets(next)

    setPlanetsFromAPI(response, getAll)

    if (response.next) {
      return getAllPlanets(response.next)
    }
  }

  useEffect(() => {
    const hasFullPlanets = planets.count !== getTotalPlanets(planets.results, true)

    if (active && hasFullPlanets) {
      setSearch(search)

      getAll && search
        ? getAllPlanets(planets.next)
        : getPlanets()
          .then(response => setPlanetsFromAPI(response, (getAll && search)))
    }
  }, [search, active])

  return planets
}

export default usePlanets
