import { useEffect } from 'react'
import { useGlobalStore } from '../store/context'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { populateResident } from '../services/residents'
import { getPlanet } from '../services/planets'

import getIdByUrl from '../utils/getIdByUrl'
import getPlanetFromStore from '../utils/getPlanetFromStore'

import NavTabs from '../components/NavTabs'
import setTabsByEntity from '../utils/setTabsByEntity'

const Resident = observer(() => {
  const { residentId } = useParams()
  const globalStore = useGlobalStore()

  const {
    planet,
    resident,
    planets,
    setPlanet,
    setResident
  } = globalStore

  const tabs = setTabsByEntity({ entity: 'resident', resident })

  useEffect(() => {
    const planetId = getIdByUrl(resident?.homeworld)

    if (planetId && !planet) {
      (getPlanetFromStore({ planets, setPlanet, planetId }) ??
      getPlanet(planetId).then(setPlanet))
    }

    if (!resident) {
      const fetchResident = async () => {
        const populatedResident = await populateResident(residentId)
        setResident(populatedResident)
      }

      fetchResident().catch(console.error)
    }
  }, [resident, planet])

  return (
    <NavTabs tabs={tabs} />
  )
})

export default Resident
