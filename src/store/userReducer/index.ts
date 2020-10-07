import { createSlice } from '@reduxjs/toolkit'

const localUserConfig = localStorage.getItem('-----')

const themeReducer = createSlice({
  name: 'userConfig',

  initialState: localUserConfig,

  reducers: {
    changeTheme: state => {},
  },
})

export default themeReducer
