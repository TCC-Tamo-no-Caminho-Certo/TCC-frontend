import React, { createContext, useCallback, useContext, useState } from 'react'
import api from 'services/api'

interface AuthStateData {
  token: string
  userInfo: object
}

interface LoginData {
  email: string
  password: string
}

interface AuthContextData {
  authData: AuthStateData
  login(loginData: LoginData): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthStateData>(
    (): AuthStateData => {
      const token = localStorage.getItem('@SteamsLab:token')
      const userInfo = localStorage.getItem('@SteamsLab:userInfo')

      if (token && userInfo) return { token, userInfo: JSON.parse(userInfo) }
      return {} as AuthStateData
    }
  )

  const login = useCallback(async ({ email, password }) => {
    const response = await api.post('login', {
      header: { Authorization: `Basic ${email}:${password}` },
    })

    const { token, userInfo } = response.data

    localStorage.setItem('@SteamsLab:token', token)
    localStorage.setItem('@SteamsLab:userInfo', userInfo)

    setAuthData({ token, userInfo })
  }, [])

  return (
    <AuthContext.Provider value={{ authData, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const auth = useContext(AuthContext)
  if (!auth) throw new Error('useAuth must be used within an AuthProvider')
  return auth
}
