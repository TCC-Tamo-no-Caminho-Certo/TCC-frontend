import api from 'services/api'

import { RootState } from 'store'

import {
  UniversitiesResType,
  UniversitiesType
} from 'types/Responses/university/universities'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface GetUniversitiesParams {
  updated?: boolean
}

export interface UniversitiesState {
  loading: boolean
  universities: UniversitiesType
}

const initialState: UniversitiesState = {
  loading: true,
  universities: []
}

export const getUniversities = createAsyncThunk(
  'universities/getUniversities',
  async ({ updated }: GetUniversitiesParams, { getState }) => {
    const { universities: storeUniversities } = getState() as RootState

    if (updated || storeUniversities.universities.length === 0) {
      const { universities }: UniversitiesResType = await api.get(
        'api/universities'
      )

      return { universities }
    }

    return { universities: storeUniversities.universities }
  }
)

const Universities = createSlice({
  initialState,
  reducers: {},
  name: 'universities',
  extraReducers: ({ addCase }) => {
    addCase(getUniversities.pending, state => ({ ...state, loading: true }))

    addCase(getUniversities.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      loading: false
    }))
  }
})

export const UniversitiesActions = Universities.actions

export default Universities
