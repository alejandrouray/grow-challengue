const toggleLoading = async (e = {}, func = () => {}) => {
  if (!e.target) return
  const previousText = e.target.innerText

  e.target.disabled = true
  e.target.innerText = 'Loading'

  await func()

  e.target.disabled = false
  e.target.innerText = previousText
}

export default toggleLoading
