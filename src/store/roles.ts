import { Response } from './'

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

interface RoleType {
  title: Role
  role_id: number
}

export interface RolesState {
  entities: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  roles: RoleType[]
}

interface Payload {
  entities?: []
  loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
  roles?: RoleType[]
}

const initialState: RolesState = {
  entities: [],
  loading: 'idle',
  roles: [
    {
      title: 'student',
      role_id: 3
    }
  ]
}

export const getRoles = createAsyncThunk('roles/getRoles', async () => {
  const { roles }: Response<RoleType[]> = await api.get('info/role')
  return roles
})

const Roles = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Payload>) => ({
      ...state,
      ...action.payload
    })
  },
  extraReducers: builder => {
    builder.addCase(getRoles.fulfilled, (state, action) => ({
      ...state,
      roles: action.payload
    }))
  }
})

export const RolesActions = Roles.actions

export default Roles
