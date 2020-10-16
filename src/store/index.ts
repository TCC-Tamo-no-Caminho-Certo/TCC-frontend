import Theme, { ThemeState } from './theme'
import Home from './home'

import { configureStore, combineReducers } from '@reduxjs/toolkit'

export { useSelector, useDispatch } from 'react-redux'

const rootReducer = combineReducers({
  theme: Theme.reducer,
  home: Home.reducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>

// Types
export type { ThemeState }

export default store
