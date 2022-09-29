import PropTypes from 'prop-types'
import Icon from './Icon'
import ProgressBar from './ProgressBar'

const Planet = ({ className = '', title, population = 0, maxSurfaceWater, surfaceWater }) => {
  const formattedPopulation = population !== 'unknown' ? new Intl.NumberFormat('en-US').format(Number(population)) : population
  const progressValue = isNaN(surfaceWater) ? 0 : surfaceWater

  return (
    <div className={`${className} w-full bg-white rounded-lg shadow-md py-4`}>
      <div className='px-5'>
        <h5 className='text-xl pb-2 font-semibold text-gray-900'>{title}</h5>
        <div className='grid gap-y-6 items-center'>
          <div className='flex gap-x-1'>
            <Icon filename='group.svg' title='Population' className='w-5' />
            <span className='text-1xl font-bold text-gray-900 dark:text-white'>{formattedPopulation}</span>
          </div>
          <ProgressBar
            title='Surface Water'
            value={progressValue}
            maxValue={maxSurfaceWater}
          />
          <a href='#' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>See Details</a>
        </div>
      </div>
    </div>
  )
}

Planet.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  population: PropTypes.string.isRequired,
  surfaceWater: PropTypes.number.isRequired,
  maxSurfaceWater: PropTypes.number.isRequired
}

export default Planet
