import { useEffect } from 'react'
import { useGlobalStore } from '../store/context'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { getResident } from '../services/residents'

const Resident = observer(() => {
  const { residentId } = useParams()
  const globalStore = useGlobalStore()

  const { planet, setResident } = globalStore

  const getResidentFromStore = (storedPlanet = {}) => {
    const resident = storedPlanet?.residents?.find(resident => resident.id === residentId)
    resident && setResident(resident)

    return resident
  }

  useEffect(() => {
    getResidentFromStore(planet) ??
    getResident(residentId).then(setResident)
  }, [globalStore])

  return (
    <h1 className='text-white'>Resident {residentId} </h1>
  )
})

export default Resident
