import { light, dark, ThemeAttributes } from 'styles/themes'

import { createSlice } from '@reduxjs/toolkit'

const localTheme = localStorage.getItem('theme')

const Theme = createSlice({
  name: 'theme',
  initialState: localTheme === 'light' || !localTheme ? light : dark,
  reducers: {
    changeTheme: state => {
      localStorage.setItem('theme', state.name === 'light' ? 'dark' : 'light')
      return state.name === 'light' ? dark : light
    },
  },
})

export type ThemeState = ThemeAttributes
export const ThemeActions = Theme.actions
export default Theme
