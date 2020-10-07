/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const home = createSlice({
  name: 'home',
  initialState: {
    animate: false,
  },

  reducers: {
    changeState(state, action: PayloadAction<boolean>) {
      state.animate = action.payload
    },
  },
})

export default home
