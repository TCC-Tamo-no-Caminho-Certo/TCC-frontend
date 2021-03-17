import api from 'services/api'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Role =
  | 'guest'
  | 'admin'
  | 'student'
  | 'professor'
  | 'customer'
  | 'evaluator'
  | 'moderator'

interface Email {
  address: string
  email_id: number
  institutional: boolean
  university_id: number
  main: boolean
  options?: { [key: string]: any }
}

export interface UserState {
  entities: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  selectedRole: Role
  user_id: number
  role: Role[]
  name: string
  surname: string
  full_name: string
  email: Email[]
  birthday: string
  avatar_uuid: string
  updated_at: string
  created_at: string
  phone: null
}

export interface UserStatePayload {
  user_id?: number
  name?: string
  surname?: string
  avatar_uuid?: string
  birthday?: string
  created_at?: string
  updated_at?: string
  role?: Role[]
  selectedRole?: Role
  email?: Email[]
}

const initialState: UserState = {
  entities: [],
  full_name: '',
  phone: null,
  loading: 'idle',
  user_id: 0,
  name: '',
  surname: '',
  avatar_uuid: '',
  birthday: '',
  created_at: '',
  updated_at: '',
  role: ['guest'],
  selectedRole: 'guest',
  email: [
    {
      address: '',
      main: true,
      institutional: false,
      email_id: 0,
      university_id: 0
    }
  ]
}

export const getUser = createAsyncThunk('userConfig/getUser', async () => {
  const getInitialSelectedRole = (roles: Role[]): Role => {
    const localRole = localStorage.getItem('@SLab_selected_role') as Role

    if (localRole) {
      const haveHole = roles.filter(role => role === localRole)
      if (haveHole.length !== 0) return haveHole[0]
    }

    localStorage.setItem('@SLab_selected_role', roles[0])
    return roles[0]
  }

  const { user } = await api.get('user')
  console.log(user)

  return {
    ...user,
    selectedRole: getInitialSelectedRole(user.role)
  }
})

const User = createSlice({
  name: 'userConfig',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<UserStatePayload>) => {
      if (action.payload.selectedRole !== undefined)
        localStorage.setItem('@SLab_selected_role', action.payload.selectedRole)

      return {
        ...state,
        ...action.payload
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (_state, action) => ({
      ...action.payload
    }))
  }
})

export const UserActions = User.actions

export default User
