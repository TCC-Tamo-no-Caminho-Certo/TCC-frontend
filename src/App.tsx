import React from 'react'

import Routes from 'routes'

import store from 'store'
import GlobalContext from 'hooks'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalContext>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </GlobalContext>
    </Provider>
  )
}

export default App
