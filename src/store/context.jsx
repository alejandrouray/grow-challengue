/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react'
import { useLocalObservable } from 'mobx-react'
import createGlobalStore from './store'

const GlobalContext = createContext(null)

export const GlobalProvider = ({ children }) => {
  const globalStore = useLocalObservable(createGlobalStore)

  return (
    <GlobalContext.Provider value={globalStore}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalStore = () => useContext(GlobalContext)
