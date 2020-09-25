import React from 'react'

import { Provider } from 'react-redux'
import store from 'store'

import { HomeSliderProvider } from './useHomeSlider'
import { AuthProvider } from './useAuth'
import { NavbarOpenProvider } from './useNavbarOpen'
import { MasterCardPositionProvider } from './useMasterCardPosition'

const GlobalProvider: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <HomeSliderProvider>
          <NavbarOpenProvider>
            <MasterCardPositionProvider>{children}</MasterCardPositionProvider>
          </NavbarOpenProvider>
        </HomeSliderProvider>
      </AuthProvider>
    </Provider>
  )
}

export default GlobalProvider
