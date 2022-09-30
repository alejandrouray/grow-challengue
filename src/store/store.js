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

          if (hasStored) {
            this.setPlanets({
              ...this.planets,
              nextPage: () => nextPage(storedNext),
              results: null,
              page: followingPage,
              last: followingPage === lastPage
            })
          } else {
            nextPage(this.planets.next)
              .then(response => {
                const {
                  next: nextFetched,
                  previous: previousFetched
                } = response

                this.setPlanets({
                  ...response,
                  nextPage: () => nextPage(this.planets.next),
                  page: nextFetched ? nextFetched.at(-1) - 1 : Number(previousFetched.at(-1)) + 1,
                  ...(!nextFetched
                    ? { next: this.planets.next, last: true }
                    : { last: false }
                  )
                })
              })
          }
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
    search: '',
    setSearch (search) {
      this.search = search
    }
  }
}
