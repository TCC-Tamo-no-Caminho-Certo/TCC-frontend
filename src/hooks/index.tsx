import React from 'react'

import { HomeSliderProvider } from './useHomeSlider'
import { AuthProvider } from './useAuth'

import GlobalStyle from 'styles/GlobalStyle'

import { useSelector, RootState, ThemeState } from 'store'

const GlobalProvider: React.FC = ({ children }) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <>
      <GlobalStyle theme={theme} />

      <AuthProvider>
        <HomeSliderProvider>{children}</HomeSliderProvider>
      </AuthProvider>
    </>
  )
}

export default GlobalProvider
