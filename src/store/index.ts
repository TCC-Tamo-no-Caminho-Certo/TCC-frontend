import Theme, { ThemeState } from './theme'
import Sidebar from './sidebar'
import User, { UserState } from './user'
import Home from './home'

import { combineReducers, configureStore } from '@reduxjs/toolkit'

export { useSelector, useDispatch } from 'react-redux'

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
export type { UserState }
export type { ThemeState }

export default store
