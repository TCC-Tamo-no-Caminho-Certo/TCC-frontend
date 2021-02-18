import { dark, light, ThemeAttributes } from 'styles/themes'

import { createSlice } from '@reduxjs/toolkit'

const localTheme = localStorage.getItem('@SLab_theme')

const initialState: ThemeState =
  localTheme === 'light' || !localTheme ? light : dark

const Theme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: state => {
      localStorage.setItem(
        '@SLab_theme',
        state.name === 'light' ? 'dark' : 'light'
      )
      return state.name === 'light' ? dark : light
    }
  }
})

export type ThemeState = ThemeAttributes

export const ThemeActions = Theme.actions

export default Theme
