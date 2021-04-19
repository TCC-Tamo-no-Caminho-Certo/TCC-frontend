import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react'

import './i18n'

import GlobalStyle from 'styles/GlobalStyle'

import Routes from 'routes'

import { ThemeState } from 'store/theme'
import { RootState } from 'store'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

interface OverflowContextType {
  overflow?: string
  setOverflow?: Dispatch<SetStateAction<string>>
}

export const OverflowContext = createContext<OverflowContextType>({})

const App = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const [overflow, setOverflow] = useState('visible')
  const { i18n } = useTranslation()

  useEffect(() => {
    console.log(overflow)
  }, [overflow])

  useEffect(() => {
    i18n.changeLanguage('pt-BR')
  }, [i18n])

  return (
    <ThemeProvider theme={theme}>
      <OverflowContext.Provider value={{ overflow, setOverflow }}>
        <GlobalStyle overflow={overflow} />

        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </OverflowContext.Provider>
    </ThemeProvider>
  )
}

export default App
