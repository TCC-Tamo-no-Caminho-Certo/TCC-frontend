import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const Modals = createSlice({
  name: 'modals',
  initialState: {
    user: false,
  },

  reducers: {
    setUser(state, action: PayloadAction<boolean>) {
      state.user = action.payload
    },
  },
})

export const ModalsActions = Modals.actions

export default Modals
