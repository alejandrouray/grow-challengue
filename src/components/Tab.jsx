import PropTypes from 'prop-types'

const Tab = ({ tab, setTab, title }) => {
  return (
    <li className='mr-2'>
      <button
        type='button'
        role='tab'
        className={`inline-block mobiles:px-2 mobiles:py-4 p-4 ${tab === title ? 'text-yellow-500' : ''} text-gray-500 rounded-tl-lg hover:text-yellow-500`}
        onClick={() => setTab(title)}
      >
        {title}
      </button>
    </li>
  )
}

Tab.propTypes = {
  tab: PropTypes.string.isRequired,
  setTab: PropTypes.func,
  title: PropTypes.string
}

export default Tab
