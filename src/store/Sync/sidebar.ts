import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SidebarState {
  open?: boolean
}

const initialState: SidebarState = {
  open: undefined
}

const Sidebar = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean>) => ({
      open: action.payload
    })
  }
})

export const SidebarActions = Sidebar.actions

export default Sidebar
