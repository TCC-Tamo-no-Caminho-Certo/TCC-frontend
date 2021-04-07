import { Response } from './'

import api from 'services/api'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CourseType {
  name: string
  course_id: number
}

export interface CoursesState {
  entities: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  courses: CourseType[]
}

type Payload = PayloadAction<Partial<CoursesState>>

const initialState: CoursesState = {
  entities: [],
  loading: 'idle',
  courses: []
}

export const getCourses = createAsyncThunk(
  'course/getCourses',
  async (prevState: CoursesState) => {
    const { courses } = prevState

    if (courses.length === 0) {
      console.log('REDUX-REQ-COURSES')
      const response: Response<CourseType[]> = await api.get('info/course')
      return { courses: response.courses }
    }
  }
)

const Courses = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    update: (state, action: Payload) => ({
      ...state,
      ...action.payload
    })
  },
  extraReducers: builder => {
    builder.addCase(getCourses.fulfilled, (state, action) => ({
      ...state,
      ...action.payload
    }))
  }
})

export const CoursesActions = Courses.actions

export default Courses
