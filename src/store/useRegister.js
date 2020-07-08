import React, {createContext, useState, useContext} from "react"

const RegisterContext = createContext()

export function RegisterProvider({children}) {
  const [register, setRegister] = useState("starting")

  return (
    <RegisterContext.Provider value={{register, setRegister}}>
      {children}
    </RegisterContext.Provider>
  )
}

export default function useRegister() {
  const {register, setRegister} = useContext(RegisterContext)
  return {register, setRegister}
}
