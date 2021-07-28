import api from 'services/api'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  UniversitiesResType,
  UniversitiesType
} from 'types/Responses/university/universities'

export interface UniversitiesState {
  loading: boolean
  universities: UniversitiesType
}

const initialState: UniversitiesState = {
  loading: false,
  universities: []
}

export const getUniversities = createAsyncThunk(
  'universities/getUniversities',
  async (prevState: UniversitiesState) => {
    if (prevState.universities.length === 0) {
      const { universities }: UniversitiesResType = await api.get(
        'universities'
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
    builder.addCase(getUniversities.pending, state => ({
      ...state,
      loading: true
    }))

    builder.addCase(getUniversities.fulfilled, (state, action) => ({
      ...state,
      ...action.payload
    }))
  }
})

export const UniversitiesActions = Universities.actions

export default Universities
