import React from 'react'

import GlobalStyle from 'styles/GlobalStyle'

import { ThemeState } from 'store/Theme'
import { useSelector, RootState } from 'store'

const GlobalProvider: React.FC = ({ children }) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <>
      <GlobalStyle theme={theme} />
      {children}
    </>
  )
}

export default GlobalProvider
