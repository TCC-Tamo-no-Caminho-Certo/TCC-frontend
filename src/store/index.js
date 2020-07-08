import React from "react"
import {ThemeProvider} from "./useTheme"
import {RegisterProvider} from "./useRegister"

export default function GlobalProvider({children}) {
  return (
    <ThemeProvider>
      <RegisterProvider>{children}</RegisterProvider>
    </ThemeProvider>
  )
}
