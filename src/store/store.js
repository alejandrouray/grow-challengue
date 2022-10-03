import addEntityId from '../utils/addEntityId'

export default function createGlobalStore () {
  return {
    planets: {
      nextPage: () => {},
      results: {},
      next: null,
      page: 1,
      last: false,
      count: undefined
    },
    search: '',
    planet: '',
    resident: '',

    setPlanets ({
      nextPage,
      results,
      next,
      page = 1,
      last,
      count,
      saveInLocalStorage
    }) {
      this.planets = {
        nextPage: () => {
          const {
            results: storedResults,
            page: storedPage,
            next: storedNext
          } = this.planets

          const hasStored = storedResults[storedPage + 1]
          const followingPage = page + 1
          const lastPage = count / storedResults[storedPage].length

          return hasStored
            ? this.setPlanets({
              ...this.planets,
              nextPage: () => nextPage(storedNext),
              results: null,
              page: followingPage,
              last: followingPage === lastPage,
              saveInLocalStorage
            })
            : nextPage(this.planets.next)
              .then(response => {
                const updatedPlanets = this.setPlanets({
                  ...response,
                  ...addEntityId(response.results),
                  nextPage: () => nextPage(this.planets.next),
                  page: this.planets.page + 1,
                  last: !response.next,
                  saveInLocalStorage
                })

                saveInLocalStorage && saveInLocalStorage(updatedPlanets)
              })
        },

        previousPage: () => {
          const updatedPlanets = this.setPlanets({
            ...this.planets,
            nextPage: () => nextPage(this.planets.next),
            page: page - 1,
            results: null,
            last: false,
            saveInLocalStorage
          })

          saveInLocalStorage && saveInLocalStorage(updatedPlanets)
        },

        results: {
          ...this.planets.results,
          ...(Array.isArray(results) ? { [page]: results } : { ...results })
        },

        next,
        page,
        last,
        saveInLocalStorage,
        count: count || this.planets.count
      }

      return { ...this.planets }
    },

    jumpToPage (page) {
      const { results, page: storedPage, count } = this.planets
      const lastPage = count / results[storedPage]?.length

      this.planets = {
        ...this.planets,
        page,
        nextPage: () => this.jumpToPage(this.planets.page + 1),
        previousPage: () => this.jumpToPage(this.planets.page - 1),
        last: page === lastPage
      }
    },

    setSearch (search) {
      this.search = search
    },

    setPlanet (planet, otherValues = {}) {
      this.planet = {
        ...addEntityId(planet, 'single'),
        ...otherValues
      }

      return { ...this.planet }
    },

    setResident (resident) {
      this.resident = addEntityId(resident, 'single')
    }
  }
}
