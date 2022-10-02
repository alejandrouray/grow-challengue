import PropTypes from 'prop-types'
import List from './List'

const ListCollection = ({ lists = [] }) => {
  return (
    lists.map(list => (
      <List
        key={list.title}
        {...list}
      />
    ))
  )
}

ListCollection.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ListCollection
