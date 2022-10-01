import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { useGlobalStore } from '../store/context'

const Breadcrumb = observer(() => {
  const globalStore = useGlobalStore()
  const { planet } = globalStore

  return (
    <div className='text-white py-12'>
      {planet && (
        <>
          <Link to='/'>Home</Link> -
          <Link to={`planets/${planet.id}`}>{planet.name}</Link>
        </>
      )}
    </div>
  )
})

export default Breadcrumb
