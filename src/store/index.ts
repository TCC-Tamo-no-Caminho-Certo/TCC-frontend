import Theme from './theme'
import Sidebar from './sidebar'
import User from './user'
import Home from './home'
import Universities from './universities'
import Roles from './roles'

import { configureStore } from '@reduxjs/toolkit'

export interface Response<T> {
  success: boolean
  message: string
  error?: string
  [key: string]: T | any
}

const store = configureStore({
  reducer: {
    user: User.reducer,
    theme: Theme.reducer,
    home: Home.reducer,
    sidebar: Sidebar.reducer,
    universities: Universities.reducer,
    roles: Roles.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export default store
