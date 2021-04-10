import { Role } from './AsyncThunks/roles'

import api from 'services/api'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Email {
  main: boolean
  address: string
  email_id: number
  institutional: boolean
  university_id: number
  options?: { [key: string]: any }
}

export interface UserState {
  entities: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  dataLoading: boolean
  selectedRole: Role
  name: string
  roles: Role[]
  phone: string
  surname: string
  user_id: number
  birthday: string
  full_name: string
  created_at: string
  updated_at: string
  avatar_uuid: string
  emails: Email[]
  moderator?: [
    {
      university_id: number
    }
  ]
  professor?: {
    postgraduate: number
    linkedin: null
    lattes: null
    orcid: null
    universities: [
      {
        university_id: number
        campus_id: number
        course_id: number
        register: number
        full_time: number
      }
    ]
  }
}

type Payload = PayloadAction<Partial<UserState>>

const initialState: UserState = {
  entities: [],
  loading: 'idle',
  selectedRole: 'student',
  dataLoading: true,
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

  return {
    ...user,
    selectedRole: getInitialSelectedRole(user.roles),
    dataLoading: false
  }
})

const User = createSlice({
  name: 'userConfig',
  initialState,
  reducers: {
    update: (state, action: Payload) => {
      if (action.payload.selectedRole !== undefined)
        localStorage.setItem('@SLab_selected_role', action.payload.selectedRole)

      return {
        ...state,
        ...action.payload
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, action) => ({
      ...state,
      ...action.payload
    }))
  }
})

export const UserActions = User.actions

export default User
