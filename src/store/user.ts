/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'

interface UserInfo {
  user_id: number
  name: string
  surname: string
  email: string
  avatar: string
  birthday: string
  role: string
  created_at: string
  updated_at: string
}

export interface UserState {
  validated: boolean
  info: UserInfo
}

const initialState: UserState = {
  validated: false,
  info: {
    user_id: 0,
    name: '',
    surname: '',
    email: '',
    avatar: '',
    birthday: '',
    role: '',
    created_at: '',
    updated_at: '',
  },
}

const User = createSlice({
  name: 'userConfig',
  initialState,

  reducers: {
    setUserInfo: (state, action) => ({ validated: state.validated, info: action.payload }),
    setValidated: (state, action) => ({ validated: action.payload, info: state.info }),
  },
})

export const UserActions = User.actions

export default User
