import Theme, { ThemeState } from './theme'
import Sidebar from './sidebar'
import Home from './home'

import { configureStore, combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
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
