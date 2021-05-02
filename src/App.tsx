import React, {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'

import './i18n'

import GlobalStyle from 'styles/GlobalStyle'

import Routes from 'routes'

import { ThemeState } from 'store/Sync/theme'
import { RootState } from 'store'

import Popup, { PopupMethods, PopupProps } from 'components/Popup'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

export interface GlobalContextProps {
  overflow?: {
    overflow?: string
    setOverflow?: Dispatch<SetStateAction<string>>
  }
  popup?: {
    popupRef?: RefObject<PopupMethods>
    popupProps?: PopupProps
    setPopupProps?: Dispatch<SetStateAction<PopupProps>>
  }
}

export const GlobalContext = createContext<GlobalContextProps>({})

const App = () => {
  const theme = useSelector<RootState, ThemeState>(({ theme }) => theme)

  const popupRef = useRef<PopupMethods>(null)

  const [overflow, setOverflow] = useState('visible')
  const [popupProps, setPopupProps] = useState({})

  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage('pt-BR')
  }, [i18n])

  return (
    <ThemeProvider theme={theme}>
      <GlobalContext.Provider
        value={{
          popup: { popupRef, popupProps, setPopupProps },
          overflow: {
            overflow,
            setOverflow
          }
        }}
      >
        <GlobalStyle overflow={overflow} />

        <BrowserRouter>
          <Routes />
        </BrowserRouter>

        <Popup ref={popupRef} />
      </GlobalContext.Provider>
    </ThemeProvider>
  )
}

export default App
