import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const Home = createSlice({
  name: 'sidebar',
  initialState: {
    initial: false,
    page: 'login',
  },

  reducers: {
    initial(state, action: PayloadAction<boolean>) {
      state.initial = action.payload
    },
    page(state, action: PayloadAction<string>) {
      state.page = action.payload
    },
  },
})

export const HomeActions = Home.actions

export default Home
