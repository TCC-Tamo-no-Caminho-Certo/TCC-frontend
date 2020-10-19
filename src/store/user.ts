import { createSlice } from '@reduxjs/toolkit'

// const localUserConfig = localStorage.getItem('-----')

const initialState = {
  user_id: 0,
  name: '',
  surname: '',
  email: '',
  avatar: '',
  birthday: '',
  role: '',
  created_at: '',
  updated_at: '',
}

const User = createSlice({
  name: 'userConfig',
  initialState,

  reducers: {
    userInfo: (state, action) => {
      console.log('USER_DATE', action.payload)

      return action.payload
    },
  },
})

export const UserActions = User.actions

export default User
