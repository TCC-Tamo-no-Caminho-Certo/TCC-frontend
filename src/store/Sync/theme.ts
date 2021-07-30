import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Themes = 'light' | 'dark'

const localTheme = localStorage.getItem('@SLab_theme') as Themes

export interface ThemeState {
  theme: Themes
}

const initialState: ThemeState = {
  theme: localTheme || 'light'
}

type Payload = PayloadAction<ThemeState>

const Theme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, { payload }: Payload) => {
      localStorage.setItem('@SLab_theme', payload.theme)
      return { theme: payload.theme }
    }
  }
})

export const ThemeActions = Theme.actions

export default Theme
