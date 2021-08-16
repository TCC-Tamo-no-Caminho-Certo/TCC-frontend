import api from 'services/api'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface AsyncValidationState {
  loading: boolean
  logged: boolean
}

const initialState: AsyncValidationState = {
  loading: true,
  logged: !!localStorage.getItem('@SLab_ac_token')
}

export const getValidation = createAsyncThunk(
  'validation/getValidation',
  async () => {
    const token = localStorage.getItem('@SLab_ac_token')

    if (!token) return { logged: false }

    const { success } = await api.get('api/validate-session', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })

    return { logged: success }
  }
)

const AsyncValidation = createSlice({
  name: 'validation',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getValidation.pending, state => ({
      ...state,
      loading: true
    }))

    builder.addCase(getValidation.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      loading: false
    }))
  }
})

export const AsyncValidationActions = AsyncValidation.actions

export default AsyncValidation
