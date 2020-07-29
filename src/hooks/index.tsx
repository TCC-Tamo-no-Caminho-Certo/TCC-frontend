import React from 'react'
import { ThemeProvider } from './useTheme'
import { RegisterSlideProvider } from './useRegisterSlide'

const GlobalProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <RegisterSlideProvider>{children}</RegisterSlideProvider>
    </ThemeProvider>
  )
}

export default GlobalProvider
