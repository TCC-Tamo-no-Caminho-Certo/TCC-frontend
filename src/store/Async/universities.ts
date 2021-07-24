import api from 'services/api'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UniversityResType } from 'types/Responses/university'
import { UniversitiesResType } from 'types/Responses/university/universities'

export interface UniversitiesState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  entities: []
  universities: UniversityResType[]
}

const initialState: UniversitiesState = {
  loading: 'idle',
  entities: [],
  universities: []
}

export const getUniversities = createAsyncThunk(
  'universities/getUniversities',
  async (prevState: UniversitiesState) => {
    if (prevState.universities.length === 0) {
      const { universities }: UniversitiesResType = await api.get(
        'info/university'
      )

      return { universities }
    }
  }
)

const Universities = createSlice({
  name: 'universities',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUniversities.fulfilled, (state, action) => ({
      ...state,
      ...action.payload
    }))
  }
})

export const UniversitiesActions = Universities.actions

export default Universities
