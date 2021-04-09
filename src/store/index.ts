import Theme from './theme'
import Sidebar from './sidebar'
import User from './user'
import Home from './home'
import Universities from './AsyncThunks/universities'
import Roles from './AsyncThunks/roles'
import Courses from './AsyncThunks/courses'

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
    user: User.reducer,
    theme: Theme.reducer,
    home: Home.reducer,
    sidebar: Sidebar.reducer,
    universities: Universities.reducer,
    roles: Roles.reducer,
    courses: Courses.reducer
  }
})

export default store
