import validateSession from 'utils/validateSession'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface ValidationState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  entities: []
  logged: boolean
}

const initialState: ValidationState = {
  loading: 'idle',
  entities: [],
  logged: false
}

export const getValidation = createAsyncThunk(
  'validation/getValidation',
  async () => {
    const response = await validateSession()
    return { logged: response }
  }
)

const Validation = createSlice({
  name: 'validation',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getValidation.fulfilled, (state, action) => ({
      ...state,
      ...action.payload
    }))
  }
})

export const ValidationActions = Validation.actions

export default Validation
