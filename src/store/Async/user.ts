import api from 'services/api'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserResType, UserType } from 'types/Responses/user/index'
import { Role, RolesDataType, RolesResType } from 'types/Responses/user/roles'

export interface UserState extends UserType {
  roles: Role[]
  loading: boolean
  selectedRole: Role
  rolesData?: RolesDataType
}

type Payload = PayloadAction<Partial<UserState>>

const getInitialSelectedRole = (roles: Role[]) => {
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
  loading: false,
  updated_at: '',
  avatar_uuid: 'default',
  selectedRole: 'student'
}

interface GetUserProps {
  id?: string
}

export const getUserRolesData = createAsyncThunk(
  'user/getUserRolesData',
  async (_data, { getState }) => {
    const user: any = getState()

    if (!user.rolesData) {
      const { roles } = await api.get(`users/${user.id}/roles`, {
        data: { roles: [...user.roles] }
      })

      return { ...user, rolesData: roles }
    }
  }
)

export const getUser = createAsyncThunk(
  'user/getUser',
  async ({ id }: GetUserProps, { getState }) => {
    if (id) {
      const { user }: UserResType = await api.get(`users/${id}`)
      const { roles }: RolesResType = await api.get(`users/${id}/roles`)
      const prevState: any = getState()

      return {
        ...prevState,
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
    addCase(getUser.pending, state => ({
      ...state
    }))

    addCase(getUser.fulfilled, (state, { payload }) => ({
      ...state,
      ...payload
    }))

    addCase(getUserRolesData.fulfilled, (state, { payload }) => ({
      ...state,
      ...payload
    }))
  }
})

export const UserActions = User.actions

export default User
