import React from 'react'

import { Provider } from 'react-redux'
import store from 'store'

import { HomeSliderProvider } from './useHomeSlider'
import { AuthProvider } from './useAuth'

const GlobalProvider: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <HomeSliderProvider>{children}</HomeSliderProvider>
      </AuthProvider>
    </Provider>
  )
}

export default GlobalProvider
