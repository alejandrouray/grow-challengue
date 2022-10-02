import addPlanetId from '../utils/addPlanetId'

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

    setPlanets ({ nextPage, results, next, page = 1, last, count }) {
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
              last: followingPage === lastPage
            })
            : nextPage(this.planets.next)
              .then(response => {
                this.setPlanets({
                  ...response,
                  ...addPlanetId(response),
                  nextPage: () => nextPage(this.planets.next),
                  page: this.planets.page + 1,
                  last: !response.next
                })
              })
        },

        previousPage: () => {
          this.setPlanets({
            ...this.planets,
            nextPage: () => nextPage(this.planets.next),
            page: page - 1,
            results: null,
            last: false
          })
        },

        results: {
          ...this.planets.results,
          ...(results && { [page]: results })
        },

        next,
        page,
        last,
        count: count || this.planets.count
      }
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
        ...addPlanetId(planet, 'single'),
        ...otherValues
      }
    }
  }
}
