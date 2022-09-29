import Planet from './Planet'
import PropTypes from 'prop-types'

const PlanetList = ({ planets }) => {
  const surfaceWaters = planets.map(({ surface_water: surfaceWater }) => surfaceWater === 'unknown' ? 0 : surfaceWater)
  const maxSurfaceWater = Math.max(...surfaceWaters)

  return (
    <div className='py-20 grid grid-cols-1 gap-6 w-full xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 auto-cols-max'>
      {planets.map(planet => (
        <Planet
          key={planet.url}
          title={planet.name}
          population={planet.population}
          surfaceWater={Number(planet.surface_water)}
          maxSurfaceWater={maxSurfaceWater}
        />))}
    </div>
  )
}

PlanetList.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.object)
}

export default PlanetList
