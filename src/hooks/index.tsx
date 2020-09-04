import React from 'react'

import { ThemeProvider } from './useTheme'
import { HomeSliderProvider } from './useHomeSlider'
import { AuthProvider } from './useAuth'
import { NavbarOpenProvider } from './useNavbarOpen'

const GlobalProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HomeSliderProvider>
          <NavbarOpenProvider>{children}</NavbarOpenProvider>
        </HomeSliderProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default GlobalProvider
