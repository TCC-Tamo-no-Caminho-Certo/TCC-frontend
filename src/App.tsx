import React, { useEffect } from 'react'

import './i18n'

import GlobalStyle from 'styles/GlobalStyle'

import Routes from 'routes'

import { ThemeState } from 'store/theme'
import { RootState } from 'store'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

const App = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage('pt-BR')
  }, [i18n])

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
