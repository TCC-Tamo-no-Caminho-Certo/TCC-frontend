import Theme from './theme'
import Sidebar from './sidebar'
import User from './AsyncThunks/user'
import Home from './home'
import Universities from './AsyncThunks/universities'
import Roles from './AsyncThunks/roles'
import Courses from './AsyncThunks/courses'
import Validation from './AsyncThunks/validation'

import { configureStore } from '@reduxjs/toolkit'

export interface Response<T> {
  success: boolean
  message: string
  error?: string
  [key: string]: T | any
}

export type RootState = ReturnType<typeof store.getState>

const store = configureStore({
  reducer: {
    home: Home.reducer,
    user: User.reducer,
    theme: Theme.reducer,
    roles: Roles.reducer,
    courses: Courses.reducer,
    sidebar: Sidebar.reducer,
    validation: Validation.reducer,
    universities: Universities.reducer
  }
})

export default store
