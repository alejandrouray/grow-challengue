import { useState } from 'react'
import Tab from './Tab'
import { useGlobalStore } from '../store/context'
import PlanetDetails from './PlanetDetails'
import { observer } from 'mobx-react-lite'

const PlanetTabs = observer(() => {
  const [tab, setTab] = useState('Details')
  const globalStore = useGlobalStore()
  const { planet } = globalStore

  const tabs = ['Details', 'Residents', 'Films']

  return (
    <div className='w-full bg-white rounded-lg border shadow-md'>
      <ul
        className='flex flex-wrap justify-start mobiles:justify-center text-sm text-gray-500 bg-gray-50 rounded-t-lg border-b border-gray-200 font-medium text-center'
        role='tablist'
      >
        {tabs.map(tabTitle => (
          <Tab
            key={tabTitle}
            title={tabTitle}
            tab={tab}
            setTab={setTab}
          />
        ))}
      </ul>
      <div
        className={`${tab === 'Details' ? '' : 'hidden'} p-4 bg-white rounded-lg md:p-8`}
        role='tabpanel'
      >
        <PlanetDetails />
      </div>
      <div>
        <div
          className={`${tab === 'Residents' ? '' : 'hidden'} p-4 bg-white rounded-lg md:p-8`}
          id='about'
          role='tabpanel'
          aria-labelledby='about-tab'
        >
          <h2>Residents</h2>
        </div>
      </div>
      <div>
        <div
          className={`${tab === 'Films' ? '' : 'hidden'} p-4 bg-white rounded-lg md:p-8`}
          id='about'
          role='tabpanel'
          aria-labelledby='about-tab'
        >
          <h2>Films</h2>
        </div>
      </div>
    </div>
  )
})

export default PlanetTabs
