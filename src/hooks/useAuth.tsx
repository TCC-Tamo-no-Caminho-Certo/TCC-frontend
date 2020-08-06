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

  const login = async (data: LoginData) => {
    const response = await api.post('login', data)
    const { success } = response.data
    localStorage.setItem('@SteamsLab:success', success)
    setToken(success)
  }

  const register = async (data: RegisterData) => {
    await api.post('register', data)
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
