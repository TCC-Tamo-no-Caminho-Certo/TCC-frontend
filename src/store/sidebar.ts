import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SidebarState {
  open: boolean
}

const initialState: SidebarState = {
  open: false,
}

const Sidebar = createSlice({
  name: 'home',
  initialState,
  reducers: {
    toggleSidebar(state, action: PayloadAction<boolean>) {
      state.open = action.payload
    },
  },
})

export const SidebarActions = Sidebar.actions

export default Sidebar
