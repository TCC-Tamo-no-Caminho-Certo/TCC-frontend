import React from 'react'
import { ThemeProvider } from './useTheme'
import { RegisterProvider } from './useRegister'

const GlobalProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <RegisterProvider>{children}</RegisterProvider>
    </ThemeProvider>
  )
}

export default GlobalProvider
