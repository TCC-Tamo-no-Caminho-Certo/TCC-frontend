import api from 'services/api'

import { RootState } from 'store'

import { EmailsResType, EmailsType } from 'types/Responses/user/emails'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface EmailsState {
  loading: boolean
  emails: EmailsType
}

interface GetEmailsParams {
  userId: number
  updated?: boolean
}

const initialState: EmailsState = { emails: [], loading: true }

export const getEmails = createAsyncThunk(
  'emails(getEmails)',
  async ({ userId, updated }: GetEmailsParams, { getState }) => {
    const { emails } = getState() as RootState

    if (updated || emails.emails.length === 0) {
      const { emails }: EmailsResType = await api.get(
        `api/users/${userId}/emails`
      )

      return { emails }
    }

    return emails
  }
)

const Emails = createSlice({
  initialState,
  name: 'emails',
  reducers: { reset: () => initialState },
  extraReducers: ({ addCase }) => {
    addCase(getEmails.pending, state => ({ ...state, loading: true }))

    addCase(getEmails.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      loading: false
    }))
  }
})

export const EmailsActions = Emails.actions

export default Emails
