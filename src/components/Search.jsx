import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import usePlanets from '../hooks/usePlanets'
import { useGlobalStore } from '../store/context'

const Search = ({ placeholder = '', loading }) => {
  const globalStore = useGlobalStore()
  const [localSearch, setLocalSearch] = useState('')
  const { search, setSearch, jumpToPage } = globalStore

  usePlanets({ getAll: true, search })

  useEffect(() => {
    if (!localSearch && search) jumpToPage(1)
    !loading && setSearch(localSearch)
  }, [loading, localSearch])

  return (
    <form className='grid w-full md:px-24 lg:px-50 2xl:px-64' onSubmit={e => e.preventDefault()}>
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
        onBlur={(e => setLocalSearch(e.target.value))}
        onKeyDown={(e => setLocalSearch(e.target.value))}
      />
    </form>
  )
}

Search.propTypes = {
  placeholder: PropTypes.string,
  storedItems: PropTypes.object,
  count: PropTypes.number,
  loading: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
}

export default Search
