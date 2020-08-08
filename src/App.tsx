import React from 'react'

import GlobalStyle from 'styles/GlobalStyle'

import Routes from 'routes/index'

import GlobalContext from 'hooks'

const App: React.FC = () => {
  return (
    <GlobalContext>
      <Routes />

      <GlobalStyle />
    </GlobalContext>
  )
}

export default App
