import { Response } from '../'

import api from 'services/api'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface Course {
  name: string
  course_id: number
}

export interface CoursesState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  entities: []
  courses: Course[]
}

const initialState: CoursesState = {
  loading: 'idle',
  entities: [],
  courses: []
}

export const getCourses = createAsyncThunk(
  'course/getCourses',
  async (prevState: CoursesState) => {
    if (prevState.courses.length === 0) {
      console.log('REDUX-REQ-COURSES')
      const { courses }: Response<Course[]> = await api.get('info/course')
      return { courses }
    }
  }
)

const Courses = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCourses.fulfilled, (state, action) => ({
      ...state,
      ...action.payload
    }))
  }
})

export const CoursesActions = Courses.actions

export default Courses
