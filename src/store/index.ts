import Home from './Sync/home'
import User from './Async/user'
import Theme from './Sync/theme'
import Sidebar from './Sync/sidebar'
import Validation from './Async/validation'
import Universities from './Async/universities'
import AsyncEmails from './Async/emails'

import { configureStore } from '@reduxjs/toolkit'

export type RootState = ReturnType<typeof store.getState>

const store = configureStore({
  reducer: {
    home: Home.reducer,
    user: User.reducer,
    theme: Theme.reducer,
    sidebar: Sidebar.reducer,
    validation: Validation.reducer,
    asyncEmails: AsyncEmails.reducer,
    universities: Universities.reducer
  }
})

export default store
