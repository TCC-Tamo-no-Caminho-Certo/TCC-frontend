import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react'

interface HomeSliderContextProps {
  homeSlider: boolean
  setHomeSlider: Dispatch<SetStateAction<boolean>>
}

const HomeSlideContext = createContext({} as HomeSliderContextProps)

export const HomeSliderProvider: React.FC = ({ children }) => {
  const [homeSlider, setHomeSlider] = useState(false)

  return (
    <HomeSlideContext.Provider value={{ homeSlider, setHomeSlider }}>
      {children}
    </HomeSlideContext.Provider>
  )
}

export const useHomeSlider = (): HomeSliderContextProps => {
  const homeSlider = useContext(HomeSlideContext)
  if (!homeSlider) throw new Error('useRegister must be used within an RegisterProvider')
  return homeSlider
}
