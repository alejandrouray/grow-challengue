import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { useGlobalStore } from '../store/context'
import getTotalPlanets from '../utils/getTotalPlanets'
import { getPlanet } from '../services/planets'

const Planet = observer(() => {
  const { planetId } = useParams()
  const globalStore = useGlobalStore()
  const { planet, planets, setPlanet } = globalStore

  const getPlanetFromStore = (storedPlanets = {}) => {
    const planets = getTotalPlanets(storedPlanets.results)
    const planet = planets.find(planet => planet.id === planetId)

    planet && setPlanet(planet)

    return planet
  }

  useEffect(() => {
    getPlanetFromStore(planets) ??
    getPlanet(planetId).then(setPlanet)
  }, [globalStore])

  return (
    <div className='text-white'>
      {planet && <span>Planet {planet.name}</span>}
    </div>
  )
})

export default Planet
