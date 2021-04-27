import api from 'services/api'

import { Response } from 'store'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface University {
  name: string
  university_id: number
  regex: {
    email: {
      student: string
      professor: string
    }
    register: {
      student: string
      professor: string
    }
  }
}

export interface UniversitiesState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  entities: []
  universities: University[]
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
      const { universities }: Response<University[]> = await api.get(
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
