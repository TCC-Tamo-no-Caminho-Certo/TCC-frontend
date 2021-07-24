import api from 'services/api'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserResType, UserType } from 'types/Responses/user/index'
import { Role } from 'types/Responses/user/roles'

export interface UserState extends UserType {
  loading: boolean
  selectedRole: Role
}

type Payload = PayloadAction<Partial<UserState>>

const getInitialSelectedRole = (roles: Role[]) => {
  const localRole = localStorage.getItem('@SLab_selected_role')

  if (localRole) {
    const haveLocalHole = roles.filter(role => role === localRole)
    if (haveLocalHole.length !== 0) return haveLocalHole[0]
  }

  localStorage.setItem('@SLab_selected_role', roles[roles.length - 1])
  return roles[roles.length - 1]
}

export const initialState: UserState = {
  id: 0,
  name: '',
  roles: [],
  phone: '',
  surname: '',
  birthday: '',
  full_name: '',
  created_at: '',
  loading: false,
  updated_at: '',
  avatar_uuid: 'default',
  selectedRole: 'student'
}

export const getUser = createAsyncThunk(
  'user/getUser',
  async (id?: string | null) => {
    if (id) {
      const { user }: UserResType = await api.get(`users/${id.split('-')[0]}`)

      const roles: Role[] = await api.get('users/roles', {
        data: { ids: [id] }
      })

      return {
        ...user,
        loading: false,
        selectedRole: getInitialSelectedRole(roles)
      }
    }
  }
)

const User = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
    update: (state, { payload }: Payload) => {
      if (payload.selectedRole !== undefined)
        localStorage.setItem('@SLab_selected_role', payload.selectedRole)

      return { ...state, ...payload }
    }
  },
  extraReducers: ({ addCase }) => {
    addCase(getUser.pending, state => {
      state.loading = true
    })

    addCase(getUser.fulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
      loading: false
    }))
  }
})

export const UserActions = User.actions

export default User
