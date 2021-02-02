/* eslint-disable camelcase */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Role =
  | 'admin'
  | 'guest'
  | 'aris'
  | 'student'
  | 'professor'
  | 'customer'
  | 'evaluator'
  | 'moderator'

interface Email {
  email: string
  main: boolean
  options?: { [key: string]: any }
}

export interface UserState {
  user_id: number
  name: string
  surname: string
  avatar: string
  birthday: string
  created_at: string
  updated_at: string
  roles: Role[]
  selectedRole: Role
  emails: Email[]
}

export interface UserStatePayload {
  user_id?: number
  name?: string
  surname?: string
  avatar?: string
  birthday?: string
  created_at?: string
  updated_at?: string
  roles?: Role[]
  selectedRole?: Role
  emails?: Email[]
}

const initialState: UserState = {
  user_id: 0,
  name: '',
  surname: '',
  avatar: '',
  birthday: '',
  created_at: '',
  updated_at: '',
  roles: ['guest'],
  selectedRole: 'guest',
  emails: [{ email: '', main: true }],
}

const User = createSlice({
  name: 'userConfig',
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserStatePayload>) => {
      if (action.payload.selectedRole !== undefined)
        localStorage.setItem('@SLab_selected_role', action.payload.selectedRole)

      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const UserActions = User.actions

export default User
