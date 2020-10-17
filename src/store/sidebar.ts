import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const Sidebar = createSlice({
  name: 'home',
  initialState: {
    open: false,
  },

  reducers: {
    openSidebar(state, action: PayloadAction<boolean>) {
      state.open = action.payload
    },
  },
})

export const SidebarActions = Sidebar.actions

export default Sidebar
