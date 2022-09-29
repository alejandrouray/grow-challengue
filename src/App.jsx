import Hero from './components/Hero'
import usePlanets from './hooks/usePlanets'
import Planet from './components/Planet'

const App = () => {
  const planets = usePlanets()
  const surfaceWaters = planets.map(({ surface_water: surfaceWater }) => surfaceWater === 'unknown' ? 0 : surfaceWater)
  const maxSurfaceWater = Math.max(...surfaceWaters)

  return (
    <div className='min-h-screen px-4 bg-center bg-contain font-jedi bg-hero-pattern'>
      <Hero />
      <ul className='text-white'>
        {planets.map(planet => (
          <Planet
            key={planet.url}
            className='my-4'
            title={planet.name}
            population={planet.population}
            surfaceWater={planet.surface_water}
            maxSurfaceWater={maxSurfaceWater}
          />))}
      </ul>
    </div>
  )
}

export default App
