import { getResidentsByPlanet } from '../services/residents'
import addEntityId from './addEntityId'

const populatePlanet = ({ entity, setPlanet, saveInLocalStorage }) => {
  getResidentsByPlanet(entity?.residents)
    .then(residents => {
      const { results } = addEntityId(residents)
      const populatedPlanet = setPlanet(entity, { residents: results })
      saveInLocalStorage(populatedPlanet)
    })
}

export default populatePlanet
