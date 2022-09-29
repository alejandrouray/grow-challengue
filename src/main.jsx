import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GlobalProvider } from './store/context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
)
