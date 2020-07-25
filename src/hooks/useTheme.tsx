import React, { createContext, useState, useEffect, useContext } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import dark from 'styles/themes/dark'
import light from 'styles/themes/light'

interface Theme {
  themeState: boolean
  setThemeState: React.Dispatch<boolean>
}

const ThemeContext = createContext<Theme>({} as Theme)

export const ThemeProvider: React.FC = ({ children }) => {
  const [themeState, setThemeState] = useState(() => {
    const localItemValue = localStorage.getItem('theme')
    return localItemValue ? JSON.parse(localItemValue) : false
  })

  useEffect(() => {
    localStorage.setItem('theme', themeState)
  }, [themeState])

  return (
    <StyledThemeProvider theme={themeState ? dark : light}>
      <ThemeContext.Provider value={{ themeState, setThemeState }}>
        {children}
      </ThemeContext.Provider>
    </StyledThemeProvider>
  )
}

export const useTheme = (): Theme => {
  const themeState = useContext(ThemeContext)
  if (!themeState)
    throw new Error('useTheme must be used within an ThemeProvider')
  return themeState
}
