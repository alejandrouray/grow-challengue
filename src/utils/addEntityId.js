const addEntityId = (response, type = 'multiple') => {
  const setIdByUrl = (entity) => entity?.url?.split('/').at(-2)

  return type === 'multiple'
    ? ({
        results: response.map(entity => ({
          id: setIdByUrl(entity),
          ...entity
        }))
      })
    : ({
        id: setIdByUrl(response),
        ...response
      })
}

export default addEntityId
