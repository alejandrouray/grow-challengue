import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { useGlobalStore } from '../store/context'

import { getPlanet } from '../services/planets'
import { getResidentsByPlanet } from '../services/residents'

import getPlanetFromStore from '../utils/getPlanetFromStore'
import addEntityId from '../utils/addEntityId'
import setTabsByEntity from '../utils/setTabsByEntity'

import NavTabs from '../components/NavTabs'

const Planet = observer(() => {
  const { planetId } = useParams()
  const globalStore = useGlobalStore()

  const { planet, planets, setPlanet } = globalStore

  const residentsPopulated = planet.residents
    ?.every(resident => typeof resident === 'object')

  useEffect(() => {
    if (planet && !residentsPopulated) {
      getResidentsByPlanet(planet.residents)
        .then(residents => {
          const { results } = addEntityId(residents)
          setPlanet(planet, { residents: results })
        })
    }
  }, [planet])

  const tabs = setTabsByEntity({ entity: 'planet', planet })

  useEffect(() => {
    getPlanetFromStore({ planets, setPlanet, planetId }) ??
    getPlanet(planetId).then(setPlanet)
  }, [globalStore])

  return <NavTabs tabs={tabs} />
})

export default Planet
