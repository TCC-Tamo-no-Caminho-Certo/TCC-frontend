import api from 'services/api'

import { RootState } from 'store'

import { RolesDataResType, RolesDataType } from 'types/Responses/user/rolesData'

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
  'roles(getUpdatedRolesData)',
  async ({ userId }: GetEmailsParams) => {
    const { roles }: RolesDataResType = await api.get(`users/${userId}/roles`)

    return { roles }
  }
)

export const getRolesData = createAsyncThunk(
  'roles(getRoles)',
  async ({ userId }: GetEmailsParams, { getState }) => {
    const { asyncRolesData } = getState() as RootState

    if (asyncRolesData.firstTime) {
      const { roles }: RolesDataResType = await api.get(
        `users/${userId}/roles/all`
      )

      return { roles, firstTime: false }
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
