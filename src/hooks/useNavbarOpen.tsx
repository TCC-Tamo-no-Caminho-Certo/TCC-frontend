import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react'

interface RegisterSlide {
  navbarOpen: boolean
  setNavbarOpen: Dispatch<SetStateAction<boolean>>
}

const NavbarOpenContext = createContext({} as RegisterSlide)

export const NavbarOpenProvider: React.FC = ({ children }) => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  return (
    <NavbarOpenContext.Provider value={{ navbarOpen, setNavbarOpen }}>
      {children}
    </NavbarOpenContext.Provider>
  )
}

export const useNavbarOpen = (): RegisterSlide => {
  const navbarOpen = useContext(NavbarOpenContext)
  if (!navbarOpen)
    throw new Error('useNavbarOpen must be used within an NavbarOpenContext.Provider')
  return navbarOpen
}
