import api from 'services/api'

import { RootState } from 'store'

import { EmailsResType, EmailsType } from 'types/Responses/user/emails'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface AsyncEmailsState {
  loading: boolean
  emails: EmailsType
}

const initialState: AsyncEmailsState = {
  emails: [],
  loading: true
}

export const getUpdatedEmails = createAsyncThunk(
  'emails/getEmails',
  async () => {
    const { emails }: EmailsResType = await api.get('user/emails')
    return { emails }
  }
)

export const getEmails = createAsyncThunk(
  'emails/getEmails',
  async (_param, { getState }) => {
    const { asyncEmails } = getState() as RootState

    if (asyncEmails.emails.length === 0) {
      const { emails }: EmailsResType = await api.get('user/emails')
      return { emails }
    }
  }
)

const AsyncEmails = createSlice({
  name: 'asyncEmails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getEmails.pending, state => ({
      ...state
    }))

    builder.addCase(getEmails.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      loading: false
    }))
  }
})

export const AsyncEmailsActions = AsyncEmails.actions

export default AsyncEmails
