import { createSlice } from '@reduxjs/toolkit'

const localUserConfig = localStorage.getItem('-----')

const User = createSlice({
  name: 'userConfig',
  initialState: localUserConfig,
  reducers: {
    storeInfo: state => '',
  },
})

export const UserActions = User.actions
export default User
