/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'

export type RoleTypes =
  | 'admin'
  | 'base user'
  | 'aris user'
  | 'student'
  | 'professor'
  | 'customer'
  | 'evaluator'
  | 'moderator'

export interface UserState {
  user_id: number
  name: string
  surname: string
  email: string
  avatar: string
  birthday: string
  created_at: string
  updated_at: string
  roles: RoleTypes[]
  selectedRole: RoleTypes
}

const initialState: UserState = {
  user_id: 0,
  name: '',
  surname: '',
  email: '',
  avatar: '',
  birthday: '',
  created_at: '',
  updated_at: '',
  roles: ['base user'],
  selectedRole: 'base user',
}

const User = createSlice({
  name: 'userConfig',
  initialState,

  reducers: {
    setUserInfo: (state, action) => action.payload,
    updateUserInfo: (state, action) => ({ ...state, ...action.payload }),
  },
})

export const UserActions = User.actions

export default User
