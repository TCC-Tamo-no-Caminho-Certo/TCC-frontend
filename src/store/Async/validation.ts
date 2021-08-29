import api from 'services/api'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface ValidationState {
  logged: boolean
  loading: boolean
}

const initialState: ValidationState = {
  loading: true,
  logged: !!localStorage.getItem('@SLab_ac_token')
}

export const getValidation = createAsyncThunk(
  'validation/getValidation',
  async () => {
    const token = localStorage.getItem('@SLab_ac_token')

    if (!token) return { logged: false }

    const { success } = await api.get('api/validate-session', {
      headers: { authorization: `Bearer ${token}` }
    })

    return { logged: success }
  }
)

const Validation = createSlice({
  initialState,
  reducers: {},
  name: 'validation',
  extraReducers: ({ addCase }) => {
    addCase(getValidation.pending, state => ({ ...state, loading: true }))

    addCase(getValidation.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      loading: false
    }))
  }
})

export const ValidationActions = Validation.actions

export default Validation
