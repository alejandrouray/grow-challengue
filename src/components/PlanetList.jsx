import PropTypes from 'prop-types'
import { observer } from 'mobx-react-lite'
import Planet from './Planet'
import Search from './Search'
import Pagination from './Pagination'
import { useGlobalStore } from '../store/context'
import getMaxSurfaceWater from '../utils/getMaxSurfaceWater'
import getTotalPlanets from '../utils/getTotalPlanets'
import ProgressBar from '@ramonak/react-progress-bar'

const PlanetList = observer(() => {
  const { planets, search } = useGlobalStore()
  const { results, page, count, ...propsToPagination } = planets

  const totalPlanets = getTotalPlanets(results)
  const currentResults = !search ? (results[page] || []) : totalPlanets.filter(planet => planet.name.toLowerCase().includes(search.toLowerCase()))
  const totalPages = count / currentResults.length
  const maxSurfaceWater = getMaxSurfaceWater(results)

  const progress = (totalPlanets.length * 100) / count
  const loading = progress < 100 && search

  return (
    <div className='grid justify-items-center pb-6 pt-12'>
      <Search
        placeholder='Enter a Planet Name'
        disabled={loading}
        completed={progress === 100}
      />

      {loading && (
        <ProgressBar
          completed={progress}
          customLabel='Loding...'
          className='w-full px-20 py-20'
          height='40px'
          bgColor='#facc15'
          labelColor='#000'
          labelSize='10px'
        />
      )}

      {!loading && (
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
      )}

      {!search && currentResults.length && (
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
