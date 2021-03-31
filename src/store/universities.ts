import api from 'services/api'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface RolesState {
  entities: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  universities: any
}

interface Payload {
  entities?: []
  loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
  universities?: any
}

const initialState: RolesState = {
  entities: [],
  loading: 'idle',
  universities: undefined
}

export const getUniversities = createAsyncThunk(
  'universities/getUniversities',
  async () => {
    const response = await api.get('info/university')

    return response.universities
  }
)

const Universities = createSlice({
  name: 'universities',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Payload>) => {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getUniversities.fulfilled, (_state, action) => ({
      ...action.payload
    }))
  }
})

export const UniversitiesActions = Universities.actions

export default Universities
