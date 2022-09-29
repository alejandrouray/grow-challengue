import Icon from './Icon'
import PropTypes from 'prop-types'

const ButtonIcon = ({ text, icon, className = '', color = '' }) => (
  <div className={className}>
    <a href='#' className={`${color} inline-flex w-60 gap-x-2 justify-center items-center text-black hover:bg-gradient-to-bl font-medium rounded-lg px-5 py-2.5`}>
      <Icon {...icon} />
      <span>{text}</span>
    </a>
  </div>
)

ButtonIcon.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string
  }).isRequired,
  className: PropTypes.string,
  color: PropTypes.string
}

export default ButtonIcon
