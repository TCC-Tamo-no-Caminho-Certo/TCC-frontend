import Home from './Sync/home'
import AsyncUser from './Async/user'
import Theme from './Sync/theme'
import Sidebar from './Sync/sidebar'
import AsyncValidation from './Async/validation'
import asyncUniversities from './Async/universities'
import AsyncEmails from './Async/emails'

import { configureStore } from '@reduxjs/toolkit'

export type RootState = ReturnType<typeof store.getState>

const store = configureStore({
  reducer: {
    home: Home.reducer,
    theme: Theme.reducer,
    sidebar: Sidebar.reducer,

    asyncUser: AsyncUser.reducer,
    asyncEmails: AsyncEmails.reducer,
    asyncValidation: AsyncValidation.reducer,
    asyncUniversities: asyncUniversities.reducer
  }
})

export default store
