import api from 'services/api'

import { RootState } from 'store'

import { EmailsResType, EmailsType } from 'types/Responses/user/emails'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface AsyncEmailsState {
  loading: boolean
  emails: EmailsType
}

interface GetEmailsParams {
  userId: number
}

const initialState: AsyncEmailsState = { emails: [], loading: true }

export const getUpdatedEmails = createAsyncThunk(
  'emails(getUpdatedEmails)',
  async ({ userId }: GetEmailsParams) => {
    const { emails }: EmailsResType = await api.get(`users/${userId}/emails`)

    return { emails }
  }
)

export const getEmails = createAsyncThunk(
  'emails(getEmails)',
  async ({ userId }: GetEmailsParams, { getState }) => {
    const { asyncEmails } = getState() as RootState

    if (asyncEmails.emails.length === 0) {
      const { emails }: EmailsResType = await api.get(`users/${userId}/emails`)
      return { emails }
    }

    return asyncEmails
  }
)

const AsyncEmails = createSlice({
  name: 'emails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getEmails.pending, state => ({
      ...state,
      loading: true
    }))

    builder.addCase(getEmails.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      loading: false
    }))

    builder.addCase(getUpdatedEmails.pending, state => ({
      ...state,
      loading: true
    }))

    builder.addCase(getUpdatedEmails.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      loading: false
    }))
  }
})

export const AsyncEmailsActions = AsyncEmails.actions

export default AsyncEmails
