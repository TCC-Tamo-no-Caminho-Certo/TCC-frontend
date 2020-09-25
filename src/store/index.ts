import { configureStore, combineReducers } from '@reduxjs/toolkit'

import authReducer from './authReducer'
import themeReducer from './themeReducer'

const rootReducer = combineReducers({
  auth: authReducer.reducer,
  theme: themeReducer.reducer,
})

const store = configureStore({
  reducer: rootReducer
})



export type RootState = ReturnType<typeof rootReducer>

export default store