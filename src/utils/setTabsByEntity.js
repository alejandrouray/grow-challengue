import Details from '../components/Details'
import List from '../components/List'
import ListCollection from '../components/ListCollection'

const setTabsByEntity = ({ entity, planet, resident }) => {
  const options = {
    planet: [
      {
        title: 'Details',
        Component: Details,
        props: {
          entityKey: 'planet',
          exceptions: ['films', 'created', 'edited', 'url']
        }
      },
      {
        title: 'Addional info',
        Component: List,
        props: {
          items: planet?.residents,
          title: 'Residents',
          keys: {
            main: 'name',
            subtitle: 'gender',
            right: 'films'
          }
        },
        className: 'md:block lg:grid lg:grid-cols-12 justify-center'
      }
    ],
    resident: [
      {
        title: 'Details',
        Component: Details,
        props: {
          entityKey: 'resident',
          exceptions: [
            'created',
            'edited',
            'url',
            'films',
            'vehicles',
            'starships',
            'species',
            'homeworld'
          ]
        }
      },
      {
        title: 'Additional info',
        Component: ListCollection,
        props: {
          lists: [
            {
              title: 'Films',
              items: resident?.films,
              keys: {
                main: 'title',
                subtitle: 'director',
                right: 'characters'
              },
              className: 'mb-4'
            },
            {
              title: 'vehicles',
              items: resident?.vehicles,
              keys: {
                main: 'name',
                subtitle: 'manufacturer',
                right: 'pilots'
              }
            }
          ]
        },
        className: 'md:block lg:grid lg:grid-cols-12 justify-center'
      }
    ]
  }

  return options[entity]
}

export default setTabsByEntity
