import Theme, { ThemeState } from './theme'
import User from './user'
import Sidebar from './sidebar'
import Home from './home'

import { configureStore, combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  user: User.reducer,
  theme: Theme.reducer,
  home: Home.reducer,
  sidebar: Sidebar.reducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>

// Types
export type { ThemeState }

export default store

export { useSelector, useDispatch } from 'react-redux'
