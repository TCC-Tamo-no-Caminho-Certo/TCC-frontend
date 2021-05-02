import Home from './Sync/home'
import User from './Async/user'
import Theme from './Sync/theme'
import Roles from './Async/roles'
import Sidebar from './Sync/sidebar'
import Courses from './Async/courses'
import Validation from './Async/validation'
import Universities from './Async/universities'

import { configureStore } from '@reduxjs/toolkit'

export interface Response<T> {
  message: string
  success: boolean
  [key: string]: T | any
  error?: string
}

export type RootState = ReturnType<typeof store.getState>

const store = configureStore({
  reducer: {
    home: Home.reducer,
    user: User.reducer,
    roles: Roles.reducer,
    theme: Theme.reducer,
    sidebar: Sidebar.reducer,
    courses: Courses.reducer,
    validation: Validation.reducer,
    universities: Universities.reducer
  }
})

export default store
