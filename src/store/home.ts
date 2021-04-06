import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface HomeState {
  initial: boolean
  page: 'login' | 'signup'
}

const initialState: HomeState = {
  initial: false,
  page: 'login'
}

const Home = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Partial<HomeState>>) => ({
      ...state,
      ...action.payload
    })
  }
})

export const HomeActions = Home.actions

export default Home
