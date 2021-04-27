import Home from './Sync/home'
import User from './Async/user'
import Popup from './Sync/popup'
import Theme from './Sync/theme'
import Roles from './Async/roles'
import Sidebar from './Sync/sidebar'
import Courses from './Async/courses'
import Validation from './Async/validation'
import GlobalStyle from './Sync/globalStyle'
import Universities from './Async/universities'

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
    roles: Roles.reducer,
    popup: Popup.reducer,
    theme: Theme.reducer,
    sidebar: Sidebar.reducer,
    courses: Courses.reducer,
    validation: Validation.reducer,
    globalStyle: GlobalStyle.reducer,
    universities: Universities.reducer
  }
})

export default store
