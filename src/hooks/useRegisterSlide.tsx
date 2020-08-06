import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'

interface RegisterSlide {
  registerSlide: boolean

  setRegisterSlide: Dispatch<SetStateAction<boolean>>
}

const RegisterSlideContext = createContext({} as RegisterSlide)

export const RegisterSlideProvider: React.FC = ({ children }) => {
  const [registerSlide, setRegisterSlide] = useState(false)

  return (
    <RegisterSlideContext.Provider value={{ registerSlide, setRegisterSlide }}>
      {children}
    </RegisterSlideContext.Provider>
  )
}

export const useRegisterSlide = (): RegisterSlide => {
  const registerSlide = useContext(RegisterSlideContext)

  if (!registerSlide)
    throw new Error('useRegister must be used within an RegisterProvider')

  return registerSlide
}
