import Hero from './components/Hero'
import PlanetList from './components/PlanetList'
import usePlanets from './hooks/usePlanets'

const App = () => {
  usePlanets()

  return (
    <div className='min-h-screen px-4 lg:px-16 xl:px-48 bg-center bg-contain font-jedi bg-hero-pattern'>
      <Hero />
      <PlanetList />
    </div>
  )
}

export default App
