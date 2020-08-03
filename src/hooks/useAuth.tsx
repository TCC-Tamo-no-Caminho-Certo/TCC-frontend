import React, { createContext, useContext, useState } from 'react'
import api from 'services/api'
import { LoginData } from 'pages/Home/Login'
import { RegisterData } from 'pages/Home/Signup'

interface AuthContextData {
  token: string
  login(loginData: LoginData): Promise<void>
  register(RegisterData: RegisterData): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState(() => {
    const success = localStorage.getItem('@SteamsLab:success')
    return success || ''
  })

  const login = async ({ email, password }: LoginData) => {
    const response = await api.post('login', { email, password })
    const { success } = response.data
    localStorage.setItem('@SteamsLab:success', success)
    setToken(success)
  }

  const register = async ({ name, surname, email, birthday, password }: RegisterData) => {
    await api.post('register', {
      name,
      surname,
      email,
      birthday,
      password,
    })
  }

  return (
    <AuthContext.Provider value={{ token, login, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const auth = useContext(AuthContext)
  if (!auth) throw new Error('useAuth must be used within an AuthProvider')
  return auth
}