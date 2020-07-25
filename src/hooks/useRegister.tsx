import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'

interface Register {
  register: string
  setRegister: Dispatch<SetStateAction<string>>
}

const RegisterContext = createContext({} as Register)

export const RegisterProvider: React.FC = ({ children }) => {
  const [register, setRegister] = useState('starting')

  return (
    <RegisterContext.Provider value={{ register, setRegister }}>
      {children}
    </RegisterContext.Provider>
  )
}

export const useRegister = (): Register => {
  const register = useContext(RegisterContext)
  if (!register)
    throw new Error('useRegister must be used within an RegisterProvider')
  return register
}
