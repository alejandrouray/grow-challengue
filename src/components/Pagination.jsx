import PropTypes from 'prop-types'
import toggleLoading from '../utils/toggleLoading'
import { observer } from 'mobx-react-lite'
import { useGlobalStore } from '../store/context'

const Pagination = observer(({
  page,
  totalPages,
  count,
  last = false,
  nextPage,
  previousPage = () => {},
  title
}) => {
  const globalStore = useGlobalStore()
  const { planets } = globalStore

  const updateCachedValue = () => {
    planets.saveInLocalStorage(globalStore.planets)
  }

  return (
    <div className='flex flex-col items-center'>
      <span className='text-sm text-white'>
        Showing page <span className='font-semibold text-yellow-300'>{page} </span>
        / <span className='font-semibold text-yellow-300'>{totalPages} </span>
        of <span className='font-semibold text-yellow-300 '>{count} </span>
        {title}
      </span>
      <div className='inline-flex mt-2 xs:mt-0'>
        {page > 1 && (
          <button
            onClick={() => {
              previousPage()
              updateCachedValue()
            }}
            className='py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900'
          >
            Prev
          </button>
        )}

        {!last && (
          <button
            onClick={async (e) => {
              toggleLoading(e, nextPage)
              updateCachedValue()
            }}
            className='py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900'
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
})

Pagination.propTypes = {
  title: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  last: PropTypes.bool,
  previousPage: PropTypes.func,
  nextPage: PropTypes.func.isRequired
}

export default Pagination
