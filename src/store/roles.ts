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

type Payload = PayloadAction<Partial<RolesState>>

const initialState: RolesState = {
  entities: [],
  loading: 'idle',
  roles: []
}

export const getRoles = createAsyncThunk(
  'roles/getRoles',
  async (prevState: RolesState) => {
    const { roles } = prevState

    if (roles.length === 0) {
      console.log('REDUX-REQ-ROLES')
      const response: Response<RoleType[]> = await api.get('info/role')
      return { roles: response.roles }
    }
  }
)

const Roles = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    update: (state, action: Payload) => ({
      ...state,
      ...action.payload
    })
  },
  extraReducers: builder => {
    builder.addCase(getRoles.fulfilled, (state, action) => ({
      ...state,
      ...action.payload
    }))
  }
})

export const RolesActions = Roles.actions

export default Roles
