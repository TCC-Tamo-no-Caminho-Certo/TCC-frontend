import { Response } from '../'

import api from 'services/api'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface RoleType {
  title: Role
  role_id: number
}

export interface RolesState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  entities: []
  roles: RoleType[]
}

export type Role =
  | 'guest'
  | 'admin'
  | 'student'
  | 'professor'
  | 'customer'
  | 'evaluator'
  | 'moderator'

const initialState: RolesState = {
  loading: 'idle',
  entities: [],
  roles: []
}

export const getRoles = createAsyncThunk(
  'roles/getRoles',
  async (prevState: RolesState) => {
    if (prevState.roles.length === 0) {
      const response: Response<RoleType[]> = await api.get('info/role')
      return { roles: response.roles }
    }
  }
)

const Roles = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getRoles.fulfilled, (state, action) => ({
      ...state,
      ...action.payload
    }))
  }
})

export const RolesActions = Roles.actions

export default Roles
