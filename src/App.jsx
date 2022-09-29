import Hero from './components/Hero'
import usePlanets from './hooks/usePlanets'
import PlanetList from './components/PlanetList'

const App = () => {
  const planets = usePlanets()

  return (
    <div className='min-h-screen px-4 lg:px-16 xl:px-48 bg-center bg-contain font-jedi bg-hero-pattern'>
      <Hero />
      <PlanetList planets={planets} />
    </div>
  )
}

export default App
