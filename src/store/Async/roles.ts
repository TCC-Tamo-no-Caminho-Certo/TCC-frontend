import api from 'services/api'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Role } from 'types/Responses/user/roles'

export interface RoleType {
  title: Role
  role_id: number
}

export interface RolesState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  entities: []
  roles: RoleType[]
}

const initialState: RolesState = {
  loading: 'idle',
  entities: [],
  roles: []
}

export const getRoles = createAsyncThunk(
  'roles/getRoles',
  async (prevState: RolesState) => {
    if (prevState.roles.length === 0) {
      const response: any = await api.get('info/role')
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
