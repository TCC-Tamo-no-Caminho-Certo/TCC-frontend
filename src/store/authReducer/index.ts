import { createSlice } from '@reduxjs/toolkit'

const authReducer = createSlice({
  name: 'auth',
  initialState: false,
  reducers: {
    authorize: state => true,
    logout: state => false
  }
})

export default authReducer