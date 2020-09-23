import React from 'react'

import { ThemeProvider } from './useTheme'
import { HomeSliderProvider } from './useHomeSlider'
import { AuthProvider } from './useAuth'
import { NavbarOpenProvider } from './useNavbarOpen'
import { MasterCardPositionProvider } from './useMasterCardPosition'

const GlobalProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HomeSliderProvider>
          <NavbarOpenProvider>
            <MasterCardPositionProvider>{children}</MasterCardPositionProvider>
          </NavbarOpenProvider>
        </HomeSliderProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default GlobalProvider
