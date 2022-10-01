import Icon from './Icon'
import ButtonIcon from './ButtonIcon'

const Hero = () => (
  <div className='grid justify-items-center pt-28 text-center'>
    <h1 className='pt-4 mx-auto mb-4 text-5xl bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent xs:text-[2rem] sm:text-[6rem] xl:text-[8rem]'>
      Star Wars Explorer
    </h1>
    <h4 className='text-[1rem] md:text-[1.5rem] lg:text-[2rem] font-bold text-white'>
      Grow Frontend Engineering Evaluation
    </h4>

    <div className='xs:hidden flex justify-self-center pt-8 text-left gap-x-8'>
      <Icon filename='tailwindcss.svg' title='Tailwind CSS' />
      <Icon filename='react.svg' title='React' />
      <Icon filename='vitejs.svg' title='Vite' />
    </div>

    <ButtonIcon
      link='https://github.com/alejandrouray/grow-challengue'
      className='my-8'
      text='Code Source'
      color='bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700'
      icon={{
        filename: 'github.svg',
        title: 'GitHub',
        className: 'w-12'
      }}
    />

    <h5 className='text-white lg:leading-10 text-lg mobiles:mt-0 mobilem:mt-12 xs:text-[1rem] sm:text-[1.5rem] lg:text-[2rem] px-5 lg:px-40'>
      Fear is the path to the Dark Side. Fear leads to anger, anger leads to hate, hate leads to suffering. i sense much fear in you.
    </h5>
  </div>
)

export default Hero
