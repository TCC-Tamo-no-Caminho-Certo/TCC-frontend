import React from 'react'

import { ThemeProvider } from './useTheme'
import { RegisterSlideProvider } from './useRegisterSlide'
import { AuthProvider } from './useAuth'

const GlobalProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RegisterSlideProvider>{children}</RegisterSlideProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default GlobalProvider
