const getResidentFromStore = ({ planet = {}, setResident, residentId }) => {
  const resident = planet?.residents?.find(resident => resident.id === residentId)
  resident && setResident(resident)

  return resident
}

export default getResidentFromStore
