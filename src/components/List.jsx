import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

const List = observer(({ title, items = [], keys = {}, className = '' }) => {
  const { main, subtitle, right } = keys

  if (!items.length) return <span className='text-red-400 lg:col-start-5 lg:col-end-10'>No data were found for this entity :(</span>

  return (
    <div className={`p-4 w-90 rounded-lg border shadow-md sm:p-8 lg:col-start-4 lg:col-end-10 bg-gray-800 border-gray-700 ${className}`}>
      <div className='flex justify-between items-center mb-4'>
        <h5 className='text-xl prevsm:text-base font-bold leading-none text-white'>{title}</h5>
        <span className='text-sm font-medium text-yellow-500'>
          Total: {items?.length}
        </span>
      </div>
      <div className='flow-root'>
        <ul className='divide-y divide-gray-700'>
          {items?.map((item, index) => (
            <li
              className='py-3 sm:py-4 hover:bg-gray-600 px-4 cursor-pointer'
              key={index}
            >
              <Link to={title === 'Residents' && `/${title?.toLowerCase()}/${item.id}`}>
                <div className='flex items-center space-x-4'>
                  <div className='flex-shrink-0'>
                    <img
                      className='w-8 h-8 rounded-full'
                      src={`https://ui-avatars.com/api/?background=random&name=${item[main]}`}
                      alt={item[main]}
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm prevsm:text-[.5rem] font-medium truncate text-white'>
                      {item?.[main]?.toLowerCase()}
                    </p>
                    <p className='text-sm prevsm:text-[.5rem] truncate text-gray-400'>
                      {item?.[subtitle]}
                    </p>
                  </div>
                  <div className='inline-flex items-center text-base prevsm:hidden font-semibold text-white'>
                    {right}: {item?.[right]?.length}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})

List.propTypes = {
  title: PropTypes.string,
  entity: PropTypes.array,
  keys: PropTypes.shape({
    main: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    right: PropTypes.string
  })
}

export default List
