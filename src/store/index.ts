import authReducer from './authReducer'
import themeReducer from './themeReducer'

import { ThemeAttributes } from 'styles/themes/styled'

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

const rootReducer = combineReducers({
  auth: authReducer.reducer,

  theme: themeReducer.reducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type ThemeState = ThemeAttributes

export const ThemeActions = themeReducer.actions
export const authActions = authReducer.actions

export { useSelector, useDispatch }

export default store
