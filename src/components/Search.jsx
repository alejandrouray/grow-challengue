import PropTypes from 'prop-types'

const Search = ({ placeholder = '' }) => {
  return (
    <form className='grid w-full md:px-24 lg:px-50 2xl:px-64'>
      <label
        htmlFor='search'
        className='mb-2 text-sm font-medium text-gray-300'
      >
        Search
      </label>
      <input
        id='search'
        type='text'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5'
        placeholder={placeholder}
      />
    </form>
  )
}

Search.propTypes = {
  placeholder: PropTypes.string
}

export default Search
