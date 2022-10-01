import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { GlobalProvider } from './store/context'
import './index.css'

import Home from './routes/Home'
import NotFound from './routes/NotFound'
import Planet from './routes/Planet'
import Breadcrumb from './components/Breadcrumb'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: 'planets/:planetId',
    element: (
      <>
        <Breadcrumb />
        <Planet />
      </>
    )
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalProvider>
    <div className='min-h-screen px-4 pb-16 lg:px-16 xl:px-48 bg-center bg-contain font-jedi bg-hero-pattern'>
      <RouterProvider router={router} />
    </div>
  </GlobalProvider>
)
