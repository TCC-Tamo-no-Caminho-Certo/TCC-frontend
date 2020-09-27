import React from 'react'

import { HomeSliderProvider } from './useHomeSlider'
import { AuthProvider } from './useAuth'

import store from 'store'

import { Provider } from 'react-redux'

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
