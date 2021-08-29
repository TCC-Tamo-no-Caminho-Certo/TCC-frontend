import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'

type Reducer = CaseReducer<SidebarState, PayloadAction<boolean>>

export interface SidebarState {
  open?: boolean
}

const initialState: SidebarState = {}

const toggleSidebar: Reducer = (state, action) => ({ open: action.payload })

const Sidebar = createSlice({
  initialState,
  name: 'sidebar',
  reducers: { toggleSidebar }
})

export const SidebarActions = Sidebar.actions

export default Sidebar
