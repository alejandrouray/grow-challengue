import { useEffect } from 'react'
import { getPlanets } from '../services/getPlanets'
import { useGlobalStore } from '../store/context'
import getTotalPlanets from '../utils/getTotalPlanets'

const usePlanets = ({ getAll = false, active = true, search = false } = {}) => {
  const globalStore = useGlobalStore()
  const { planets, setPlanets, setSearch } = globalStore

  const getAllPlanets = async (next) => {
    const response = await getPlanets(next)

    setPlanets({
      nextPage: getPlanets,
      page: globalStore.planets.page + 1,
      ...response
    })

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
          .then(response => {
            setPlanets({
              nextPage: getPlanets,
              ...response
            })
          })
    }
  }, [search, active])

  return planets
}

export default usePlanets
