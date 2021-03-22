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

interface ResData {
  avatar_uuid: string
  birthday: string
  created_at: string
  full_name: string
  name: string
  phone: null
  role: Role[]
  surname: string
  updated_at: string
  user_id: number
  email: Email[]
}

export interface UserState extends ResData {
  entities: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  selectedRole: Role
}

interface Payload {
  entities?: []
  loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
  selectedRole?: Role
  avatar_uuid?: string
  birthday?: string
  created_at?: string
  full_name?: string
  name?: string
  phone?: null
  role?: Role[]
  surname?: string
  updated_at?: string
  user_id?: number
  email?: Email[]
}

const initialState: UserState = {
  entities: [],
  loading: 'idle',
  selectedRole: 'student',
  avatar_uuid: 'default',
  birthday: '',
  created_at: '',
  full_name: '',
  name: '',
  phone: null,
  role: [],
  surname: '',
  updated_at: '',
  user_id: 0,
  email: [
    {
      address: '',
      email_id: 0,
      institutional: false,
      university_id: 0,
      main: false,
      options: {}
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

    localStorage.setItem('@SLab_selected_role', roles[roles.length - 1])
    return roles[roles.length - 1]
  }

  const { user } = await api.get('user')
  console.log({ ...user, selectedRole: getInitialSelectedRole(user.role) })

  return {
    ...user,
    selectedRole: getInitialSelectedRole(user.role)
  }
})

const User = createSlice({
  name: 'userConfig',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Payload>) => {
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
