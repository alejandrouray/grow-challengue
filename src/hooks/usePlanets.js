import { useEffect } from 'react'
import useLocalStorage from './useLocalStorage'
import { getPlanets } from '../services/getPlanets'

const usePlanets = () => {
  const [planets, setPlanets] = useLocalStorage('planets')

  useEffect(() => {
    if (!planets) {
      getPlanets().then(setPlanets)
    }
  }, [])

  return planets || []
}

export default usePlanets
