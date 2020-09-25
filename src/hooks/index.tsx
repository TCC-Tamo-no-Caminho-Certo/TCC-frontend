import React from 'react'

import { ThemeProvider } from './useTheme'
import { HomeSliderProvider } from './useHomeSlider'
import { AuthProvider } from './useAuth'

const GlobalProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HomeSliderProvider>{children}</HomeSliderProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default GlobalProvider
