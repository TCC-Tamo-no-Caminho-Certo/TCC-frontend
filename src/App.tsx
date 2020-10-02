import React from 'react'

import Routes from 'routes/index'

import GlobalContext from 'hooks'

import store from 'store'
import { Provider } from 'react-redux'

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <GlobalContext>
        <Routes />
      </GlobalContext>
    </Provider>
  )
}

export default App
