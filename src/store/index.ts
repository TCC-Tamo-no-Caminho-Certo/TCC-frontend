import Auth from './Auth'
import Theme,  { ThemeState } from './Theme'
import Home from './Home'

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

const rootReducer = combineReducers({
  auth: Auth.reducer,
  theme: Theme.reducer,
  home: Home.reducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export { useSelector, useDispatch }

// Types

export type { ThemeState }

export default store
