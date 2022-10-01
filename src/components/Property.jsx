import PropTypes from 'prop-types'

const Property = ({ value, description, className = '', formater }) => {
  return (
    <div className={`flex flex-col justify-center items-center ${className}`}>
      <dt className='mb-2 text-3xl font-extrabold text-center prevsm:text-lg'>{formater ? formater(value) : value}</dt>
      <dd className='font-light text-gray-500 text-center prevsm:text-sm'>{description.replace('_', ' ')}</dd>
    </div>
  )
}

Property.propTypes = {
  description: PropTypes.string.isRequired,
  value: PropTypes.any,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  formater: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ])
}

export default Property
