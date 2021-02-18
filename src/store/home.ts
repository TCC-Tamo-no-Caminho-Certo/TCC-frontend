import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Page = 'login' | 'signup'

export interface HomeState {
  initial: boolean
  page: Page
}

interface HomeStatePayload {
  initial?: boolean
  page?: Page
}

const initialState: HomeState = {
  initial: false,
  page: 'login'
}

const Home = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<HomeStatePayload>) => ({
      ...state,
      ...action.payload
    })
  }
})

export const HomeActions = Home.actions

export default Home
