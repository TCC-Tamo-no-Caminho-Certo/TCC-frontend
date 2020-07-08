import React, {createContext, useState, useContext, useEffect} from "react"
import {light, dark} from "styles/theme"
import {ThemeProvider as StyledThemeProvider} from "styled-components"

const ThemeContext = createContext()

export function ThemeProvider({children}) {
  const [theme, setTheme] = useState(() => {
    let localItemValue = localStorage.getItem("theme")
    return localItemValue ? JSON.parse(localItemValue) : false
  })

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <StyledThemeProvider theme={theme ? dark : light}>
      <ThemeContext.Provider value={{theme, setTheme}}>
        {children}
      </ThemeContext.Provider>
    </StyledThemeProvider>
  )
}

export default function useTheme() {
  const {theme, setTheme} = useContext(ThemeContext)
  return {theme, setTheme}
}
