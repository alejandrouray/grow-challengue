import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { useGlobalStore } from '../store/context'
import { getPlanet } from '../services/planets'

import setTabsByEntity from '../utils/setTabsByEntity'
import populatePlanet from '../utils/populatePlanet'
import useLocalStorage from '../hooks/useLocalStorage'
import NavTabs from '../components/NavTabs'

const findPlanetById = (planets, id) => {
  if (!planets) return
  return Object.values(planets).flat().find(planet => planet.id === id)
}

const Planet = observer(() => {
  const { planetId } = useParams()
  const globalStore = useGlobalStore()
  const [cachedPlanets] = useLocalStorage('planets')
  const [cachedPlanet, saveInLocalStorage] = useLocalStorage('planet')

  const { planet, setPlanet } = globalStore

  const cachedPlanetPrev = findPlanetById(cachedPlanets?.results, planetId)
  const tabs = setTabsByEntity({ entity: 'planet', planet })
  const isLoding = planet.id !== planetId

  const checkPopulated = (entity) =>
    entity.residents?.every(resident => typeof resident === 'object')

  const getPlanetFromAPI = () => {
    getPlanet(planetId)
      .then(response => populatePlanet({
        entity: response,
        setPlanet,
        saveInLocalStorage
      }))
  }

  const checkCachedEntity = (entity) => {
    const entityIsOk = entity.id === planetId

    if (entityIsOk) {
      const isPopulated = checkPopulated(entity || {})

      isPopulated
        ? setPlanet(entity)
        : populatePlanet({ entity, setPlanet, saveInLocalStorage })

      return false
    }

    getPlanetFromAPI()
  }

  const setCachedAndStore = () => {
    if (cachedPlanet) {
      checkCachedEntity(cachedPlanet)
    }

    if (!cachedPlanet) {
      cachedPlanetPrev
        ? checkCachedEntity(cachedPlanetPrev)
        : getPlanetFromAPI()
    }
  }

  useEffect(() => {
    if (!planet || isLoding || !checkPopulated(planet)) {
      setCachedAndStore()
    }
  }, [planet])

  return (
    <NavTabs
      tabs={tabs}
      loading={isLoding}
    />
  )
})

export default Planet
