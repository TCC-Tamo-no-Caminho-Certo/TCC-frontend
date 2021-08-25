import api from 'services/api'

import { RootState } from 'store'

import { RolesDataType } from 'types/Responses/user/rolesData'
import { RoleType } from 'types/Responses/user/roles'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface AsyncRolesDataState {
  loading: boolean
  firstTime: boolean
  roles: RolesDataType
}

interface GetEmailsParams {
  userId: number
}

interface GetUpdatedEmailsParams {
  userId: number
  role: RoleType
}

type RolesWithData = keyof RolesDataType

const initialState: AsyncRolesDataState = {
  roles: {},
  loading: true,
  firstTime: true
}

const rolesWithData: RolesWithData[] = [
  'student',
  'professor',
  'moderator',
  'administrator'
]

export const getUpdatedRolesData = createAsyncThunk(
  'rolesData(getUpdatedRolesData)',
  async ({ userId, role }: GetUpdatedEmailsParams, { getState }) => {
    const { asyncRolesData, asyncUser } = getState() as RootState
    const userRoles = asyncUser.user?.roles

    if (userRoles)
      if (role) {
        const withData = rolesWithData.find(
          roleWithData => role === roleWithData
        )

        if (withData) {
          const newRolesData: RolesDataType = {}
          const response = await api.get(`api/users/${userId}/roles/${role}`)

          newRolesData[`${role}` as keyof RolesDataType] = response[`${role}`]

          return {
            firstTime: false,
            roles: { ...asyncRolesData.roles, ...newRolesData }
          }
        }
      } else {
        const newRolesData: RolesDataType = {}

        for (let i = 0; i < userRoles.length; i++) {
          const withData = rolesWithData.find(
            roleWithData => userRoles[i] === roleWithData
          )

          if (withData) {
            const newRolesData: RolesDataType = {}
            const response = await api.get(
              `api/users/${userId}/roles/${userRoles[i]}`
            )

            newRolesData[`${userRoles[i]}` as keyof RolesDataType] =
              response[`${userRoles[i]}`]
          }
        }

        return {
          firstTime: false,
          roles: { ...asyncRolesData.roles, ...newRolesData }
        }
      }

    return asyncRolesData
  }
)

export const getRolesData = createAsyncThunk(
  'rolesData(getRolesData)',
  async ({ userId }: GetEmailsParams, { getState }) => {
    const { asyncRolesData, asyncUser } = getState() as RootState
    const userRoles = asyncUser.user?.roles

    if (userRoles && asyncRolesData.firstTime) {
      const newRolesData: RolesDataType = {}

      for (let i = 0; i < userRoles.length; i++)
        if (rolesWithData.find(role => userRoles[i] === role)) {
          const response = await api.get(
            `api/users/${userId}/roles/${userRoles[i]}`
          )

          newRolesData[`${userRoles[i]}` as keyof RolesDataType] =
            response[`${userRoles[i]}`]
        }

      return {
        firstTime: false,
        roles: { ...asyncRolesData.roles, ...newRolesData }
      }
    }

    return asyncRolesData
  }
)

const AsyncRolesData = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getRolesData.pending, state => ({
      ...state,
      loading: true
    }))

    builder.addCase(getRolesData.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      loading: false
    }))

    builder.addCase(getUpdatedRolesData.pending, state => ({
      ...state,
      loading: true
    }))

    builder.addCase(getUpdatedRolesData.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      loading: false
    }))
  }
})

export const AsyncRolesDataActions = AsyncRolesData.actions

export default AsyncRolesData
