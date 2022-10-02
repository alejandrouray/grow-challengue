import { observer } from 'mobx-react-lite'
import { Link, useHref } from 'react-router-dom'
import { useGlobalStore } from '../store/context'
import Icon from './Icon'

const Breadcrumb = observer(() => {
  const globalStore = useGlobalStore()
  const location = useHref()
  const { planet, resident } = globalStore

  const links = [
    {
      entity: planet,
      route: 'planets',
      condition: planet
    },
    {
      entity: resident,
      route: 'residents',
      condition: resident && location.includes('residents')
    }
  ]

  return (
    <div className='text-white py-12'>
      <nav className='flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50' aria-label='Breadcrumb'>
        <ol className='inline-flex items-center space-x-1 md:space-x-3'>
          <li className='inline-flex items-center'>
            <Link to='/' className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-yellow-500'>
              <Icon filename='home.svg' title='Home' className='w-4 h-4 mr-2' />
              Home
            </Link>
          </li>

          {links.map(({ entity, condition, route }) =>
            condition && (
              <li key={route}>
                <div className='flex items-center'>
                  <Icon filename='arrowright.svg' title='Arrow Right' className='w-6 h-6 text-gray-400' />
                  <Link
                    to={`/${route}/${entity.id}`}
                    className='ml-1 text-sm font-medium text-gray-700 hover:text-yellow-500 md:ml-2'
                  >
                    {entity?.name?.toLowerCase()}
                  </Link>
                </div>
              </li>
            )
          )}
        </ol>
      </nav>
    </div>
  )
})

export default Breadcrumb
