import { Reducer } from 'store'

import { createSlice } from '@reduxjs/toolkit'

type Themes = 'light' | 'dark'

export interface ThemeState {
  theme: Themes
}

const initialState: ThemeState = {
  theme: (localStorage.getItem('@SLab_theme') as Themes) || 'light'
}

const changeTheme: Reducer<ThemeState> = (state, { payload }) => {
  localStorage.setItem('@SLab_theme', payload.theme)

  return { theme: payload.theme }
}

const Theme = createSlice({
  initialState,
  name: 'theme',
  reducers: { changeTheme }
})

export const ThemeActions = Theme.actions

export default Theme
