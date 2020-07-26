import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'

interface Register {
  register: boolean
  setRegister: Dispatch<SetStateAction<boolean>>
}

const RegisterContext = createContext({} as Register)

export const RegisterProvider: React.FC = ({ children }) => {
  const [register, setRegister] = useState(false)

  useEffect(() => console.log(register), [register])

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
