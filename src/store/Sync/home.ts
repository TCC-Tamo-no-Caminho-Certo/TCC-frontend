import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface HomeState {
  initial?: boolean
  disable?: boolean
  page?: 'login' | 'signup'
}

type Payload = PayloadAction<HomeState>

const initialState: HomeState = {
  disable: false,
  initial: false,
  page: 'login'
}

const Home = createSlice({
  name: 'home',
  initialState,
  reducers: {
    update: (state, action: Payload) => ({
      ...state,
      ...action.payload
    })
  }
})

export const HomeActions = Home.actions

export default Home
