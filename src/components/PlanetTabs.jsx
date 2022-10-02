import { useState } from 'react'
import Tab from './Tab'
import PlanetDetails from './PlanetDetails'
import PlanetResidents from './PlanetResidents'

const PlanetTabs = () => {
  const [tab, setTab] = useState('Details')

  const tabs = [
    {
      title: 'Details',
      Component: PlanetDetails
    },
    {
      title: 'Residents',
      Component: PlanetResidents,
      className: 'md:block lg:grid lg:grid-cols-12 justify-center'
    },
    {
      title: 'Films',
      Component: () => <h2>Films</h2>
    }
  ]

  return (
    <div className='w-full bg-white rounded-lg border shadow-md'>
      <ul className='flex flex-wrap justify-start mobiles:justify-center text-sm text-gray-500 bg-gray-50 rounded-t-lg border-b border-gray-200 font-medium text-center'>
        {tabs.map(({ title }) => (
          <Tab
            key={title}
            title={title}
            tab={tab}
            setTab={setTab}
          />
        ))}
      </ul>

      {tabs.map(({ title, Component, className = '' }) => (
        <div
          key={title}
          className={
            `${tab !== title && 'hidden md:hidden lg:hidden'}
            p-4 bg-white rounded-lg md:p-8
            ${className}`
          }
        >
          <Component />
        </div>
      ))}
    </div>
  )
}

export default PlanetTabs
