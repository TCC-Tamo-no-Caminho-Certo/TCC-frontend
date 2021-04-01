import { Role } from './roles'

import api from 'services/api'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Email {
  main: boolean
  address: string
  email_id: number
  institutional: boolean
  university_id: number
  options?: { [key: string]: any }
}

interface ResData {
  name: string
  roles: Role[]
  phone: string
  emails: Email[]
  surname: string
  user_id: number
  birthday: string
  full_name: string
  created_at: string
  updated_at: string
  avatar_uuid: string
}

export interface UserState extends ResData {
  entities: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  selectedRole: Role
}

interface Payload {
  entities?: []
  selectedRole?: Role
  loading?: 'idle' | 'pending' | 'succeeded' | 'failed'

  roles?: Role[]
  name?: string
  phone?: string
  emails?: Email[]
  surname?: string
  user_id?: number
  birthday?: string
  full_name?: string
  created_at?: string
  updated_at?: string
  avatar_uuid?: string
}

const initialState: UserState = {
  entities: [],
  loading: 'idle',
  selectedRole: 'student',

  name: '',
  phone: '',
  surname: '',
  birthday: '',
  full_name: '',
  created_at: '',
  updated_at: '',
  avatar_uuid: 'default',
  roles: [],
  user_id: 0,
  emails: [
    {
      address: '',
      email_id: 0,
      university_id: 0,
      main: false,
      institutional: false,
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

  console.log('USER', {
    ...user,
    selectedRole: getInitialSelectedRole(user.roles)
  })

  return {
    ...user,
    selectedRole: getInitialSelectedRole(user.roles)
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
