import React from 'react'

import GlobalStyle from 'styles/GlobalStyle'

import Routes from 'routes/index'

import GlobalContext from 'hooks'
import store from 'store'

const App: React.FC = () => {
  const { theme } = store.getState()

  return (
    <GlobalContext>
      <Routes />

      <GlobalStyle theme={theme} />
    </GlobalContext>
  )
}

export default App
