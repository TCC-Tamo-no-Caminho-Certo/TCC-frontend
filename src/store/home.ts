import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const Home = createSlice({
  name: 'sidebar',
  initialState: {
    animate: false,
  },

  reducers: {
    animation(state, action: PayloadAction<boolean>) {
      state.animate = action.payload
    },
  },
})

export const HomeActions = Home.actions

export default Home
