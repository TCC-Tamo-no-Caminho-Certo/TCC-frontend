import Theme from './theme'
import Sidebar from './sidebar'
import User from './user'
import Home from './home'

import { configureStore } from '@reduxjs/toolkit'

export { useSelector, useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    user: User.reducer,
    theme: Theme.reducer,
    home: Home.reducer,
    sidebar: Sidebar.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
