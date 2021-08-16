import api from 'services/api'

import { RootState } from 'store'

import { RolesDataType } from 'types/Responses/user/rolesData'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface AsyncRolesDataState {
  loading: boolean
  firstTime: boolean
  roles: RolesDataType
}

interface GetEmailsParams {
  userId: number
}

const initialState: AsyncRolesDataState = {
  roles: {},
  loading: true,
  firstTime: true
}

export const getUpdatedRolesData = createAsyncThunk(
  'rolesData(getUpdatedRolesData)',
  async ({ userId }: GetEmailsParams, { getState }) => {
    const { asyncRolesData, asyncUser } = getState() as RootState
    const userRoles = asyncUser.user?.roles

    if (userRoles) {
      const newRolesData: any = {}

      for (let i = 0; i < userRoles.length; i++) {
        const response = await api.get(
          `api/users/${userId}/roles/${userRoles[i]}`
        )
        newRolesData[`${userRoles[i]}`] = response[`${userRoles[i]}`]
      }

      return { roles: newRolesData, firstTime: false }
    }

    return asyncRolesData
  }
)

export const getRolesData = createAsyncThunk(
  'rolesData(getRolesData)',
  async ({ userId }: GetEmailsParams, { getState }) => {
    const { asyncRolesData, asyncUser } = getState() as RootState
    const userRoles = asyncUser.user?.roles

    if (asyncRolesData.firstTime && userRoles) {
      const newRolesData: any = {}

      for (let i = 0; i < userRoles.length; i++)
        if (userRoles[i] !== 'guest') {
          const response = await api.get(
            `api/users/${userId}/roles/${userRoles[i]}`
          )

          newRolesData[`${userRoles[i]}`] = response[`${userRoles[i]}`]
        }

      return { roles: newRolesData, firstTime: false }
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
