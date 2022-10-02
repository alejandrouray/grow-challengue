import getIdByUrl from './getIdByUrl'

const addEntityId = (response, type = 'multiple') => {
  return type === 'multiple'
    ? ({
        results: response.map(entity => ({
          id: getIdByUrl(entity.url),
          ...entity
        }))
      })
    : ({
        id: getIdByUrl(response.url),
        ...response
      })
}

export default addEntityId
