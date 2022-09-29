import { useEffect } from 'react'
import { getPlanets } from '../services/getPlanets'
import { useGlobalStore } from '../store/context'

const usePlanets = () => {
  const globalStore = useGlobalStore()

  useEffect(() => {
    getPlanets().then(response => {
      globalStore.setPlanets({
        nextPage: getPlanets,
        ...response
      })
    })
  }, [])
}

export default usePlanets
