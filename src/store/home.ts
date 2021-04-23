import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface HomeState {
  initial: boolean
  page: 'login' | 'signup'
}

type Payload = PayloadAction<HomeState>

const initialState: HomeState = {
  initial: false,
  page: 'login'
}

const Home = createSlice({
  name: 'home',
  initialState,
  reducers: {
    update: (_state, action: Payload) => ({
      ...action.payload
    })
  }
})

export const HomeActions = Home.actions

export default Home
