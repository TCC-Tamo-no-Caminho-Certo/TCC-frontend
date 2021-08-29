import { Reducer } from 'store'

import { createSlice } from '@reduxjs/toolkit'

export interface HomeState {
  initial?: boolean
  disable?: boolean
  page?: 'login' | 'signup'
}

const initialState: HomeState = {
  page: 'login',
  disable: false,
  initial: false
}

const update: Reducer<HomeState> = (state, { payload }) => ({
  ...state,
  ...payload
})

const Home = createSlice({
  name: 'home',
  initialState,
  reducers: { update }
})

export const HomeActions = Home.actions

export default Home
