import React from "react"
import GlobalStyle from "styles/GlobalStyle"
import Routes from "Routes"
import GlobalContext from "store"

export default function Global() {
  return (
    <GlobalContext>
      <GlobalStyle />
      <Routes />
    </GlobalContext>
  )
}
