import PropTypes from 'prop-types'
import { observer } from 'mobx-react-lite'
import Planet from './Planet'
import Search from './Search'
import Pagination from './Pagination'
import { useGlobalStore } from '../store/context'
import getMaxSurfaceWater from '../utils/getMaxSurfaceWater'

const PlanetList = observer(() => {
  const { planets } = useGlobalStore()
  const { results, page, count, ...propsToPagination } = planets

  const currentResults = results[page] || []
  const totalPages = count / currentResults.length
  const maxSurfaceWater = getMaxSurfaceWater(results)

  return (
    <div className='grid justify-items-center pb-6 pt-12'>
      <Search placeholder='Enter a Planet Name' />

      <div className='pt-20 pb-10 grid grid-cols-1 gap-6 w-full xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4'>
        {currentResults.map(planet => (
          <Planet
            key={planet.url}
            title={planet.name}
            population={planet.population}
            surfaceWater={Number(planet.surface_water)}
            maxSurfaceWater={maxSurfaceWater}
          />))}
      </div>

      {currentResults.length && (
        <Pagination
          {...propsToPagination}
          title='Planets'
          page={page}
          count={count}
          totalPages={totalPages}
        />
      )}
    </div>
  )
})

PlanetList.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.object)
}

export default PlanetList
