import Home from './Sync/home'
import AsyncUser from './Async/user'
import Theme from './Sync/theme'
import Sidebar from './Sync/sidebar'
import AsyncValidation from './Async/validation'
import universities from './Async/universities'
import Emails from './Async/emails'
import AsyncRolesData from './Async/rolesData'
import UserUniversities from './Async/userUniversities'

import { CaseReducer, configureStore, PayloadAction } from '@reduxjs/toolkit'

export type RootState = ReturnType<typeof Store.getState>
export type Reducer<T> = CaseReducer<T, PayloadAction<T>>

const Store = configureStore({
  reducer: {
    validation: AsyncValidation.reducer,

    user: AsyncUser.reducer,
    rolesData: AsyncRolesData.reducer,
    emails: Emails.reducer,
    userUniversities: UserUniversities.reducer,

    home: Home.reducer,
    theme: Theme.reducer,
    sidebar: Sidebar.reducer,

    universities: universities.reducer
  }
})

export default Store
