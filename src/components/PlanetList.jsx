import PropTypes from 'prop-types'
import { observer } from 'mobx-react-lite'
import Planet from './Planet'
import { useGlobalStore } from '../store/context'

const PlanetList = observer(() => {
  const { planets } = useGlobalStore()
  const { results, page, nextPage, previousPage, last } = planets
  const surfaceWaters = results[page]?.map(({ surface_water: surfaceWater }) => surfaceWater === 'unknown' ? 0 : surfaceWater)
  const maxSurfaceWater = surfaceWaters && Math.max(...surfaceWaters)

  return (
    <div className='grid justify-items-center'>
      <div className='pt-20 pb-10 grid grid-cols-1 gap-6 w-full xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 auto-cols-max'>
        {results[page]?.map(planet => (
          <Planet
            key={planet.url}
            title={planet.name}
            population={planet.population}
            surfaceWater={Number(planet.surface_water)}
            maxSurfaceWater={maxSurfaceWater}
          />))}
      </div>
      {results[page]?.length && (
        <div className='flex flex-col items-center pb-10'>
          <span className='text-sm text-white'>
            Showing <span className='font-semibold text-yellow-300'>{page}</span> to <span className='font-semibold text-yellow-300'>10</span> of <span className='font-semibold text-yellow-300 '>100</span> Planets
          </span>
          <div className='inline-flex mt-2 xs:mt-0'>
            {page > 1 && (
              <button
                onClick={previousPage}
                className='py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900'
              >
                Prev
              </button>
            )}
            {!last && (
              <button
                onClick={nextPage}
                className='py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900'
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
})

PlanetList.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.object)
}

export default PlanetList
