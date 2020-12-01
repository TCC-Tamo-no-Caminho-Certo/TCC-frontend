import React from 'react'

import GlobalStyle from 'styles/GlobalStyle'

import Routes from 'routes'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'

import { BrowserRouter } from 'react-router-dom'

const App: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <>
      <GlobalStyle theme={theme} />

      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  )
}

export default App
