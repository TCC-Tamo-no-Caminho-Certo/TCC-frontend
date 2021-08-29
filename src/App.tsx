import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'

import './i18n'

import GlobalStyle from 'styles/GlobalStyle'
import { dark, light } from 'styles/themes'

import Routes from 'routes'

import { RootState } from 'store'
import { ThemeState } from 'store/Sync/theme'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeContext, ThemeProvider } from 'styled-components'

export interface Overflow {
  x?: string
  y?: string
  overflow?: string
}

export interface GlobalContextProps {
  overflow?: {
    overflow?: Overflow
    setOverflow?: Dispatch<SetStateAction<Overflow>>
  }
}

export const GlobalContext = createContext<GlobalContextProps>({})

const allThemes = { dark, light }

const App = () => {
  const theme = useContext(ThemeContext)
  const { theme: selectedTheme } = useSelector<RootState, ThemeState>(
    ({ theme }) => theme
  )

  const [overflow, setOverflow] = useState<Overflow>({ overflow: 'auto' })

  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage('pt-BR')
  }, [i18n])

  return (
    <GlobalContext.Provider value={{ overflow: { overflow, setOverflow } }}>
      <ThemeProvider theme={allThemes[selectedTheme]}>
        <GlobalStyle theme={theme} overflow={overflow} />

        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </GlobalContext.Provider>
  )
}

export default App
