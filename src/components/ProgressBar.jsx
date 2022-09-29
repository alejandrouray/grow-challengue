import PropTypes from 'prop-types'

const ProgressBar = ({ title, value, maxValue }) => {
  const progress = 100 * (isNaN(value) ? 0 : Number(value)) / maxValue

  return (
    <dl>
      <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>{title}</dt>
      <dd className='flex items-center mb-3'>
        <div className='w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2'>
          <div
            className='bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 h-2.5 rounded dark:bg-blue-500'
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className='text-sm font-medium text-gray-500 dark:text-gray-400'>{value}</span>
      </dd>
    </dl>
  )
}

ProgressBar.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired
}

export default ProgressBar
