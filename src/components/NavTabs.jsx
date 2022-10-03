import PropTypes from 'prop-types'
import { useState } from 'react'
import Tab from './Tab'

const NavTabs = ({ tabs = [], loading = false }) => {
  const [tab, setTab] = useState('Details')

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

      {loading
        ? <span className='p-20 flex justify-center'>Fetching data...</span>
        : tabs.map(({ title, Component, className = '', props = {} }) => (
          <div
            key={title}
            className={
            `${tab !== title && 'hidden md:hidden lg:hidden'}
            p-4 bg-white rounded-lg md:p-8
            ${className}`
          }
          >
            <Component {...props} />
          </div>
        ))}
    </div>
  )
}

NavTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    Component: PropTypes.any.isRequired,
    className: PropTypes.string,
    props: PropTypes.object
  })),
  loading: PropTypes.bool
}

export default NavTabs
