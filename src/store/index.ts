import Theme, { ThemeState } from './theme'
import Sidebar from './sidebar'
import User, { UserState } from './user'
import Home from './home'
import Modals from './modals'

import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  user: User.reducer,
  theme: Theme.reducer,
  home: Home.reducer,
  sidebar: Sidebar.reducer,
  modals: Modals.reducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>

// Types
export type { ThemeState }
export type { UserState }

export default store

export { useSelector, useDispatch } from 'react-redux'
