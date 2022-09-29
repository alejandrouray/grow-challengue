export default function createGlobalStore () {
  return {
    planets: {
      nextPage: () => {},
      results: [],
      next: null,
      page: 1,
      last: false
    },
    setPlanets ({ nextPage, results, next, page = 1, last }) {
      this.planets = {
        nextPage: () => {
          const {
            results: storedResults,
            page: storedPage,
            next: storedNext
          } = this.planets

          const hasStored = storedResults[storedPage + 1]

          if (hasStored) {
            this.setPlanets({
              ...this.planets,
              nextPage: () => nextPage(storedNext),
              results: null,
              page: page + 1,
              last: page + 1 === Number(storedNext.at(-1))
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
        last
      }
    }
  }
}
