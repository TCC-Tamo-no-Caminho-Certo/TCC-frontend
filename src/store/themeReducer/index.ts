import { createSlice } from '@reduxjs/toolkit'
import dark from 'styles/themes/dark' 
import light from 'styles/themes/light'

const themeReducer = createSlice({
  name: 'theme',
  initialState: light,
  reducers: {
    changeTheme: state => {
      const localTheme = localStorage.getItem('theme')
      return localTheme === 'light' ? dark : light
    },
  },
})

export const { changeTheme } = themeReducer.actions

export default themeReducer
