import { observer } from 'mobx-react-lite'
import { useGlobalStore } from '../store/context'
import formatPopulation from '../utils/formatPopulation'
import Property from './Property'

const Details = observer(({ entityKey, exceptions = [] }) => {
  const globalStore = useGlobalStore()

  const entity = globalStore[entityKey]
  const properties = Object.entries(entity).filter(([key]) => !exceptions.includes(key))

  const formatters = {
    population: formatPopulation,
    residents: (residents) => residents.length
  }

  return (
    <div
      className='bg-white rounded-lg mobiles:p-0'
      role='tabpanel'
    >
      <dl className='grid grid-cols-1 mobilem:grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 text-gray-900'>
        {properties.map(([key, value]) => (
          <Property
            key={key}
            description={key}
            value={value}
            formater={formatters[key]}
            className={['gravity', 'terrain'].includes(key) && 'col-span-2 sm:col-span-3 order-1'}
          />
        ))}
      </dl>
    </div>
  )
})

export default Details
