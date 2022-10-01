import PropTypes from 'prop-types'

const Icon = ({ filename, title, className }) => (
  <img
    src={`/svg/${filename}`}
    alt={`${title} Icon`}
    className={className || 'w-16 sm:w-20 lg:w-20'}
  />
)

Icon.propTypes = {
  filename: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Icon
