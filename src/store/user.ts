/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
  user_id: number
  name: string
  surname: string
  email: string
  password: number
  avatar: string
  birthday: string
  role: string
  created_at: string
  updated_at: string
}

const initialState: UserState = {
  user_id: 0,
  name: '',
  surname: '',
  email: '',
  password: 1,
  avatar: '',
  birthday: '',
  role: '',
  created_at: '',
  updated_at: '',
}

const User = createSlice({
  name: 'userConfig',
  initialState,

  reducers: {
    userInfo: (state, action) => {
      console.log('USER_DATE', action.payload)

      return action.payload
    },
  },
})

export const UserActions = User.actions

export default User
