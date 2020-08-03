import React, { createContext, useContext, useState } from 'react'
import api from 'services/api'

interface AuthStateData {
  success: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  surname: string
  email: string
  birthday: string
  password: string
}

interface AuthContextData {
  authData: AuthStateData
  login(loginData: LoginData): Promise<void>
  register(RegisterData: RegisterData): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthStateData>(
    (): AuthStateData => {
      const success = localStorage.getItem('@SteamsLab:success')

      if (success) return { success }
      return {} as AuthStateData
    }
  )

  const login = async ({ email, password }: LoginData) => {
    const response = await api.post('login', { email, password })
    const { success } = response.data
    console.log(response.data)
    localStorage.setItem('@SteamsLab:success', success)
    setAuthData(success)
  }

  const register = async ({ name, surname, email, birthday, password }: RegisterData) => {
    const response = await api.post('register', {
      name,
      surname,
      email,
      birthday,
      password,
    })

    console.log(response.data)
  }

  return (
    <AuthContext.Provider value={{ authData, login, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const auth = useContext(AuthContext)
  if (!auth) throw new Error('useAuth must be used within an AuthProvider')
  return auth
}
