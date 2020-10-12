import React from 'react'

import { HomeSliderProvider } from './useHomeSlider'
import { AuthProvider } from './useAuth'

import GlobalStyle from 'styles/GlobalStyle'

import { ThemeState } from 'store/Theme'
import { useSelector, RootState } from 'store'

const GlobalProvider: React.FC = ({ children }) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <>
      <GlobalStyle theme={theme} />

      <HomeSliderProvider>{children}</HomeSliderProvider>
    </>
  )
}

export default GlobalProvider
