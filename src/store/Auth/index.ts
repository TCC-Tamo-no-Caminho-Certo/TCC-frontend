import { createSlice } from '@reduxjs/toolkit'

const localAuth = localStorage.getItem('@SLab_ac_token')

const Auth = createSlice({
  name: 'auth',
  initialState: !(localAuth === 'false' || !localAuth),
  reducers: {
    authorize: state => true,
    logout: state => false,
  },
})

export const AuthActions = Auth.actions
export default Auth
