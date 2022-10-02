import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { useGlobalStore } from '../store/context'
import { getResidentsByPlanet } from '../services/residents'
import addEntityId from '../utils/addEntityId'

const PlanetResidents = observer(() => {
  const globalStore = useGlobalStore()
  const { planet, setPlanet } = globalStore

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

  if (!residentsPopulated) return <></>

  return (
    <div className='p-4 w-90 rounded-lg border shadow-md sm:p-8 lg:col-start-4 lg:col-end-10 dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex justify-between items-center mb-4'>
        <h5 className='text-xl prevsm:text-base font-bold leading-none dark:text-white'>Residents</h5>
        <span className='text-sm font-medium text-yellow-500'>
          Total: {planet.residents?.length}
        </span>
      </div>
      <div className='flow-root'>
        <ul className='divide-y dark:divide-gray-700'>
          {planet.residents?.map((resident, index) => (
            <li
              className='py-3 sm:py-4 hover:bg-gray-600 px-4 cursor-pointer'
              key={index}
            >
              <Link to={`/residents/${resident.id}`}>
                <div className='flex items-center space-x-4'>
                  <div className='flex-shrink-0'>
                    <img
                      className='w-8 h-8 rounded-full'
                      src={`https://ui-avatars.com/api/?background=random&name=${resident.name}`}
                      alt={resident.name}
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm prevsm:text-[.5rem] font-medium text-gray-900 truncate dark:text-white'>
                      {resident?.name?.toLowerCase()}
                    </p>
                    <p className='text-sm prevsm:text-[.5rem] text-gray-500 truncate dark:text-gray-400'>
                      {resident?.gender}
                    </p>
                  </div>
                  <div className='inline-flex items-center text-base prevsm:text-[.8rem] font-semibold text-gray-900 dark:text-white'>
                    Films: {resident?.films?.length}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})

export default PlanetResidents
