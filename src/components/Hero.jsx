import ReactLogo from './../assets/svg/react.svg'
import TailwindCSSLogo from './../assets/svg/tailwindcss.svg'
import Vite from './../assets/svg/vitejs.svg'

const Hero = () => (
  <div className='grid text-center pt-28'>
    <h1 className='pt-4 mx-auto mb-4 text-5xl bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent xs:text-[2rem] sm:text-[6rem] lg:text-[8rem]'>
      Star Wars Finder
    </h1>
    <h4 className='text-[1rem] md:text-[1.5rem] lg:text-[2rem] font-bold text-white'>
      Grow Frontend Engineering Evaluation
    </h4>
    <div className='xs:hidden flex justify-self-center pt-8 text-left gap-x-8'>
      <img src={TailwindCSSLogo} alt='Tailwind CSS Logo' className='w-16 sm:w-20 lg:w-32' />
      <img src={ReactLogo} alt='React Logo' className='w-16 sm:w-20 lg:w-32' />
      <img src={Vite} alt='Vite Logo' className='w-16 sm:w-20 lg:w-32' />
    </div>
  </div>
)

export default Hero
