import api from 'services/api'

import { RootState } from 'store'

import { UserResType, UserType } from 'types/Responses/user/index'
import { RolesResType, RolesType, RoleType } from 'types/Responses/user/roles'
import { RolesDataType } from 'types/Responses/user/rolesData'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState extends UserType {
  roles: RolesType
  loading: boolean
  selectedRole: RoleType
  rolesData?: RolesDataType
}

interface GetUserProps {
  id?: string
}

type Payload = PayloadAction<Partial<UserState>>

const getInitialSelectedRole = (roles: RolesType) => {
  const localRole = localStorage.getItem('@SLab_selected_role')

  if (localRole) {
    const haveLocalHole = roles.find(role => role === localRole)
    if (haveLocalHole) return haveLocalHole
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
  loading: true,
  updated_at: '',
  avatar_uuid: 'default',
  selectedRole: 'student'
}

export const getUser = createAsyncThunk(
  'user/getUser',
  async ({ id }: GetUserProps, { getState }) => {
    if (id) {
      const prevState = getState() as RootState
      const { user }: UserResType = await api.get(`users/${id}`)
      const { roles }: RolesResType = await api.get(`users/${id}/roles`)

      return {
        ...prevState.user,
        ...user,
        roles,
        selectedRole: getInitialSelectedRole(roles)
      }
    }
  }
)

const userUpdate = (state: UserState, { payload }: Payload) => {
  const { selectedRole } = payload

  if (selectedRole !== undefined)
    localStorage.setItem('@SLab_selected_role', selectedRole)

  return { ...state, ...payload }
}

const User = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update: userUpdate,
    reset: () => initialState
  },
  extraReducers: ({ addCase }) => {
    addCase(getUser.pending, state => ({ ...state, loading: true }))

    addCase(getUser.fulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
      loading: false
    }))
  }
})

export const UserActions = User.actions

export default User
