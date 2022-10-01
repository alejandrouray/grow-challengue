import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { useGlobalStore } from '../store/context'
import Icon from './Icon'

const Breadcrumb = observer(() => {
  const globalStore = useGlobalStore()
  const { planet } = globalStore

  return (
    <div className='text-white py-12'>
      {planet && (
        <nav className='flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50' aria-label='Breadcrumb'>
          <ol className='inline-flex items-center space-x-1 md:space-x-3'>
            <li className='inline-flex items-center'>
              <Link to='/' className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-yellow-500'>
                <Icon filename='home.svg' title='Home' className='w-4 h-4 mr-2' />
                Home
              </Link>
            </li>
            {planet && (
              <li>
                <div className='flex items-center'>
                  <Icon filename='arrowright.svg' title='Arrow Right' className='w-6 h-6 text-gray-400' />
                  <Link to={`/planets/${planet.id}`} className='ml-1 text-sm font-medium text-gray-700 hover:text-yellow-500 md:ml-2'>{planet.name}</Link>
                </div>
              </li>
            )}
          </ol>
        </nav>
      )}
    </div>
  )
})

export default Breadcrumb
