import Themes, { dark, light } from 'styles/themes'

import { createSlice } from '@reduxjs/toolkit'

const localTheme = localStorage.getItem('@SLab_theme')

const initialState: ThemeState =
  localTheme === 'light' || !localTheme ? light : dark

const Theme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: ({ name }) => {
      localStorage.setItem('@SLab_theme', name === 'light' ? 'dark' : 'light')

      return name === 'light' ? dark : light
    }
  }
})

export type ThemeState = Themes

export const ThemeActions = Theme.actions

export default Theme
