import React from 'react'
import GlobalStyle from 'styles/GlobalStyle'
import GlobalContext from 'hooks'
import Routes from './routes/index'

const App: React.FC = () => {
  return (
    <GlobalContext>
      <Routes />
      <GlobalStyle />
    </GlobalContext>
  )
}

export default App
