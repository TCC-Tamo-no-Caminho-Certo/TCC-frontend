import React from "react"
import Style from "./styles"
import {FcHighPriority} from "react-icons/fc"

function ErrorMessage({children}) {
  return (
    <Style>
      <FcHighPriority />
      <span id="errorMessage">{children}</span>
    </Style>
  )
}

export default ErrorMessage
