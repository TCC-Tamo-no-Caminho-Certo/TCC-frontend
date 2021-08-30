import api from 'services/api'

import { UserResType, UserType } from 'types/Responses/user/index'
import { RolesResType, RolesType, RoleType } from 'types/Responses/user/roles'

import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

type Reducer = CaseReducer<UserState, PayloadAction<Partial<UserOnStateType>>>

export interface UserOnStateType extends Partial<UserType> {
  roles?: RolesType
  selectedRole?: RoleType
}

export interface UserState {
  loading: boolean
  user?: UserOnStateType
}

interface GetUserProps {
  id?: number
}

export const initialState: UserState = {
  loading: true
}

const getInitialSelectedRole = (roles: RolesType): RoleType => {
  const localRole = localStorage.getItem('@SLab_selected_role')
  const haveLocalHole = roles.find(role => role === localRole)

  if (haveLocalHole && localRole) return haveLocalHole

  localStorage.setItem('@SLab_selected_role', roles[roles.length - 1])

  return roles[roles.length - 1]
}

const update: Reducer = (state, { payload }) => {
  const selectedRole = payload.selectedRole

  if (selectedRole !== undefined)
    localStorage.setItem('@SLab_selected_role', selectedRole)

  return { ...state, user: { ...state.user, ...payload } }
}

export const getUser = createAsyncThunk(
  'user/getUser',
  async ({ id }: GetUserProps) => {
    const loggedId = Number(
      localStorage.getItem('@SLab_ac_token')?.split('-')[0]
    )

    const { user }: UserResType = await api.get(`api/users/${id || loggedId}`)

    const { roles: resRoles }: RolesResType = await api.get(
      `api/users/${id || loggedId}/roles`
    )

    const roles = resRoles.length === 0 ? (['guest'] as RolesType) : resRoles

    return {
      user: {
        ...user,
        roles,
        selectedRole: getInitialSelectedRole(roles)
      }
    }
  }
)

const User = createSlice({
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

export const UserActions = User.actions

export default User
