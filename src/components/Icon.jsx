import PropTypes from 'prop-types'

const Icon = ({ filename, title, className }) => (
  <img
    src={`assets/svg/${filename}`}
    alt={`${title} Icon`}
    className={className || 'w-16 sm:w-20 lg:w-32'}
  />
)

Icon.propTypes = {
  filename: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Icon
