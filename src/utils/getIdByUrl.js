const getIdByUrl = (url = '') => url?.split('/').at(-2)

export default getIdByUrl
