import { RefObject } from 'react'

import { PopupMethods, PopupProps } from 'components/Popup'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PopupState {
  popupProps: PopupProps
  popupRef?: RefObject<PopupMethods> | null
}

const initialState: PopupState = {
  popupRef: null,
  popupProps: {}
}

type Payload = PayloadAction<PopupState>

const Popup = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    update: (_state, action: Payload) => ({
      ...action.payload
    })
  }
})

export const PopupActions = Popup.actions

export default Popup
