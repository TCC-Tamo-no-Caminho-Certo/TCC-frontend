import React from 'react'

import GlobalStyle from 'styles/GlobalStyle'

import Routes from 'routes'

import { ThemeState } from 'store/theme'
import { RootState } from 'store'

import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

const App: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
