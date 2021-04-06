import api from 'services/api'

import { Response } from 'store'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface University {
  name: string
  university_id: number
  regex: {
    email: {
      student: RegExp
      professor: RegExp
    }
    register: {
      student: RegExp
      professor: RegExp
    }
  }
}

export interface UniversitiesState {
  entities: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  universities: University[]
}

type Payload = PayloadAction<Partial<UniversitiesState>>

const initialState: UniversitiesState = {
  entities: [],
  loading: 'idle',
  universities: []
}

export const getUniversities = createAsyncThunk(
  'universities/getUniversities',
  async (prevState: UniversitiesState) => {
    const { universities } = prevState

    if (universities.length === 0) {
      console.log('fez req para uni')
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
  reducers: {
    update: (state, action: Payload) => ({
      ...state,
      ...action.payload
    })
  },
  extraReducers: builder => {
    builder.addCase(getUniversities.fulfilled, (state, action) => ({
      ...state,
      ...action.payload
    }))
  }
})

export const UniversitiesActions = Universities.actions

export default Universities
