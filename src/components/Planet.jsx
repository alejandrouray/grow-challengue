import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import ProgressBar from './ProgressBar'

const Planet = ({ className = '', planet, maxSurfaceWater }) => {
  const { id, name, surface_water: surfaceWater, population = 0 } = planet

  const formattedPopulation = population !== 'unknown' ? new Intl.NumberFormat('en-US').format(Number(population)) : population
  const progressValue = isNaN(Number(surfaceWater)) ? 0 : Number(surfaceWater)

  return (
    <div className={`${className} w-full bg-white rounded-lg shadow-md py-4`}>
      <div className='px-5'>
        <h5 className='text-xl pb-2 font-semibold text-gray-900'>{name}</h5>
        <div className='grid gap-y-6 items-center'>
          <div className='flex gap-x-1'>
            <Icon filename='group.svg' title='Population' className='w-5' />
            <span className='text-1xl font-bold text-gray-900'>{formattedPopulation}</span>
          </div>
          <ProgressBar
            title='Surface Water'
            value={progressValue}
            maxValue={maxSurfaceWater}
          />
          <Link
            to={`planets/${id}`}
            className='text-white bg-gray-800 rounded-l hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  )
}

Planet.propTypes = {
  className: PropTypes.string,
  maxSurfaceWater: PropTypes.number.isRequired,
  planet: PropTypes.shape({
    id: PropTypes.string,
    climate: PropTypes.string,
    diameter: PropTypes.string,
    gravity: PropTypes.string,
    name: PropTypes.string,
    orbital_period: PropTypes.string,
    population: PropTypes.string,
    residents: PropTypes.arrayOf(PropTypes.string),
    rotation_period: PropTypes.string,
    surface_water: PropTypes.string,
    terrain: PropTypes.string,
    url: PropTypes.string
  })
}

export default Planet
