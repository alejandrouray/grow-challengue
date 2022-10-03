# Star Wars Explorer

A project built with Vite, React, Tailwind CSS, React Router and MobX to interface with the Star Wars API (https://swapi.dev/).
Developed under the functional paradigm. Using caching techniques with localStorage. Also with paging functionalities.
Reuse of components. API requests as services and more.

## Live Demo

> https://star-wars-explorer-two.vercel.app/

## Installation

> npm run install

> npm run dev

## Requeriments

Use the Star Wars API to get a list of all the planets in the Star Wars Universe.

Note, the api is paginated, so you will need to pull multiple times to get all the planets.

Display all of those planets in a list on the front page of your app. You may choose to show all the planets, or paginate them for the UX experience.

Add a text input at the top of the page that allows a user to search the full list of planets. The filtering should NOT re-call any api calls.

When a user clicks on a planet, they should navigate to a new page that shows a list of the residents of the planet fetched from the Star Wars API.

When a user clicks on one of the residents, they should navigate to another page that shows the personal details of that resident.

Include a header with breadcrumbs. Something like All Planets / Planet Name / Resident Name. Each breadcrumb section should be clickable to navigate to the appropriate page.

Include a service file that contains all the api urls and gets. Your React components should not contain any url references.
