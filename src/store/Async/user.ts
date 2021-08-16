import api from 'services/api'

import { RootState } from 'store'

import { UserResType, UserType } from 'types/Responses/user/index'
import { RolesResType, RolesType, RoleType } from 'types/Responses/user/roles'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface UserOnStateType extends UserType {
  roles?: RolesType
  selectedRole?: RoleType
}

export interface AsyncUserState {
  loading: boolean
  user?: UserOnStateType
}

interface GetUserProps {
  id: number
}

export const initialState: AsyncUserState = {
  loading: true,
  user: undefined
}

const getInitialSelectedRole = (roles: RolesType) => {
  const localRole = localStorage.getItem('@SLab_selected_role')

  if (localRole) {
    const haveLocalHole = roles.find(role => role === localRole)
    if (haveLocalHole) return haveLocalHole
  }

  localStorage.setItem('@SLab_selected_role', roles[roles.length - 1])

  return roles[roles.length - 1]
}

export const getUser = createAsyncThunk(
  'user/getUser',
  async ({ id }: GetUserProps, { getState }) => {
    const { asyncUser } = getState() as RootState
    const { user }: UserResType = await api.get(`api/users/${id}`)
    const { roles }: RolesResType = await api.get(`api/users/${id}/roles`)

    return {
      user: {
        ...user,
        ...asyncUser.user,
        roles,
        selectedRole: getInitialSelectedRole(roles)
      }
    }
  }
)

const update = (state: AsyncUserState, { payload }: any) => {
  const selectedRole = payload.user?.selectedRole

  if (selectedRole !== undefined)
    localStorage.setItem('@SLab_selected_role', selectedRole)

  console.log(payload)

  return { ...state, ...payload }
}

const AsyncUser = createSlice({
  name: 'user',
  initialState,
  reducers: { update, reset: () => initialState },
  extraReducers: ({ addCase }) => {
    addCase(getUser.pending, state => ({ ...state }))

    addCase(getUser.fulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
      loading: false
    }))
  }
})

export const AsyncUserActions = AsyncUser.actions

export default AsyncUser
