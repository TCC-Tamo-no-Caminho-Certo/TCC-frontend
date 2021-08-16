import api from 'services/api'

import {
  UniversitiesResType,
  UniversitiesType
} from 'types/Responses/university/universities'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface AsyncUniversitiesState {
  loading: boolean
  universities: UniversitiesType
}

const initialState: AsyncUniversitiesState = {
  loading: true,
  universities: []
}

export const getUpdatedUniversities = createAsyncThunk(
  'universities/getUpdatedUniversities',
  async () => {
    const { universities }: UniversitiesResType = await api.get(
      'api/universities'
    )

    return { universities }
  }
)

export const getUniversities = createAsyncThunk(
  'universities/getUniversities',
  async (_data, { getState }) => {
    const { universities } = getState() as AsyncUniversitiesState

    if (!universities) {
      const { universities }: UniversitiesResType = await api.get(
        'api/universities'
      )

      return { universities }
    }
  }
)

const AsyncUniversities = createSlice({
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
      ...action.payload,
      loading: false
    }))

    builder.addCase(getUpdatedUniversities.pending, state => ({
      ...state,
      loading: true
    }))

    builder.addCase(getUpdatedUniversities.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      loading: false
    }))
  }
})

export const AsyncUniversitiesActions = AsyncUniversities.actions

export default AsyncUniversities
