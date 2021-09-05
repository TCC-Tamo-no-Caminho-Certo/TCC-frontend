import api from 'services/api'

import { RootState } from 'store'

import { RolesDataType } from 'types/Responses/user/rolesData'
import { RoleType } from 'types/Responses/user/roles'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type RolesWithData = keyof RolesDataType

export interface RolesDataState {
  loading: boolean
  roles: RolesDataType
}

interface GetRolesDataParams {
  role?: RoleType
  userId: number
  updated?: boolean
}

const rolesWithData: RolesWithData[] = [
  'student',
  'professor',
  'moderator',
  'administrator'
]

const initialState: RolesDataState = {
  roles: {},
  loading: true
}

export const getRolesData = createAsyncThunk(
  'rolesData(getRolesData)',
  async ({ userId, role, updated }: GetRolesDataParams, { getState }) => {
    const { rolesData, user } = getState() as RootState
    const userRoles = user.user?.roles

    if (role) {
      const haveData = rolesWithData.find(roleWithData => role === roleWithData)
      const alreadyHave = rolesData.roles[role as keyof RolesDataType]

      if (haveData && (updated || !alreadyHave)) {
        const newRoleData: RolesDataType = {}
        const response = await api.get(`api/users/${userId}/roles/${role}`)
        newRoleData[`${role}` as keyof RolesDataType] = response[`${role}`]
        return { roles: { ...rolesData.roles, ...newRoleData } }
      }

      return rolesData
    } else if (userRoles && (updated || rolesData.roles === {})) {
      const newRolesData: RolesDataType = {}

      for (let i = 0; i < userRoles.length; i++) {
        const haveData = rolesWithData.find(
          roleWithData => userRoles[i] === roleWithData
        )

        if (haveData) {
          const response = await api.get(
            `api/users/${userId}/roles/${userRoles[i]}`
          )

          newRolesData[`${userRoles[i]}` as keyof RolesDataType] =
            response[`${userRoles[i]}`]
        }
      }

      return { roles: newRolesData }
    }

    return rolesData
  }
)

const RolesData = createSlice({
  initialState,
  name: 'roles',
  reducers: { reset: () => initialState },
  extraReducers: ({ addCase }) => {
    addCase(getRolesData.pending, state => ({ ...state, loading: true }))

    addCase(getRolesData.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      loading: false
    }))
  }
})

export const RolesDataActions = RolesData.actions

export default RolesData
