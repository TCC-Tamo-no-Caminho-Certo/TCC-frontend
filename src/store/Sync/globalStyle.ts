import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface GlobalStyleState {
  overflow: 'hidden' | 'visible'
}

const initialState: GlobalStyleState = {
  overflow: 'visible'
}

type Payload = PayloadAction<GlobalStyleState>

const GlobalStyle = createSlice({
  name: 'global-style',
  initialState,
  reducers: {
    update: (state, action: Payload) => ({
      ...state,
      ...action.payload
    })
  }
})

export const GlobalStyleActions = GlobalStyle.actions

export default GlobalStyle
